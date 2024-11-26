@echo off
:: Caminho do diretório do projeto .NET
cd /d "./backend/"
echo Iniciando build do projeto .NET...
dotnet publish -c Release -o ./release_api
if %ERRORLEVEL% neq 0 (
    echo Erro ao executar o build do projeto .NET.
    pause
    exit /b %ERRORLEVEL%
)

:: Caminho do diretório do projeto Node.js
if not exist "./clients/gestao.profissionais.webapp/dist" mkdir "./clients/gestao.profissionais.webapp/dist"
cd "../clients/gestao.profissionais.webapp"
echo Instalando dependências do Node.js...
npm install && npm run build
if %ERRORLEVEL% neq 0 (
    echo Erro ao instalar dependências do Node.js.
    pause
    exit /b %ERRORLEVEL%
)
echo Conclusão dos builds com sucesso!
pause
