namespace Gestao.Profissionais.Application.DTOs;

public class ResponseCreateAPIDTO<T>
{
    public ResponseCreateAPIDTO(T id)
    {
        Id = id;
    }
    public T Id { get; set; }
}
