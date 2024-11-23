namespace Gestao.Profissionais.API.Application.DTOs;

public class ResponseCreateAPIDTO<T>
{
    public ResponseCreateAPIDTO(T id)
    {
        this.Id = id;
    }
    public T Id { get; set; }
}
