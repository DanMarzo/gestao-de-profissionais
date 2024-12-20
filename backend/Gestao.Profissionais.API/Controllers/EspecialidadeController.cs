using Gestao.Profissionais.Application.Features.EspecialidadeFeatures.ObterEspecialidades;
using Microsoft.AspNetCore.Mvc;

namespace Gestao.Profissionais.API.Controllers;

[Route("api/[controller]")]
[ApiController]
public class EspecialidadeController : ControllerBase
{
    private readonly IMediator mediator;
    public EspecialidadeController(IMediator mediator) { this.mediator = mediator; }

    [HttpGet]
    public async Task<IActionResult> ObterTodas()
    {
        var entidades = await this.mediator.Send(new ObterEspecialidadesRequest());
        return Ok(entidades);
    }
}
