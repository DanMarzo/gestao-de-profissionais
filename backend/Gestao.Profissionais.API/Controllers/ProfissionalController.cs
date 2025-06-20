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
        await this.mediator.Send(new ExcluirProfissionalCommandRequest(id));
        return Ok();
    }

    [HttpGet("{id:long}")]
    public async Task<IActionResult> PorId([FromRoute] long id)
    {
        var profissionalDto = await this.mediator.Send(new ProfissionalPorIdQueryRequest(id));
        return Ok(profissionalDto);
    }

    [HttpPut("{id:long}")]
    public async Task<IActionResult> Atualizar([FromRoute] long id, [FromBody] ProfissionalDTO profissional)
    {
        var profissionalDetalhes = await this.mediator.Send(new AtualizarProfissionalCommandRequest(id, profissional));
        return Ok(profissionalDetalhes);
    }

    [HttpGet]
    public async Task<IActionResult> Listar([FromQuery] int? itens, [FromQuery] long? especialidadeId, [FromQuery] int pagina = 1)
    {
        var responseList = await this.mediator.Send(new ListarProfissionaisQueryRequest(pagina, itens, especialidadeId));
        return Ok(responseList);
    }
}
