namespace Gestao.Profissionais.Tests.Features.ProfissionalFeature;

public class RegistrarProfissionalTest
{
    private IRepository Repository { get; set; }
    private async Task ObterRepository()
    {
        var dbContextOptions = new DbContextOptionsBuilder<ApplicationDataContext>()
          .UseInMemoryDatabase(databaseName: "ProfissionalDb") // Use um banco de dados em memória
          .Options;
        var context = new ApplicationDataContext(dbContextOptions);
        this.Repository ??= new Repository(context);
        var contagemEntidades = await this.Repository.CountAsync<EspecialidadeEntity>(x => x.Id == 1);
        if (contagemEntidades == 0)
            await this.Repository.AddAsync(new EspecialidadeEntity { Id = 1, Nome = "Pediatra", TipoDocumento = TipoDocEspecialidadeEnum.CRM });
    }

    [Fact]
    public async void RegistrarProfissionalComEspecialidadeInvalida()
    {
        await ObterRepository();
        var mockLogger = new Mock<ILogger<RegistrarProfissionalHandler>>();
        var request = new RegistrarProfissionalRequest()
        {
            EspecialidadeId = 0,
            Nome = "Profissional Teste",
            NumeroDocumento = "12345678909"
        };
        var handler = new RegistrarProfissionalHandler(this.Repository, mockLogger.Object);

        await Assert.ThrowsAsync<ValidateException>(async () =>
        {
            await handler.Handle(request, new CancellationToken());
        });
    }

    [Fact]
    public async void RegistrarProfissionalComEspecialidadeNaoExistente()
    {
        await ObterRepository();
        var mockLogger = new Mock<ILogger<RegistrarProfissionalHandler>>();
        var request = new RegistrarProfissionalRequest()
        {
            EspecialidadeId = 1000,
            Nome = "Profissional Teste",
            NumeroDocumento = "12345678909"
        };
        var handler = new RegistrarProfissionalHandler(this.Repository, mockLogger.Object);

        await Assert.ThrowsAsync<ValidateException>(async () =>
        {
            await handler.Handle(request, new CancellationToken());
        });
    }

    [Fact]
    public async void RegistrarProfissionalComSucesso()
    {
        await ObterRepository();
        var mockLogger = new Mock<ILogger<RegistrarProfissionalHandler>>();
        var request = new RegistrarProfissionalRequest()
        {
            EspecialidadeId = 1,
            Nome = "Profissional Teste",
            NumeroDocumento = "12345678909"
        };
        var handler = new RegistrarProfissionalHandler(this.Repository, mockLogger.Object);
        var response = await handler.Handle(request, new CancellationToken());
        Assert.IsType<ResponseCreateAPIDTO<long>>(response);
    }
}