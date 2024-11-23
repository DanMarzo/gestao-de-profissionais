using Gestao.Profissionais.API.Application.DTOs;

namespace Gestao.Profissionais.API.Application.Mappings;

public class ProfissionalMapping : Profile
{
    public ProfissionalMapping()
    {
        CreateMap<ProfissionalDTO, ProfissionalEntity>().ReverseMap();
    }
}
