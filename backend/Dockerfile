# Gerar build
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS builder

WORKDIR /gestao.profissional/project

COPY . .

RUN dotnet restore

RUN dotnet publish -o ./release

# Criar imagem

FROM mcr.microsoft.com/dotnet/aspnet:8.0

WORKDIR /gestao.profissional/api
COPY --from=builder ./gestao.profissional/project/release ./
ENTRYPOINT [ "dotnet", "Gestao.Profissionais.API.dll" ]

#run image: docker build . --tag gestao.profissional.api
#run container:
    #docker run --rm -d -p 8000:5123 -e ASPNETCORE_HTTP_PORTS=5123 gestao.profissional.api

#run container: 
#docker run --rm -d -p 8000:5123 --name gestao.profissional.api gestao.profissional.api