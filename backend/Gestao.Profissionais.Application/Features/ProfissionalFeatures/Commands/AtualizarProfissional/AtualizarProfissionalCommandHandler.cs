namespace Gestao.Profissionais.Application.Features.ProfissionalFeatures.Commands.AtualizarProfissional;

public class AtualizarProfissionalCommandHandler : IRequestHandler<AtualizarProfissionalCommandRequest, ProfissionalDetalhesDTO>
{
    private readonly IRepository repository;
    private readonly ILogger<AtualizarProfissionalCommandHandler> logger;
    private readonly IMapper mapper;
    public AtualizarProfissionalCommandHandler(IRepository repository, ILogger<AtualizarProfissionalCommandHandler> logger, IMapper mapper)
    {
        this.repository = repository;
        this.logger = logger;
        this.mapper = mapper;
    }

    public async Task<ProfissionalDetalhesDTO> Handle(AtualizarProfissionalCommandRequest request, CancellationToken cancellationToken)
    {
        var profissional = await repository.GetEntityAsync<ProfissionalEntity>
            (x => x.Id == request.Id, true, [inc => inc.Especialidade])
            ?? throw new ValidateException("Profissional não localizada.", HttpStatusCode.NotFound);

        var especialidade = await repository.GetEntityAsync<EspecialidadeEntity>(where: x => x.Id == request.Profissional.EspecialidadeId)
            ?? throw new ValidateException("Especialidade não localizada.", HttpStatusCode.NotFound); ;

        profissional.Especialidade = especialidade;
        profissional.NumeroDocumento = request.Profissional.NumeroDocumento;
        profissional.Nome = request.Profissional.Nome;
        await repository.UpdateAsync(profissional);

        var profissionalDto = mapper.Map<ProfissionalDetalhesDTO>(profissional);
        return profissionalDto;
    }
}
