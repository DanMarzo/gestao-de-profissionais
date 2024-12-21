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
            var especialidadeExiste = await this.repository
                .EntityExists<EspecialidadeEntity>(x => x.Id == request.EspecialidadeId);
            if (!especialidadeExiste) 
                throw new ValidateException($"Especialidade Id {request.EspecialidadeId} não localizada.", HttpStatusCode.NotFound);
            totalItens = await this.repository.CountAsync<ProfissionalEntity>(where: x => x.EspecialidadeId == request.EspecialidadeId);
            include = [inc => inc.Especialidade];
        }
        else
            totalItens = await this.repository.CountAsync<ProfissionalEntity>();

        var result = new ResponseListDTO<ProfissionalDetalhesDTO>(request, totalItens);
        if (totalItens == 0)
            return result;

        var profissionais = await
            this.repository
            .ListEntities<ProfissionalEntity>(
                request,
                includes: include);


        var profissionaisDTO = mapper.Map<IEnumerable<ProfissionalDetalhesDTO>>(profissionais);
        result.Data = profissionaisDTO;
        return result;
    }
}
