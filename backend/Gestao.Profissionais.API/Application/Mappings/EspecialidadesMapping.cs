using AutoMapper;
using Gestao.Profissionais.API.Application.DTOs;

namespace Gestao.Profissionais.API.Application.Mappings;

public class EspecialidadesMapping : Profile
{
    public EspecialidadesMapping()
    {
        CreateMap<EspecialidadeDTO, EspecialidadeEntity>().ReverseMap();
    }
}
