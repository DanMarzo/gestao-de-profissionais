using Gestao.Profissionais.API.Application.DTOs;
using Gestao.Profissionais.API.Application.DTOs.ProfissionalDTOs;

namespace Gestao.Profissionais.API.Application.Features.ProfissionalFeatures.RegistrarProfissional;

public class RegistrarProfissionalRequest : ProfissionalDTO, IRequest<ResponseCreateAPIDTO<long>> { }
