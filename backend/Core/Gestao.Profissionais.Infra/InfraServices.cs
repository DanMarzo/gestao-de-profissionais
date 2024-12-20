using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.Logging;

namespace Gestao.Profissionais.Infra;

public static class ApplicationServices
{
    public static IServiceCollection AddInfraServices(this IServiceCollection services, IConfiguration configuration)
    {
        var connection = configuration.GetConnectionString("Default") ?? throw new InvalidOperationException("ConnectionString não localizada.");
        services.AddDbContext<ApplicationDataContext>(opt => opt.UseSqlite(connection));
        services.AddScoped<IRepository, Repository>();
        return services;
    }
    public async static Task AutoMigrate(this WebApplication app)
    {
        using var scope = app.Services.CreateScope();
        var services = scope.ServiceProvider;
        var loggerFactory = services.GetRequiredService<ILoggerFactory>();
        var logger = loggerFactory.CreateLogger<ApplicationDataContext>();
        var context = services.GetRequiredService<ApplicationDataContext>();
        logger.LogInformation("Iniciando Auto Migrate.");
        await context.Database.MigrateAsync();
        logger.LogInformation("Finalizando Auto Migrate.");
    }
}
