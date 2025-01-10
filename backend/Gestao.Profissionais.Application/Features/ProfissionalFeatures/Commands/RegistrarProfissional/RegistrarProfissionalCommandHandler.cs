namespace Gestao.Profissionais.Application.Features.ProfissionalFeatures.Commands.RegistrarProfissional;

public class RegistrarProfissionalCommandHandler : IRequestHandler<RegistrarProfissionalCommandRequest, ResponseCreateAPIModel<long>>
{
    private readonly IRepository repository;
    private readonly ILogger<RegistrarProfissionalCommandHandler> logger;
    public RegistrarProfissionalCommandHandler(IRepository repository, ILogger<RegistrarProfissionalCommandHandler> logger)
    {
        this.repository = repository;
        this.logger = logger;
    }

    public async Task<ResponseCreateAPIModel<long>> Handle(RegistrarProfissionalCommandRequest request, CancellationToken cancellationToken)
    {
        if (request.EspecialidadeId == 0)
            throw new ValidateException($"Especialidade Id {request.EspecialidadeId} é inválido!");

        var especialidadeExiste = await repository.EntityExists<EspecialidadeEntity>(x => x.Id == request.EspecialidadeId);
        if (!especialidadeExiste)
            throw new ValidateException($"Especialidade Id {request.EspecialidadeId} informada não localizada!");
        var profissional = request.CriarProfissional();
        await repository.AddAsync(profissional);
        return new ResponseCreateAPIModel<long>(profissional.Id);
    }
}
