namespace Gestao.Profissionais.Application.DTOs.ProfissionalDTOs;

public class ProfissionalDetalhesDTO
{
    [JsonPropertyName("id")]
    public long Id { get; set; }
    [JsonPropertyName("criadoEm")]
    public DateTime CriadoEm { get; set; }
    [JsonPropertyName("nome")]
    public string Nome { get; set; }
    [JsonPropertyName("numeroDocumento")]
    public string NumeroDocumento { get; set; }
    [JsonPropertyName("especialidade")]
    public EspecialidadeDTO Especialidade { get; set; }
}
