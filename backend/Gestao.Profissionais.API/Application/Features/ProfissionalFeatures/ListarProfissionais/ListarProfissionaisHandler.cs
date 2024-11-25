using Gestao.Profissionais.API.Application.Contracts;
using Gestao.Profissionais.API.Application.DTOs;
using Gestao.Profissionais.API.Application.DTOs.ProfissionalDTOs;

namespace Gestao.Profissionais.API.Application.Features.ProfissionalFeatures.ListarProfissionais;

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
        var totalItens = await this.repository.CountAsync<ProfissionalEntity>();
        var result = new ResponseListDTO<ProfissionalDetalhesDTO>(request, totalItens);
        if (totalItens == 0)
            return result;
        var profissionais = await this.repository.ListEntities<ProfissionalEntity>(request, [inc => inc.Especialidade]);
        var profissionaisDTO = this.mapper.Map<IEnumerable<ProfissionalDetalhesDTO>>(profissionais);
        result.Data = profissionaisDTO;
        return result;
    }
}
