# Projeto Gestão de profissionais - Teste técnico

## WEB API Gestao.Profissionais.API

#### Depêndencias (Release)
- [.NET 8.0 Runtime (v8.0.11) - Windows x64](https://dotnet.microsoft.com/pt-br/download/dotnet/thank-you/runtime-8.0.11-windows-x64-installer?cid=getdotnetcore)
- [ASP.NET Core 8.0 Runtime (v8.0.11) - Windows x64](https://dotnet.microsoft.com/pt-br/download/dotnet/thank-you/runtime-aspnetcore-8.0.11-windows-x64-installer?cid=getdotnetcore)

#### Depêndencias (Desenvolvimento)
- [.NET 8 SDK](https://dotnet.microsoft.com/en-us/download/dotnet/thank-you/sdk-8.0.404-windows-x64-installer)

#### Observações
- A WebAPI será executada na porta 5123.
- Certifique-se de não excluir nenhum JSON da compilação, pois através dele que é incluido as especialidades descritas no teste.

#### Depêndencias externas
- Banco de dados SQL Server

## WEB APP Gestão de Profissionais

#### Depêndencias
- [Node v20.11.x](https://nodejs.org/dist/v22.11.0/node-v22.11.0-x64.msi)

## Execução
> docker compose up --build -d 

#### Portas utilizadas
- Web App 8081
- Web API 8080
- Banco de dados SQLServer 1433