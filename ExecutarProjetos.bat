@echo off
:: Verificar se o script está sendo executado com permissões de administrador
NET SESSION >nul 2>nul
if %ERRORLEVEL% neq 0 (
    echo O script precisa de permissões de administrador. Executando novamente como administrador...
    powershell -Command "Start-Process cmd -ArgumentList '/c %~s0' -Verb RunAs"
    exit /b
)

:: Obter o diretório onde o arquivo .bat está localizado
set script_dir=%~dp0

:: Manter o PATH original
setlocal enabledelayedexpansion
set PATH=%PATH%

:: Voltar para o diretório do script após a elevação
cd /d "%script_dir%"

:: Caminho do diretório do projeto .NET
cd /d "./backend/"
echo Iniciando build do projeto .NET...
dotnet publish -c Release -o ./release_api
if %ERRORLEVEL% neq 0 (
    echo Erro ao executar o build do projeto .NET.
    pause
    exit /b %ERRORLEVEL%
)
cd ".."
:: Caminho do diretório do projeto Node.js
if not exist "./clients/gestao.profissionais.webapp/dist" mkdir "./clients/gestao.profissionais.webapp/dist"
cd "./clients/gestao.profissionais.webapp"
echo Instalando dependencias da Aplicacao React...
call npm install 
call npm run build
if %ERRORLEVEL% neq 0 (
    echo Erro ao instalar dependências do Node.js.
    pause
    exit /b %ERRORLEVEL%
)
echo Fim instalacao React.

cd ".."

echo Movendo o diretório dist para a pasta de destino...
if not exist "./server.webapp/dist" mkdir "./server.webapp/dist"
xcopy /e /i /y "./gestao.profissionais.webapp/dist" "./server.webapp/dist"
if %ERRORLEVEL% neq 0 (
    echo Erro ao mover o diretório dist.
    pause
    exit /b %ERRORLEVEL%
)

cd ".."
set dir_webapp=./clients/server.webapp
echo Instalar dependencias do node para express executar servidor para React
start cmd /k "cd /d %dir_webapp% && npm install && npm run start"

set dir_webapi=./backend/release_api
set nome_exe_webapi=Gestao.Profissionais.API.exe
echo Executar WebAPI
start cmd /k "cd /d %dir_webapi% && dotnet %nome_exe_webapi%"

echo Conclusão dos builds com sucesso!
pause
endlocal
