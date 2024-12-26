namespace Gestao.Profissionais.Domain.Models;

public class RequestListModel
{
    public RequestListModel(int indice)
    {
        Indice = indice;
    }
    public RequestListModel(int indice, int? qtde)
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
    public bool IsInvalidIndex() => Indice < 1;
    public bool QtdeNegativa() => Qtde < 0;
    public bool QtdeMaior20() => Qtde > 20;

    public void ExecutarValidacoes<TException>() where TException : Exception
    {
        Exception? exception = null;

        if (IsInvalidIndex())
            exception = (TException)Activator.CreateInstance(typeof(TException), $"Indice {Indice} é inválido.")!;

        if (QtdeNegativa())
            exception = (TException)Activator.CreateInstance(typeof(TException), $"Quantidade de itens da busca não pode ser negativo {Qtde}.")!;

        if (QtdeMaior20())
            exception = (TException)Activator.CreateInstance(typeof(TException), $"Quantidade de itens da busca não pode ser superior a 20 - Qtde informada {Qtde}.")!;

        if (exception is not null)
            throw exception;
    }
}