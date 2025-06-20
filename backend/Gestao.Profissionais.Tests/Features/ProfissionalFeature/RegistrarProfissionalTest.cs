namespace Gestao.Profissionais.Tests.Features.ProfissionalFeature;

public class RegistrarProfissionalTest
{
    private IRepository Repository { get; set; }
    private async Task ObterRepository()
    {
        var dbContextOptions = new DbContextOptionsBuilder<ApplicationDataContext>()
          .UseInMemoryDatabase(databaseName: "RegistrarProfissionalTestDb") // Use um banco de dados em mem�ria
          .Options;
        var context = new ApplicationDataContext(dbContextOptions);
        this.Repository ??= new Repository(context);
        var contagemEntidades = await this.Repository.CountAsync<EspecialidadeEntity>(x => x.Id == 1);
        if (contagemEntidades == 0)
        {
            await this.Repository.AddAsync(new EspecialidadeEntity { Id = 1, Nome = "Pediatra", TipoDocumento = TipoDocEspecialidadeEnum.CRM });
            await this.Repository.SaveChangesAsync();
        }
    }

    [Fact(DisplayName = "Registrar Profissional com especialidade inv�lida")]
    public async Task RegistrarProfissionalComEspecialidadeInvalida()
    {
        await ObterRepository();
        var mockLogger = new Mock<ILogger<RegistrarProfissionalCommandHandler>>();
        var request = new RegistrarProfissionalCommandRequest()
        {
            EspecialidadeId = 0,
            Nome = "Profissional Teste",
            NumeroDocumento = "12345678909"
        };
        var handler = new RegistrarProfissionalCommandHandler(this.Repository, mockLogger.Object);

        Func<Task> act = async () => await handler.Handle(request, new CancellationToken());

        await act
            .Should()
            .ThrowAsync<ValidateException>()
            .WithMessage($"Especialidade Id {request.EspecialidadeId} � inv�lido!");
    }

    [Fact(DisplayName = "Registrar profissional com especialidade n�o existente")]
    public async void RegistrarProfissionalComEspecialidadeNaoExistente()
    {
        await ObterRepository();
        var mockLogger = new Mock<ILogger<RegistrarProfissionalCommandHandler>>();
        var request = new RegistrarProfissionalCommandRequest()
        {
            EspecialidadeId = 1000,
            Nome = "Profissional Teste",
            NumeroDocumento = "12345678909"
        };
        var handler = new RegistrarProfissionalCommandHandler(this.Repository, mockLogger.Object);

        Func<Task> act = async () => await handler.Handle(request, new CancellationToken());

        await act
            .Should()
            .ThrowAsync<ValidateException>()
            .WithMessage($"Especialidade Id {request.EspecialidadeId} informada n�o localizada!");
    }

    [Fact(DisplayName = "Registrar profissionais com sucesso")]
    public async void RegistrarProfissionalComSucesso()
    {
        await ObterRepository();
        var mockLogger = new Mock<ILogger<RegistrarProfissionalCommandHandler>>();
        var request = new RegistrarProfissionalCommandRequest()
        {
            EspecialidadeId = 1,
            Nome = "Profissional Teste",
            NumeroDocumento = "12345678909"
        };
        var handler = new RegistrarProfissionalCommandHandler(this.Repository, mockLogger.Object);

        var result = await handler.Handle(request, new CancellationToken());

        result.Should()
            .BeOfType<ResponseCreateAPIModel<long>>();
    }
}