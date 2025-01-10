namespace Gestao.Profissionais.Application.Features.ProfissionalFeatures.Commands.ExcluirProfissional;

public class ExcluirProfissionalCommandHandler : IRequestHandler<ExcluirProfissionalCommandRequest>
{
    private readonly ILogger<ExcluirProfissionalCommandHandler> logger;
    private readonly IRepository repository;
    public ExcluirProfissionalCommandHandler(ILogger<ExcluirProfissionalCommandHandler> logger, IRepository repository)
    {
        this.logger = logger;
        this.repository = repository;
    }

    public async Task Handle(ExcluirProfissionalCommandRequest request, CancellationToken cancellationToken)
    {
        var profissional = await repository.GetEntityAsync<ProfissionalEntity>(x => x.Id == request.Id)
            ?? throw new ValidateException("Profissional não localizado.", HttpStatusCode.NotFound);
        var linhasAfetadas = await repository.DeleteAsync(profissional);
        if (linhasAfetadas == 0)
            throw new ValidateException("Não foi possível excluir o profissional.");
    }
}
