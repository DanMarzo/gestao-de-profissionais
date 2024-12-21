namespace Gestao.Profissionais.Application.DTOs;

public class RequestListDTO
{
    public RequestListDTO(int indice)
    {
        this.Indice = indice;
    }
    public RequestListDTO(int indice, int? qtde)
    {
        this.Indice = indice;
        this.Qtde = qtde ?? 3;
    }

    public int Indice { get; }
    public int Qtde { get; } = 3;

    public int CalcularItensAPular()
    {
        int pular = (Indice - 1) * Qtde;
        return pular;
    }
    public bool IsInvalidIndex() => this.Indice < 1;
    public bool QtdeNegativa() => this.Qtde < 0;
    public bool QtdeMaior20() => this.Qtde > 20;
}