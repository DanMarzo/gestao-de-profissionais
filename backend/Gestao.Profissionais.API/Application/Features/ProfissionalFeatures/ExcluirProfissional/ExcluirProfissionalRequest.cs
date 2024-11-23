namespace Gestao.Profissionais.API.Application.Features.ProfissionalFeatures.ExcluirProfissional;

public class ExcluirProfissionalRequest : IRequest
{
    public ExcluirProfissionalRequest(long id)
    {
        this.Id = id;
    }
    public long Id { get; private set; }
}
