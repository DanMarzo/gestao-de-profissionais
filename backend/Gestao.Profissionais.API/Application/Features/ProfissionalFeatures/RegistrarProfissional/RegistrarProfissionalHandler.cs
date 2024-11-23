using Gestao.Profissionais.API.Application.Contracts;
using Gestao.Profissionais.API.Application.DTOs;
using Gestao.Profissionais.API.Application.Exceptions;

namespace Gestao.Profissionais.API.Application.Features.ProfissionalFeatures.RegistrarProfissional;

public class RegistrarProfissionalHandler : IRequestHandler<RegistrarProfissionalRequest, ResponseCreateAPIDTO<long>>
{
    private readonly IRepository repository;
    private readonly ILogger<RegistrarProfissionalHandler> logger;
    public RegistrarProfissionalHandler(IRepository repository, ILogger<RegistrarProfissionalHandler> logger)
    {
        this.repository = repository;
        this.logger = logger;
    }

    public async Task<ResponseCreateAPIDTO<long>> Handle(RegistrarProfissionalRequest request, CancellationToken cancellationToken)
    {
        var especialidadeExiste = await this.repository.EntityExists<EspecialidadeEntity>(x => x.Id == request.EspecialidadeId);
        if (!especialidadeExiste)
            throw new ValidateException($"Especialidade Id {request.EspecialidadeId} informada não localizada!");
        var profissional = request.CriarProfissional();
        await this.repository.AddAsync(profissional);
        return new ResponseCreateAPIDTO<long>(profissional.Id);
    }
}
