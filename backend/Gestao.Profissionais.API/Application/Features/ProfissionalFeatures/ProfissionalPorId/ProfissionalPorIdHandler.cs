using Gestao.Profissionais.API.Application.Contracts;
using Gestao.Profissionais.API.Application.DTOs.ProfissionalDTOs;
using Gestao.Profissionais.API.Application.Exceptions;
using System.Net;

namespace Gestao.Profissionais.API.Application.Features.ProfissionalFeatures.ProfissionalPorId;

public class ProfissionalPorIdHandler : IRequestHandler<ProfissionalPorIdRequest, ProfissionalDetalhesDTO>
{
    private readonly ILogger<ProfissionalPorIdHandler> logger;
    private readonly IRepository repository;
    private readonly IMapper mapper;

    public ProfissionalPorIdHandler(ILogger<ProfissionalPorIdHandler> logger, IRepository repository, IMapper mapper)
    {
        this.logger = logger;
        this.repository = repository;
        this.mapper = mapper;
    }

    public async Task<ProfissionalDetalhesDTO> Handle(ProfissionalPorIdRequest request, CancellationToken cancellationToken)
    {
        var profissional = await this.repository.GetEntityAsync<ProfissionalEntity>(x => x.Id == request.Id, includes: [inc => inc.Especialidade])
            ?? throw new ValidateException("Não foi possível localizar o profissional", HttpStatusCode.NotFound);
        var profissionalDto = this.mapper.Map<ProfissionalDetalhesDTO>(profissional);
        return profissionalDto;
    }
}
