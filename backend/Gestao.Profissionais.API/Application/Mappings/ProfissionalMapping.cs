using Gestao.Profissionais.API.Application.DTOs.ProfissionalDTOs;

namespace Gestao.Profissionais.API.Application.Mappings;

public class ProfissionalMapping : Profile
{
    public ProfissionalMapping()
    {
        CreateMap<ProfissionalDTO, ProfissionalEntity>().ReverseMap();
        CreateMap<DetalhesProfissionalDTO, ProfissionalEntity>().ReverseMap();
    }
}
