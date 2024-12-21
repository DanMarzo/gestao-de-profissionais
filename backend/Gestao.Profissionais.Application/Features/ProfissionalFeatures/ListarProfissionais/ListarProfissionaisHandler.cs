using Microsoft.Extensions.Logging;

namespace Gestao.Profissionais.Application.Features.ProfissionalFeatures.ListarProfissionais;

public class ListarProfissionaisHandler : IRequestHandler<ListarProfissionaisRequest, ResponseListDTO<ProfissionalDetalhesDTO>>
{
    private readonly IRepository repository;
    private readonly IMapper mapper;
    private readonly ILogger<ListarProfissionaisHandler> logger;
    public ListarProfissionaisHandler(IRepository repository, IMapper mapper, ILogger<ListarProfissionaisHandler> logger)
    {
        this.repository = repository;
        this.mapper = mapper;
        this.logger = logger;
    }

    public async Task<ResponseListDTO<ProfissionalDetalhesDTO>> Handle(ListarProfissionaisRequest request, CancellationToken cancellationToken)
    {
        this.logger.LogInformation($"Request {JsonSerializer.Serialize(request)}");
        //Efetuar validacoes
        request.ExecutarValidacoes<ValidateException>();

        var totalItens = 0;
        List<Expression<Func<ProfissionalEntity, object>>> include = [];
        if (request.EspecialidadeId is not null)
        {
            profissionais = await repository.ListEntities<ProfissionalEntity>(
                request,
                includes: [inc => inc.Especialidade],
                where: x => x.EspecialidadeId == request.EspecialidadeId);
        }
        else
        {
            profissionais = await repository.ListEntities<ProfissionalEntity>(
                request,
                includes: [inc => inc.Especialidade]);
        }

        var profissionaisDTO = mapper.Map<IEnumerable<ProfissionalDetalhesDTO>>(profissionais);
        result.Data = profissionaisDTO;
        return result;
    }
}
