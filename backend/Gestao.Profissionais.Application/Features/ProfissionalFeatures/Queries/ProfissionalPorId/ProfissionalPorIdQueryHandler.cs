namespace Gestao.Profissionais.Application.Features.ProfissionalFeatures.Queries.ProfissionalPorId;

public class ProfissionalPorIdQueryHandler : IRequestHandler<ProfissionalPorIdQueryRequest, ProfissionalDetalhesDTO>
{
    private readonly ILogger<ProfissionalPorIdQueryHandler> logger;
    private readonly IRepository repository;
    private readonly IMapper mapper;

    public ProfissionalPorIdQueryHandler(ILogger<ProfissionalPorIdQueryHandler> logger, IRepository repository, IMapper mapper)
    {
        this.logger = logger;
        this.repository = repository;
        this.mapper = mapper;
    }

    public async Task<ProfissionalDetalhesDTO> Handle(ProfissionalPorIdQueryRequest request, CancellationToken cancellationToken)
    {
        var profissional = await repository.GetEntityAsync<ProfissionalEntity>(x => x.Id == request.Id, includes: [inc => inc.Especialidade])
            ?? throw new ValidateException("Não foi possível localizar o profissional", HttpStatusCode.NotFound);
        var profissionalDto = mapper.Map<ProfissionalDetalhesDTO>(profissional);
        return profissionalDto;
    }
}
