using System.Text.Json.Serialization;

namespace Gestao.Profissionais.API.Application.DTOs;

public class ResponseListDTO<T>
{
    public ResponseListDTO(RequestListDTO request, int totalItens)
    {
        this.Qtde = request.Qtde;
        this.Indice = request.Indice;
        this.NroPaginas = this.CalcularNroPaginas(totalItens);
        this.TotalItens = totalItens;
    }

    private int CalcularNroPaginas(int total)
    {
        var nroPaginas = (int)Math.Ceiling(total / (double)this.Qtde);
        return nroPaginas;
    }

    [JsonPropertyName("qtde")]
    public int Qtde { get; }
    [JsonPropertyName("nroPaginas")]
    public int NroPaginas { get; }
    [JsonPropertyName("totalItens")]
    public int TotalItens { get; }
    [JsonPropertyName("indice")]
    public int Indice { get; }
    [JsonPropertyName("data")]
    public IEnumerable<T> Data { get; set; }
}
