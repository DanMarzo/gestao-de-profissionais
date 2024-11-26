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
cd /d "../clients/gestao.profissionais.webapp"
echo Iniciando build do projeto Node.js...
npm run build
if %ERRORLEVEL% neq 0 (
    echo Erro ao executar o build do projeto Vite.
    pause
    exit /b %ERRORLEVEL%
)

echo Conclusão dos builds com sucesso!
pause
