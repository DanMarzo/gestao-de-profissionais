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
        var entidades = await this.mediator.Send(new ObterEspecialidadesQueryRequest());
        return Ok(entidades);
    }
}
