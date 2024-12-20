namespace Gestao.Profissionais.Application;

public static class ApplyInjectApplication
{
    public static IServiceCollection AddApplicationServices(this IServiceCollection services)
    {
        services.AddAutoMapper(typeof(ApplyInjectApplication).Assembly);
        services.AddMediatR(x => x.RegisterServicesFromAssemblies(typeof(ApplyInjectApplication).Assembly));
        return services;
    }
    public async static Task ApplyDefaultEntities(this WebApplication app, string contentFile)
    {
        using var scope = app.Services.CreateScope();
        var services = scope.ServiceProvider;
        var loggerFactory = services.GetRequiredService<ILoggerFactory>();
        var repository = services.GetRequiredService<IRepository>();

        
        var listaEspecialidades = JsonSerializer.Deserialize<IEnumerable<EspecialidadeEntity>>(contentFile) ?? [];

        foreach (var especialidade in listaEspecialidades)
        {
            var especialidadeExiste = await repository.EntityExists<EspecialidadeEntity>(x => x.Id == especialidade.Id);
            if (especialidadeExiste) continue;
            await repository.AddAsync(especialidade);
        }
    }
}
