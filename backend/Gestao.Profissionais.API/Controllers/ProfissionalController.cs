using Gestao.Profissionais.API.Application.DTOs.ProfissionalDTOs;
using Gestao.Profissionais.API.Application.Features.ProfissionalFeatures.AtualizarProfissional;
using Gestao.Profissionais.API.Application.Features.ProfissionalFeatures.ExcluirProfissional;
using Gestao.Profissionais.API.Application.Features.ProfissionalFeatures.ProfissionalPorId;
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

    [HttpGet("{id:long}")]
    public async Task<IActionResult> PorId([FromRoute] long id)
    {
        var profissionalDto = await this.mediator.Send(new ProfissionalPorIdRequest(id));
        return Ok(profissionalDto);
    }

    [HttpPut("{id:long}")]
    public async Task<IActionResult> Atualizar([FromRoute] long id, [FromBody] ProfissionalDTO profissional)
    {
        var profissionalDetalhes = await this.mediator.Send(new AtualizarProfissionalRequest(id, profissional));
        return Ok(profissionalDetalhes);
    }
}
