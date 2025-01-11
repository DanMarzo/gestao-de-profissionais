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

    [Fact]
    public async void ObterProfissionaisComIndiceNegativo()
    {
        await this.ObterRepository();
        var mockLogger = new Mock<ILogger<ListarProfissionaisQueryHandler>>();

        var profissionalProfile = new ProfissionalMapping();
        var profile = new MapperConfiguration(x => x.AddProfile(profissionalProfile));
        IMapper mapper = new Mapper(profile);
        var request = new ListarProfissionaisQueryRequest(-1);
        var handler = new ListarProfissionaisQueryHandler(this.Repository, mapper, mockLogger.Object);

        await Assert.ThrowsAsync<ValidateException>(async () =>
        {
            await handler.Handle(request, new CancellationToken());
        });
    }
    [Fact]
    public async void ObterProfissionaisComQtdeMaior20()
    {
        await this.ObterRepository();
        var mockLogger = new Mock<ILogger<ListarProfissionaisQueryHandler>>();

        var profissionalProfile = new ProfissionalMapping();
        var profile = new MapperConfiguration(x => x.AddProfile(profissionalProfile));
        IMapper mapper = new Mapper(profile);
        var request = new ListarProfissionaisQueryRequest(1, 21);
        var handler = new ListarProfissionaisQueryHandler(this.Repository, mapper, mockLogger.Object);

        await Assert.ThrowsAsync<ValidateException>(async () =>
        {
            await handler.Handle(request, new CancellationToken());
        });
    }
    
    [Fact]
    public async void ObterProfissionaisComQtdeNegativa()
    {
        await this.ObterRepository();
        var mockLogger = new Mock<ILogger<ListarProfissionaisQueryHandler>>();

        var profissionalProfile = new ProfissionalMapping();
        var profile = new MapperConfiguration(x => x.AddProfile(profissionalProfile));
        IMapper mapper = new Mapper(profile);
        var request = new ListarProfissionaisQueryRequest(1, -1);
        var handler = new ListarProfissionaisQueryHandler(this.Repository, mapper, mockLogger.Object);

        await Assert.ThrowsAsync<ValidateException>(async () =>
        {
            await handler.Handle(request, new CancellationToken());
        });
    }

    [Fact]
    public async void ObterProfissionaisComEspecialidadeInexistente()
    {
        await this.ObterRepository();
        var mockLogger = new Mock<ILogger<ListarProfissionaisQueryHandler>>();

        var profissionalProfile = new ProfissionalMapping();
        var profile = new MapperConfiguration(x => x.AddProfile(profissionalProfile));
        IMapper mapper = new Mapper(profile);
        var request = new ListarProfissionaisQueryRequest(1, 20, 10000);
        var handler = new ListarProfissionaisQueryHandler(this.Repository, mapper, mockLogger.Object);
        await Assert.ThrowsAsync<ValidateException>(async () =>
        {
            await handler.Handle(request, new CancellationToken());
        });
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
