namespace Gestao.Profissionais.Infra.Ioc;

public static class InjectDependences
{
    public static IServiceCollection AddInfrastructure(this IServiceCollection services, IConfiguration configuration)
    {
        var connection = configuration.GetConnectionString("Default") 
            ?? throw new InvalidOperationException("ConnectionString não localizada.");
        services.AddDbContext<ApplicationDataContext>(opt => opt.UseSqlServer(connection));
        services.AddScoped<IRepository, Repository>();

        var applicationAssemblies = Assembly.Load("Gestao.Profissionais.Application");

        services.AddAutoMapper(applicationAssemblies);
        services.AddMediatR(x => x.RegisterServicesFromAssemblies(applicationAssemblies));
        return services;
    }
    public async static Task ApplyDefaultTasks(this WebApplication app, string? contentFile = null)
    {
        using var scope = app.Services.CreateScope();
        var services = scope.ServiceProvider;
        var loggerFactory = services.GetRequiredService<ILoggerFactory>();
        var repository = services.GetRequiredService<IRepository>();
        var logger = loggerFactory.CreateLogger<ApplicationDataContext>();
        var context = services.GetRequiredService<ApplicationDataContext>();
        logger.LogInformation("Iniciando Auto Migrate.");
        await context.Database.MigrateAsync();
        logger.LogInformation("Finalizando Auto Migrate.");

        await context.Database.ExecuteSqlRawAsync("SET IDENTITY_INSERT especialidades ON");
        
        if (!string.IsNullOrEmpty(contentFile))
        {
            var listaEspecialidades = JsonSerializer.Deserialize<IEnumerable<EspecialidadeDTO>>(contentFile) ?? [];

            foreach (var especialidade in listaEspecialidades)
            {
                var especialidadeExiste = await repository.EntityExists<EspecialidadeEntity>(x => x.Id == especialidade.Id);
                if (especialidadeExiste) continue;
                await repository.AddAsync(new EspecialidadeEntity(especialidade.Id, especialidade.Nome, especialidade.TipoDocumento));
            }
        }
        await context.Database.ExecuteSqlRawAsync("SET IDENTITY_INSERT especialidades OFF");
    }
}
