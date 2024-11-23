using Gestao.Profissionais.API.Application.Features.ProfissionalFeatures.ExcluirProfissional;
using Gestao.Profissionais.API.Application.Features.ProfissionalFeatures.RegistrarProfissional;
using Microsoft.AspNetCore.Mvc;

namespace Gestao.Profissionais.API.Controllers;

[Route("api/[controller]")]
[ApiController]
public class ProfissionalController : ControllerBase
{
    private readonly IMediator mediator;
    public ProfissionalController(IMediator mediator) { this.mediator = mediator; }

    [HttpPost]
    public async Task<IActionResult> Registrar([FromBody] RegistrarProfissionalRequest request)
    {
        var profissionalId = await mediator.Send(request);
        return Created($"{profissionalId.Id}", profissionalId);
    }

    [HttpDelete("{id:long}")]
    public async Task<IActionResult> ExcluirPorId([FromRoute] long id)
    {
        await this.mediator.Send(new ExcluirProfissionalRequest(id));
        return Ok();
    }
}
