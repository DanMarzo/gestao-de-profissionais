namespace Gestao.Profissionais.Application.Features.ProfissionalFeatures.ExcluirProfissional;

public class ExcluirProfissionalRequest : IRequest
{
    public ExcluirProfissionalRequest(long id)
    {
        Id = id;
    }
    public long Id { get; private set; }
}
