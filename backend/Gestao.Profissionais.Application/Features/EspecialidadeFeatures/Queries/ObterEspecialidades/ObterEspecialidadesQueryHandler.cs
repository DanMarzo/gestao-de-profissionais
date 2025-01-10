namespace Gestao.Profissionais.Application.Features.EspecialidadeFeatures.Queries.ObterEspecialidades;

public class ObterEspecialidadesQueryHandler : IRequestHandler<ObterEspecialidadesQueryRequest, IEnumerable<EspecialidadeDTO>>
{
    private readonly IRepository repository;
    private readonly ILogger<ObterEspecialidadesQueryHandler> logger;
    private readonly IMapper mapper;
    public ObterEspecialidadesQueryHandler(IRepository repository, ILogger<ObterEspecialidadesQueryHandler> logger, IMapper mapper)
    {
        this.repository = repository;
        this.logger = logger;
        this.mapper = mapper;
    }

    public async Task<IEnumerable<EspecialidadeDTO>> Handle(ObterEspecialidadesQueryRequest request, CancellationToken cancellationToken)
    {
        logger.LogInformation("Request: Lista de especialidades.");

        var especialidades = await repository.GetEntities<EspecialidadeEntity>();
        var especialidadesDto = mapper.Map<IEnumerable<EspecialidadeDTO>>(especialidades);

        logger.LogInformation($"Response: Lista de especialidades {JsonSerializer.Serialize(especialidadesDto)}");
        return especialidadesDto;
    }
}
