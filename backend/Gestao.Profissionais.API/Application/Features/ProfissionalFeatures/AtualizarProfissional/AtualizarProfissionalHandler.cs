using Gestao.Profissionais.API.Application.Contracts;
using Gestao.Profissionais.API.Application.DTOs.ProfissionalDTOs;
using Gestao.Profissionais.API.Application.Exceptions;
using System.Net;

namespace Gestao.Profissionais.API.Application.Features.ProfissionalFeatures.AtualizarProfissional;

public class AtualizarProfissionalHandler : IRequestHandler<AtualizarProfissionalRequest, ProfissionalDetalhesDTO>
{
    private readonly IRepository repository;
    private readonly ILogger<AtualizarProfissionalHandler> logger;
    private readonly IMapper mapper;
    public AtualizarProfissionalHandler(IRepository repository, ILogger<AtualizarProfissionalHandler> logger, IMapper mapper)
    {
        this.repository = repository;
        this.logger = logger;
        this.mapper = mapper;
    }

    public async Task<ProfissionalDetalhesDTO> Handle(AtualizarProfissionalRequest request, CancellationToken cancellationToken)
    {
        var profissional = await this.repository.GetEntityAsync<ProfissionalEntity>(x => x.Id == request.Id)
            ?? throw new ValidateException("Profissional não localizada.", HttpStatusCode.NotFound);

        profissional.EspecialidadeId = request.Profissional.EspecialidadeId;
        profissional.NumeroDocumento = request.Profissional.NumeroDocumento;
        profissional.Nome = request.Profissional.Nome;
        await this.repository.UpdateAsync(profissional);

        var profissionalDto = this.mapper.Map<ProfissionalDetalhesDTO>(profissional);
        return profissionalDto;
    }
}
