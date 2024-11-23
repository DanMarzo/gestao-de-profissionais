using Gestao.Profissionais.API.Domain.Enums;

namespace Gestao.Profissionais.API.Domain;

public sealed class EspecialidadeEntity
{
    public long Id { get; set; }
    public string Nome { get; set; }
    public TipoDocEspecialidadeEnum TipoDocumento { get; set; }
}