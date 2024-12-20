namespace Gestao.Profissionais.Application.DTOs;

public class ResponseListDTO<T>
{
    public ResponseListDTO(RequestListDTO request, int totalItens)
    {
        Qtde = request.Qtde;
        Indice = request.Indice;
        NroPaginas = CalcularNroPaginas(totalItens);
        TotalItens = totalItens;
    }

    private int CalcularNroPaginas(int total)
    {
        var nroPaginas = (int)Math.Ceiling(total / (double)Qtde);
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
