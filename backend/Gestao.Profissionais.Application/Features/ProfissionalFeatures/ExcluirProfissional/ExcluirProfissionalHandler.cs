namespace Gestao.Profissionais.Application.Features.ProfissionalFeatures.ExcluirProfissional;

public class ExcluirProfissionalHandler : IRequestHandler<ExcluirProfissionalRequest>
{
    private readonly ILogger<ExcluirProfissionalHandler> logger;
    private readonly IRepository repository;
    public ExcluirProfissionalHandler(ILogger<ExcluirProfissionalHandler> logger, IRepository repository)
    {
        this.logger = logger;
        this.repository = repository;
    }

    public async Task Handle(ExcluirProfissionalRequest request, CancellationToken cancellationToken)
    {
        var profissional = await repository.GetEntityAsync<ProfissionalEntity>(x => x.Id == request.Id)
            ?? throw new ValidateException("Profissional não localizado.", HttpStatusCode.NotFound);
        var linhasAfetadas = await repository.DeleteAsync<ProfissionalEntity>(profissional);
        if (linhasAfetadas == 0)
            throw new ValidateException("Não foi possível excluir o profissional.");
    }
}
