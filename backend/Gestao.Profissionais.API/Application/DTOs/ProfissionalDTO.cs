namespace Gestao.Profissionais.API.Application.DTOs;

public class ProfissionalDTO
{
    public long Id { get; set; }
    public string Nome { get; set; }
    public string NumeroDocumento { get; set; }
    public long EspecialidadeId { get; set; }
    public DateTime CriadoEm { get; set; }
}
