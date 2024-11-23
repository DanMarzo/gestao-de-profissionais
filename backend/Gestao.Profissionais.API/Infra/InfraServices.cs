using Gestao.Profissionais.API.Infra.Database;
using Microsoft.EntityFrameworkCore;

namespace Gestao.Profissionais.API.Infra;

public static class ApplicationServices
{
    public static IServiceCollection AddInfraServices(this IServiceCollection services, IConfiguration configuration)
    {
        var connection = configuration.GetConnectionString("Default") ?? throw new InvalidOperationException("ConnectionString não localizada.");
        services.AddDbContext<ApplicationDataContext>(opt => opt.UseSqlite(connection));
        return services;
    }
}
