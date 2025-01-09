namespace Gestao.Profissionais.Domain.Entities;

public sealed class EspecialidadeEntity
{
    public EspecialidadeEntity() { }
    public EspecialidadeEntity(long id, string nome, TipoDocEspecialidadeEnum tipoDocumento)
    {
        this.Id = id;
        this.Nome = nome;
        this.TipoDocumento = tipoDocumento;
    }
    public long Id { get; set; }
    public string Nome { get; set; }
    public TipoDocEspecialidadeEnum TipoDocumento { get; set; }
    public IEnumerable<ProfissionalEntity> Profissionais { get; set; }
}