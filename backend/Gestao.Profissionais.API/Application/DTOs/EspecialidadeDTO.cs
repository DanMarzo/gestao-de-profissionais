using Gestao.Profissionais.API.Domain.Enums;
using System.Text.Json.Serialization;

namespace Gestao.Profissionais.API.Application.DTOs;

public sealed class EspecialidadeDTO
{
    [JsonPropertyName("id")]
    public long Id { get; set; }
    [JsonPropertyName("nome")]
    public string Nome { get; set; }
    [JsonPropertyName("tipoDocumento")]
    public TipoDocEspecialidadeEnum TipoDocumento { get; set; }
}
