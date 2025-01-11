namespace Gestao.Profissionais.Tests.Features.ProfissionalFeature;

public class ListarProfissionaisTest
{
    private IRepository Repository { get; set; }
    private async Task ObterRepository()
    {
        var dbContextOptions = new DbContextOptionsBuilder<ApplicationDataContext>()
          .UseInMemoryDatabase(databaseName: "ListarProfissionaisTestDb") // Use um banco de dados em memória
          .Options;
        var context = new ApplicationDataContext(dbContextOptions);
        this.Repository ??= new Repository(context);
        var contagemEntidades = await this.Repository.CountAsync<EspecialidadeEntity>(x => x.Id == 1);
        if (contagemEntidades == 0)
            await this.Repository.AddAsync(new EspecialidadeEntity { Id = 1, Nome = "Pediatra", TipoDocumento = TipoDocEspecialidadeEnum.CRM });
    }

    [Fact(DisplayName = "Obter lista de profissionais com indice negativo")]
    public async void ObterProfissionaisComIndiceNegativo()
    {
        await this.ObterRepository();
        var mockLogger = new Mock<ILogger<ListarProfissionaisQueryHandler>>();

        var profissionalProfile = new ProfissionalMapping();
        var profile = new MapperConfiguration(x => x.AddProfile(profissionalProfile));
        IMapper mapper = new Mapper(profile);
        var request = new ListarProfissionaisQueryRequest(-1);
        var handler = new ListarProfissionaisQueryHandler(this.Repository, mapper, mockLogger.Object);

        Func<Task> act = async () => await handler.Handle(request, new CancellationToken());

        await act.Should()
            .ThrowAsync<ValidateException>()
            .WithMessage($"Indice {request.Indice} é inválido.");
    }

    [Fact(DisplayName = "Obter profissinais qtde maior que 20")]
    public async void ObterProfissionaisComQtdeMaior20()
    {
        await this.ObterRepository();
        var mockLogger = new Mock<ILogger<ListarProfissionaisQueryHandler>>();

        var profissionalProfile = new ProfissionalMapping();
        var profile = new MapperConfiguration(x => x.AddProfile(profissionalProfile));
        IMapper mapper = new Mapper(profile);
        var request = new ListarProfissionaisQueryRequest(1, 21);
        var handler = new ListarProfissionaisQueryHandler(this.Repository, mapper, mockLogger.Object);

        Func<Task> act = async () => await handler.Handle(request, new CancellationToken());

        await act.Should()
            .ThrowAsync<ValidateException>()
            .WithMessage($"Quantidade de itens da busca não pode ser superior a 20 - Qtde informada {request.Qtde}.");
    }

    [Fact(DisplayName = "Obter profissionais com qtde negativa")]
    public async void ObterProfissionaisComQtdeNegativa()
    {
        await this.ObterRepository();
        var mockLogger = new Mock<ILogger<ListarProfissionaisQueryHandler>>();

        var profissionalProfile = new ProfissionalMapping();
        var profile = new MapperConfiguration(x => x.AddProfile(profissionalProfile));
        IMapper mapper = new Mapper(profile);
        var request = new ListarProfissionaisQueryRequest(1, -1);
        var handler = new ListarProfissionaisQueryHandler(this.Repository, mapper, mockLogger.Object);

        Func<Task> func = async () => await handler.Handle(request, new CancellationToken());

        await func.Should()
            .ThrowAsync<ValidateException>()
            .WithMessage($"Quantidade de itens da busca não pode ser negativo {request.Qtde}.");
    }

    [Fact(DisplayName = "Obter profissional com especialidade inexistente")]
    public async void ObterProfissionaisComEspecialidadeInexistente()
    {
        await this.ObterRepository();
        var mockLogger = new Mock<ILogger<ListarProfissionaisQueryHandler>>();

        var profissionalProfile = new ProfissionalMapping();
        var profile = new MapperConfiguration(x => x.AddProfile(profissionalProfile));
        IMapper mapper = new Mapper(profile);
        var request = new ListarProfissionaisQueryRequest(1, 20, 10000);
        var handler = new ListarProfissionaisQueryHandler(this.Repository, mapper, mockLogger.Object);

        Func<Task> func = async () => await handler.Handle(request, new CancellationToken());

        await func.Should()
            .ThrowAsync<ValidateException>()
            .Where(
                ex => ex.Message == $"Especialidade Id {request.EspecialidadeId} não localizada." 
                && ex.StatusCode == HttpStatusCode.NotFound);
    }

    [Fact]
    public async void ObterProfissionaisSemQtde()
    {
        await this.ObterRepository();
        var mockLogger = new Mock<ILogger<ListarProfissionaisQueryHandler>>();

        var profissionalProfile = new ProfissionalMapping();
        var profile = new MapperConfiguration(x => x.AddProfile(profissionalProfile));
        IMapper mapper = new Mapper(profile);
        var request = new ListarProfissionaisQueryRequest(1);
        var handler = new ListarProfissionaisQueryHandler(this.Repository, mapper, mockLogger.Object);
        var response = await handler.Handle(request, new CancellationToken());
        Assert.IsType<ResponseListModel<ProfissionalDetalhesDTO>>(response);
    }

    [Fact]
    public async void ObterProfissionaisComQtde()
    {
        await this.ObterRepository();
        var mockLogger = new Mock<ILogger<ListarProfissionaisQueryHandler>>();

        var profissionalProfile = new ProfissionalMapping();
        var profile = new MapperConfiguration(x => x.AddProfile(profissionalProfile));
        IMapper mapper = new Mapper(profile);
        var request = new ListarProfissionaisQueryRequest(1, 20);
        var handler = new ListarProfissionaisQueryHandler(this.Repository, mapper, mockLogger.Object);
        var response = await handler.Handle(request, new CancellationToken());
        Assert.IsType<ResponseListModel<ProfissionalDetalhesDTO>>(response);
    }

    [Fact]
    public async void ObterProfissionaisComQtdeEEspecialidadeId()
    {
        await this.ObterRepository();
        var mockLogger = new Mock<ILogger<ListarProfissionaisQueryHandler>>();

        var profissionalProfile = new ProfissionalMapping();
        var profile = new MapperConfiguration(x => x.AddProfile(profissionalProfile));
        IMapper mapper = new Mapper(profile);
        var request = new ListarProfissionaisQueryRequest(1, 20, 1);
        var handler = new ListarProfissionaisQueryHandler(this.Repository, mapper, mockLogger.Object);
        var response = await handler.Handle(request, new CancellationToken());
        Assert.IsType<ResponseListModel<ProfissionalDetalhesDTO>>(response);
    }
}
