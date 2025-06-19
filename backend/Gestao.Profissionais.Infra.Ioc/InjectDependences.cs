namespace Gestao.Profissionais.Infra.Ioc;

public class InfraConfig
{
    public string ConnectionString { get; set; }
}

public static class InjectDependences
{
    public static IServiceCollection AddInfrastructure(this IServiceCollection services, Action<InfraConfig> action)
    {
        InfraConfig config = new InfraConfig();
        action.Invoke(config);
        services.AddDbContext<ApplicationDataContext>(opt => opt.UseSqlServer(config.ConnectionString));
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

        using var transaction = await context.Database.BeginTransactionAsync();

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
            await repository.SaveChangesAsync();
        }
        await context.Database.ExecuteSqlRawAsync("SET IDENTITY_INSERT especialidades OFF");
        await transaction.CommitAsync();

    }
}
