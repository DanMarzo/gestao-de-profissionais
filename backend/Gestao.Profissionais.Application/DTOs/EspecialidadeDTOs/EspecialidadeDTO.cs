namespace Gestao.Profissionais.Application.DTOs.EspecialidadeDTOs;

public sealed class EspecialidadeDTO
{
    [JsonPropertyName("id")]
    public long Id { get; set; }
    [JsonPropertyName("nome")]
    public string Nome { get; set; }
    [JsonPropertyName("tipoDocumento")]
    public TipoDocEspecialidadeEnum TipoDocumento { get; set; }
}
