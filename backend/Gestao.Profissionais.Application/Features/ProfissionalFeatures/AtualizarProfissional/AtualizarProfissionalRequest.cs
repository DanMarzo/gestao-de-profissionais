namespace Gestao.Profissionais.Application.Features.ProfissionalFeatures.AtualizarProfissional;

public class AtualizarProfissionalRequest : IRequest<ProfissionalDetalhesDTO>
{
    public AtualizarProfissionalRequest(long id, ProfissionalDTO profissional)
    {
        Id = id;
        Profissional = profissional;
    }

    public long Id { get; private set; }
    public ProfissionalDTO Profissional { get; private set; }
}
