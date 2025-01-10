namespace Gestao.Profissionais.Application.Features.ProfissionalFeatures.Queries.ListarProfissionais;

public class ListarProfissionaisQueryRequest : RequestListModel, IRequest<ResponseListModel<ProfissionalDetalhesDTO>>
{
    public ListarProfissionaisQueryRequest(int indice) : base(indice) { }
    public ListarProfissionaisQueryRequest(int indice, int qtde) : base(indice, qtde) { }
    public ListarProfissionaisQueryRequest(int indice, int? qtde, long? especialidadeId) : base(indice, qtde)
    {
        EspecialidadeId = especialidadeId;
    }

    public long? EspecialidadeId { get; }


}
