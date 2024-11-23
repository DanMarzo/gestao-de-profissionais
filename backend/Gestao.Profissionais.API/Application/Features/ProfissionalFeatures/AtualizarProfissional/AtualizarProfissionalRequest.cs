using Gestao.Profissionais.API.Application.DTOs.ProfissionalDTOs;

namespace Gestao.Profissionais.API.Application.Features.ProfissionalFeatures.AtualizarProfissional;

public class AtualizarProfissionalRequest : IRequest<ProfissionalDetalhesDTO>
{
    public AtualizarProfissionalRequest(long id, ProfissionalDTO profissional)
    {
        this.Id = id;
        this.Profissional = profissional;
    }

    public long Id { get; private set; }
    public ProfissionalDTO Profissional { get; private set; }
}
