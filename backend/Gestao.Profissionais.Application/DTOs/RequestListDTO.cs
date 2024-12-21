namespace Gestao.Profissionais.Application.DTOs;

public class RequestListDTO
{
    public RequestListDTO(int indice)
    {
        Indice = indice;
    }
    public RequestListDTO(int indice, int? qtde)
    {
        Indice = indice;
        Qtde = qtde ?? 3;
    }

    public int Indice { get; }
    public int Qtde { get; } = 3;

    public int CalcularItensAPular()
    {
        int pular = (Indice - 1) * Qtde;
        return pular;
    }
    public bool IsInvalidIndex() => this.Indice < 1;
}