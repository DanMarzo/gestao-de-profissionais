namespace Gestao.Profissionais.Application.Features.ProfissionalFeatures.Queries.ProfissionalPorId;

public class ProfissionalPorIdQueryRequest : IRequest<ProfissionalDetalhesDTO>
{
    public ProfissionalPorIdQueryRequest(long id) { Id = id; }

    public long Id { get; private set; }
}
