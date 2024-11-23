using Microsoft.EntityFrameworkCore;

namespace Gestao.Profissionais.API.Infra.Database;

public sealed class ApplicationDataContext : DbContext
{
    public ApplicationDataContext(DbContextOptions<ApplicationDataContext> options) : base(options) { }
}
