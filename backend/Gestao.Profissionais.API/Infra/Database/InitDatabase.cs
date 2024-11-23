using Gestao.Profissionais.API.Application.Contracts;
using Microsoft.EntityFrameworkCore;

namespace Gestao.Profissionais.API.Infra.Database;

public static class InitDatabase
{
    public async static Task ApplyDatabaseConfig(this WebApplication app)
    {
        using var scope = app.Services.CreateScope();
        var services = scope.ServiceProvider;
        var loggerFactory = services.GetRequiredService<ILoggerFactory>();
        var logger = loggerFactory.CreateLogger<ApplicationDataContext>();
        var context = services.GetRequiredService<ApplicationDataContext>();
        logger.LogInformation("Iniciando Auto Migrate.");
        await context.Database.MigrateAsync();
        logger.LogInformation("Finalizando Auto Migrate.");
        var repository = services.GetRequiredService<IRepository>();
        await context.Database.MigrateAsync();

        var contentFile = File.ReadAllText("./default_entities_especialidades.json");
        var listaEspecialidades = JsonSerializer.Deserialize<IEnumerable<EspecialidadeEntity>>(contentFile) ?? [];

        foreach (var especialidade in listaEspecialidades)
        {
            var especialidadeExiste = await repository.EntityExists<EspecialidadeEntity>(x => x.Id == especialidade.Id);
            if (especialidadeExiste) continue;
            await repository.AddAsync(especialidade);
        }
    }
}