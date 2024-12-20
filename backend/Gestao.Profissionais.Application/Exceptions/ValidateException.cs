namespace Gestao.Profissionais.Application.Exceptions;

public class ValidateException : Exception
{
    public ValidateException(string message) : base(message)
    {
        StatusCode = HttpStatusCode.BadRequest;
    }

    public ValidateException(string message, HttpStatusCode statusCode) : base(message)
    {
        StatusCode = statusCode;
    }

    public HttpStatusCode StatusCode { get; set; }
}
