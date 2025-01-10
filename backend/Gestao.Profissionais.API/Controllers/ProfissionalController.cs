using Gestao.Profissionais.Application.Features.ProfissionalFeatures.Commands.RegistrarProfissional;

namespace Gestao.Profissionais.API.Controllers;

[Route("api/[controller]")]
[ApiController]
public class ProfissionalController : ControllerBase
{
    private readonly IMediator mediator;
    public ProfissionalController(IMediator mediator) { this.mediator = mediator; }

    [HttpPost]
    public async Task<IActionResult> Registrar([FromBody] RegistrarProfissionalCommandRequest request)
    {
        var profissionalId = await mediator.Send(request);
        return Created(nameof(PorId), profissionalId);
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

    [HttpGet]
    public async Task<IActionResult> Listar([FromQuery] int pagina, [FromQuery] int? itens, [FromQuery] long? especialidadeId)
    {
        var responseList = await this.mediator.Send(new ListarProfissionaisRequest(pagina, itens, especialidadeId));
        return Ok(responseList);
    }
}
