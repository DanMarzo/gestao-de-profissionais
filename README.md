# Projeto Gestão de profissionais - Teste técnico

## WEB API Gestao.Profissionais.API

#### Depêndencias (Release)
- [.NET 8.0 Runtime (v8.0.11) - Windows x64](https://dotnet.microsoft.com/pt-br/download/dotnet/thank-you/runtime-8.0.11-windows-x64-installer?cid=getdotnetcore)
- [ASP.NET Core 8.0 Runtime (v8.0.11) - Windows x64](https://dotnet.microsoft.com/pt-br/download/dotnet/thank-you/runtime-aspnetcore-8.0.11-windows-x64-installer?cid=getdotnetcore)

#### Depêndencias (Desenvolvimento)
- [.NET 8 SDK](https://dotnet.microsoft.com/en-us/download/dotnet/thank-you/sdk-8.0.404-windows-x64-installer)

#### Execução
- Publicar
> dotnet publish -c Release -o ./release_api
- Via DLL: Dentro da pasta release_api 
> dotnet Gestao.Profissionais.API.dll
- Via executavél (.exe): Dentro da pasta release_api 
> Gestao.Profissionais.API.exe

#### Observações
- A WebAPI será executada na porta 5123.
- Certifique-se de não excluir nenhum JSON da compilação, pois através dele que é incluido as especialidades descritas no teste.

## WEB APP Gestão de Profissionais

#### Depêndencias
- [Node v20.11.x](https://nodejs.org/dist/v22.11.0/node-v22.11.0-x64.msi)

#### Execução

- Instalar dependências
> npm install

- Execução em modo de desenvolvimento
> npm run dev

- Execução em modo Preview
> npm run build
> npm run preview

#### Observações
A web aplication será executada na porta 5124

# Execução por SCRIPT (Windows)
Em caso do ambiente de execução for Windows, está disponível dois scripts para compilar e executar os projetos.

- 1º Gerar release (1_gerar_release.bat)
Script responsável por gerar a versão de produção da WebAPI, e tambem do aplicativo React.
- 2º Executar projetos (2_executar_projetos.bat)
Script responsável por executar os projetos. Obs: ao utilizar esse script, ele irá executar um servidor em Node com Express para o aplicativo React.
