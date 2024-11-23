namespace Gestao.Profissionais.API.Application.DTOs.ProfissionalDTOs;

public class ProfissionalDTO
{
    public string Nome { get; set; }
    public string NumeroDocumento { get; set; }
    public long EspecialidadeId { get; set; }
    public ProfissionalEntity CriarProfissional()
    {
        var profissional = new ProfissionalEntity(this.Nome, this.NumeroDocumento, this.EspecialidadeId);
        return profissional;
    }
}
