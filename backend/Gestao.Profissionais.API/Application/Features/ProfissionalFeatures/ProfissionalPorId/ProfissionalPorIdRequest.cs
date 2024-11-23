using Gestao.Profissionais.API.Application.DTOs;

namespace Gestao.Profissionais.API.Application.Features.ProfissionalFeatures.ProfissionalPorId;

public class ProfissionalPorIdRequest : IRequest<ProfissionalDTO>
{
    public ProfissionalPorIdRequest(long id) { this.Id = id; }

    public long Id { get; private set; }
}
