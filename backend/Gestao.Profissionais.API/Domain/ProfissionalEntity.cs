namespace Gestao.Profissionais.API.Domain;

public sealed class ProfissionalEntity
{
    public long Id { get; set; }
    public string Nome { get; set; }
    public string NumeroDocumento { get; set; }
    public long EspecialidadeId { get; set; }
    public EspecialidadeEntity? Especialidade { get; set; }
    public DateTime CriadoEm { get; set; }
}
