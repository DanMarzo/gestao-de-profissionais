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
A aplicação React será executada na porta 5124

# Execução por SCRIPT (Windows)
Em caso da execução ser realizada no Windows, está disponivel um script para compilação e execução dos projetos, no caso do aplicativo em React, o mesmo utiliza de um servidor em Express(Nodejs)
- Nome do executavel
> ExecutarProjetos.bat