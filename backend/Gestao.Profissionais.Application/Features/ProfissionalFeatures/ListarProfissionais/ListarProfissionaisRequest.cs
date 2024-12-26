namespace Gestao.Profissionais.Application.Features.ProfissionalFeatures.ListarProfissionais;

public class ListarProfissionaisRequest : RequestListModel, IRequest<ResponseListModel<ProfissionalDetalhesDTO>>
{
    public ListarProfissionaisRequest(int indice) : base(indice) { }
    public ListarProfissionaisRequest(int indice, int qtde) : base(indice, qtde) { }
    public ListarProfissionaisRequest(int indice, int? qtde, long? especialidadeId) : base(indice, qtde)
    {
        this.EspecialidadeId = especialidadeId;
    }

    public long? EspecialidadeId { get; }

    
}
