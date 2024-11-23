namespace Gestao.Profissionais.API.Application.DTOs.ProfissionalDTOs;

public class DetalhesProfissionalDTO
{
    public long Id { get; set; }
    public string Nome { get; set; }
    public string NumeroDocumento { get; set; }
    public long EspecialidadeId { get; set; }
    public DateTime CriadoEm { get; set; }
}
