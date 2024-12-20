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
        if (request.IsInvalidIndex())
            throw new ValidateException($"Indice {request.Indice} é inválido");

        int totalItens = request.EspecialidadeId is not null ?
            await repository.CountAsync<ProfissionalEntity>(where: x => x.EspecialidadeId == request.EspecialidadeId)
            : await repository.CountAsync<ProfissionalEntity>();

        var result = new ResponseListDTO<ProfissionalDetalhesDTO>(request, totalItens);
        if (totalItens == 0)
            return result;
        //Para melhor visualizacao foi utilizado 'IF ELSE'
        IEnumerable<ProfissionalEntity> profissionais = [];
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
