
echo Movendo o diretório dist para a pasta de destino...
if not exist "./clients/server.webapp/dist" mkdir "./clients/server.webapp/dist"
xcopy /e /i /y "./clients/gestao.profissionais.webapp/dist" "./clients/server.webapp/dist"
if %ERRORLEVEL% neq 0 (
    echo Erro ao mover o diretório dist.
    pause
    exit /b %ERRORLEVEL%
)
set dir_webapp=./clients/server.webapp
set dir_webapi=./backend/release_api
set nome_dll_webapi=Gestao.Profissionais.API.dll
:: Abrir Yarn Dev para o projeto 1
echo Nova execucao de Build em caso da primeira so executar a instalacao dos pacotes
start cmd /k "cd /d %dir_webapp% npm run build && npm run preview"

:: Abrir Dotnet Run para o projeto Dotnet
start cmd /k "cd /d %dir_webapi% && dotnet %nome_dll_webapi%"

:: Mensagem para o usuário
echo Comandos foram iniciados em janelas separadas.
pause

echo Executando
pause
