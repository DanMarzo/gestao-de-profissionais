using Gestao.Profissionais.API.Application.DTOs.ProfissionalDTOs;

namespace Gestao.Profissionais.API.Application.Features.ProfissionalFeatures.ProfissionalPorId;

public class ProfissionalPorIdRequest : IRequest<ProfissionalDetalhesDTO>
{
    public ProfissionalPorIdRequest(long id) { this.Id = id; }

    public long Id { get; private set; }
}
