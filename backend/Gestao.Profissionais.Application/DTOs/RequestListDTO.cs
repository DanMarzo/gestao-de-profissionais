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

    public void ExecutarValidacoes<TException>() where TException : Exception
    {
        Exception? exception = null;

        if (this.IsInvalidIndex())
            exception = (TException)Activator.CreateInstance(typeof(TException), $"Indice {this.Indice} é inválido.")!;

        if (this.QtdeNegativa())
            exception = (TException)Activator.CreateInstance(typeof(TException), $"Quantidade de itens da busca não pode ser negativo {this.Qtde}.")!;

        if (this.QtdeMaior20())
            exception = (TException)Activator.CreateInstance(typeof(TException), $"Quantidade de itens da busca não pode ser superior a 20 - Qtde informada {this.Qtde}.")!;

        if (exception is not null)
            throw exception;
    }
}