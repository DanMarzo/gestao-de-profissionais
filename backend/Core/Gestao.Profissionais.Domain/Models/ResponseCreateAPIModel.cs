namespace Gestao.Profissionais.Domain.Models;

public class ResponseCreateAPIModel<T>
{
    public ResponseCreateAPIModel(T id)
    {
        Id = id;
    }
    public T Id { get; set; }
}
