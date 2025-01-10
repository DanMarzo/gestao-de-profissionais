namespace Gestao.Profissionais.Application.Features.ProfissionalFeatures.Queries.ProfissionalPorId;

public class ProfissionalPorIdRequest : IRequest<ProfissionalDetalhesDTO>
{
    public ProfissionalPorIdRequest(long id) { Id = id; }

    public long Id { get; private set; }
}
