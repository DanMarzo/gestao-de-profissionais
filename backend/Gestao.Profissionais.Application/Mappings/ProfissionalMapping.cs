namespace Gestao.Profissionais.Application.Mappings;

public class ProfissionalMapping : Profile
{
    public ProfissionalMapping()
    {
        CreateMap<ProfissionalDTO, ProfissionalEntity>().ReverseMap();
        CreateMap<ProfissionalDetalhesDTO, ProfissionalEntity>().ReverseMap();
    }
}
