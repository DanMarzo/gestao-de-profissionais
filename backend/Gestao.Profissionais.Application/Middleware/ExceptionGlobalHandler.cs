namespace Gestao.Profissionais.Application.Middleware;

public class ExceptionGlobalHandler : IExceptionHandler
{
    public async ValueTask<bool> TryHandleAsync(HttpContext httpContext, Exception exception, CancellationToken cancellationToken)
    {
        ErrorResponse? response = null;
        if (typeof(ValidateException) == exception.GetType())
        {
            var validException = exception as ValidateException;
            response = new ErrorResponse(validException!);
        }
        else
        {
            response = new ErrorResponse(500, "Erro interno.");
        }
        httpContext.Response.StatusCode = response.StatusCode;
        await httpContext.Response.WriteAsJsonAsync(response, cancellationToken);
        return true;
    }

    class ErrorResponse
    {
        public ErrorResponse(ValidateException validateException)
        {
            Message = validateException.Message;
            StatusCode = (int)validateException.StatusCode;
        }

        public ErrorResponse(int statusCode, string message)
        {
            StatusCode = statusCode;
            Message = message;
        }
        [JsonPropertyName("statusCode")]
        public int StatusCode { get; }
        [JsonPropertyName("message")]
        public string Message { get; }
    };
}
