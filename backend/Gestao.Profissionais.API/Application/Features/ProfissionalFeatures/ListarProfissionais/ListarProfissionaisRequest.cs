using Gestao.Profissionais.API.Application.DTOs;
using Gestao.Profissionais.API.Application.DTOs.ProfissionalDTOs;

namespace Gestao.Profissionais.API.Application.Features.ProfissionalFeatures.ListarProfissionais;

public class ListarProfissionaisRequest : RequestListDTO, IRequest<ResponseListDTO<ProfissionalDetalhesDTO>>
{
    public ListarProfissionaisRequest(int indice) : base(indice) { }
    public ListarProfissionaisRequest(int indice, int? qtde) : base(indice, qtde) { }
}
