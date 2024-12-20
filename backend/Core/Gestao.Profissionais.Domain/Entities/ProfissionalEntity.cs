namespace Gestao.Profissionais.Domain.Entities;

public sealed class ProfissionalEntity
{
    public ProfissionalEntity() { }
    public ProfissionalEntity(string nome, string numeroDocumento, long especialidadeId)
    {
        Nome = nome;
        NumeroDocumento = numeroDocumento;
        EspecialidadeId = especialidadeId;
        CriadoEm = DateTime.Now;
    }

    public long Id { get; set; }
    public string Nome { get; set; }
    public string NumeroDocumento { get; set; }
    public long EspecialidadeId { get; set; }
    public EspecialidadeEntity Especialidade { get; set; }
    public DateTime CriadoEm { get; set; }
}
