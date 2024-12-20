namespace Gestao.Profissionais.Application.DTOs.ProfissionalDTOs;

public class ProfissionalDTO
{
    [JsonPropertyName("nome")]
    public string Nome { get; set; }
    [JsonPropertyName("numeroDocumento")]
    public string NumeroDocumento { get; set; }
    [JsonPropertyName("especialidadeId")]
    public long EspecialidadeId { get; set; }
    public ProfissionalEntity CriarProfissional()
    {
        var profissional = new ProfissionalEntity(Nome, NumeroDocumento, EspecialidadeId);
        return profissional;
    }
}
