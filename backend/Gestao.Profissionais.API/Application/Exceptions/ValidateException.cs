using System.Net;

namespace Gestao.Profissionais.API.Application.Exceptions;

public class ValidateException : Exception
{
    public ValidateException(string message) : base(message)
    {
        this.StatusCode = HttpStatusCode.BadRequest;
    }

    public ValidateException(string message, HttpStatusCode statusCode) : base(message)
    {
        this.StatusCode = statusCode;
    }

    public HttpStatusCode StatusCode { get; set; }
}
