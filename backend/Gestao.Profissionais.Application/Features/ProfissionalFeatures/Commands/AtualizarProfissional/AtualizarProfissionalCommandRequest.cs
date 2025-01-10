namespace Gestao.Profissionais.Application.Features.ProfissionalFeatures.Commands.AtualizarProfissional;

public class AtualizarProfissionalCommandRequest : IRequest<ProfissionalDetalhesDTO>
{
    public AtualizarProfissionalCommandRequest(long id, ProfissionalDTO profissional)
    {
        Id = id;
        Profissional = profissional;
    }

    public long Id { get; private set; }
    public ProfissionalDTO Profissional { get; private set; }
}
