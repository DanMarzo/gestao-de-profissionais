using Gestao.Profissionais.API.Application.Contracts;
using Gestao.Profissionais.API.Application.DTOs;

namespace Gestao.Profissionais.API.Application.Features.EspecialidadeFeatures.ObterEspecialidades;

public class ObterEspecialidadesHandler : IRequestHandler<ObterEspecialidadesRequest, IEnumerable<EspecialidadeDTO>>
{
    private readonly IRepository repository;
    private readonly ILogger<ObterEspecialidadesHandler> logger;
    private readonly IMapper mapper;
    public ObterEspecialidadesHandler(IRepository repository, ILogger<ObterEspecialidadesHandler> logger, IMapper mapper)
    {
        this.repository = repository;
        this.logger = logger;
        this.mapper = mapper;
    }

    public async Task<IEnumerable<EspecialidadeDTO>> Handle(ObterEspecialidadesRequest request, CancellationToken cancellationToken)
    {
        this.logger.LogInformation("Request: Lista de especialidades.");

        var especialidades = await this.repository.GetEntities<EspecialidadeEntity>();
        var especialidadesDto = this.mapper.Map<IEnumerable<EspecialidadeDTO>>(especialidades);

        this.logger.LogInformation($"Response: Lista de especialidades {JsonSerializer.Serialize(especialidadesDto)}");
        return especialidadesDto;
    }
}
