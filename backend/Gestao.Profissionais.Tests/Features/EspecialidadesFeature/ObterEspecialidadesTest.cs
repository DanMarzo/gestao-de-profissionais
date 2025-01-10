using Gestao.Profissionais.Application.Features.EspecialidadeFeatures.Queries.ObterEspecialidades;

namespace Gestao.Profissionais.Tests.Features.EspecialidadesFeature;

public class ObterEspecialidadesTest
{
    private IRepository ObterRepository()
    {
        var dbContextOptions = new DbContextOptionsBuilder<ApplicationDataContext>()
          .UseInMemoryDatabase(databaseName: "EspecialidadesDb") // Use um banco de dados em memória
          .Options;
        var context = new ApplicationDataContext(dbContextOptions);
        IRepository repository = new Repository(context);
        repository.AddAsync(new EspecialidadeEntity { Id = 1, Nome = "Pediatra", TipoDocumento = TipoDocEspecialidadeEnum.CRM }).Wait();
        return repository;
    }
    [Fact]
    public async void EspecialidadeDefault()
    {
        //Simula a tarefa inicial da API onde eh inserido especialidades padrao
        var repository = ObterRepository();
        var mockLogger = new Mock<ILogger<ObterEspecialidadesQueryHandler>>();
        var especialidadeProfile = new EspecialidadesMapping();
        var configuration = new MapperConfiguration(cfg => cfg.AddProfile(especialidadeProfile));
        IMapper mapper = new Mapper(configuration);
        var request = new ObterEspecialidadesQueryRequest();
        var handler = new ObterEspecialidadesQueryHandler(repository, mockLogger.Object, mapper);
        var response = await handler.Handle(request, new CancellationToken());
        Assert.True(response.Any());
    }
}
