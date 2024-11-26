namespace Gestao.Profissionais.API.Application.DTOs;

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
        int pular = (this.Indice - 1) * this.Qtde;
        return pular;
    }
}