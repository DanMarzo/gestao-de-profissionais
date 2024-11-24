using System.Text.Json.Serialization;

namespace Gestao.Profissionais.API.Application.DTOs.ProfissionalDTOs;

public class ProfissionalDTO
{
    [JsonPropertyName("nome")]
    public string Nome { get; set; }
    [JsonPropertyName("numeroDocumento")]
    public string NumeroDocumento { get; set; }
    [JsonPropertyName("especialidadeId ")]
    public long EspecialidadeId { get; set; }
    public ProfissionalEntity CriarProfissional()
    {
        var profissional = new ProfissionalEntity(this.Nome, this.NumeroDocumento, this.EspecialidadeId);
        return profissional;
    }
}
