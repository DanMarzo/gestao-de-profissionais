using Gestao.Profissionais.API.Application;
using Gestao.Profissionais.API.Infra;
using Gestao.Profissionais.API.Infra.Database;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddInfraServices(builder.Configuration);
builder.Services.AddApplicationServices();
builder.Services.AddCors(options =>
{
    options.AddPolicy("CorsPolicy", buider => buider
        .WithOrigins("http://localhost:5124")
        .AllowAnyMethod()
        .AllowAnyHeader());
});
var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

await app.ApplyDatabaseConfig();
app.UseAuthorization();

app.MapControllers();
app.UseCors("CorsPolicy");
app.Run();
