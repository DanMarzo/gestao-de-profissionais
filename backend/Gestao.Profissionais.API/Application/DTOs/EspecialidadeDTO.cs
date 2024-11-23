using Gestao.Profissionais.API.Domain.Enums;

namespace Gestao.Profissionais.API.Application.DTOs;

public sealed class EspecialidadeDTO
{
    public long Id { get; set; }
    public string Nome { get; set; }
    public TipoDocEspecialidadeEnum TipoDocumento { get; set; }
}
