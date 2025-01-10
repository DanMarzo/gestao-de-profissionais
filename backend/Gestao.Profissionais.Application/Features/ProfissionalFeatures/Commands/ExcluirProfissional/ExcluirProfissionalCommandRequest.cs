namespace Gestao.Profissionais.Application.Features.ProfissionalFeatures.Commands.ExcluirProfissional;

public class ExcluirProfissionalCommandRequest : IRequest
{
    public ExcluirProfissionalCommandRequest(long id)
    {
        Id = id;
    }
    public long Id { get; private set; }
}
