using Gestao.Profissionais.Domain.Entities.Enums;

namespace Gestao.Profissionais.Domain.Entities;

public sealed class EspecialidadeEntity
{
    public long Id { get; set; }
    public string Nome { get; set; }
    public TipoDocEspecialidadeEnum TipoDocumento { get; set; }
    public IEnumerable<ProfissionalEntity> Profissionais { get; set; }
}