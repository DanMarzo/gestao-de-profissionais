namespace Gestao.Profissionais.Application.Mappings;

public class EspecialidadesMapping : Profile
{
    public EspecialidadesMapping()
    {
        CreateMap<EspecialidadeDTO, EspecialidadeEntity>().ReverseMap();
    }
}
