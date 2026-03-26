@echo off
TITLE Nexus AI Platform
echo Iniciando o Nexus (Command Center)...
echo.

:: Configurando caminhos do Node.js (Igual ao Katuta)
SET "PATH=%PATH%;C:\Program Files\nodejs;C:\Users\isaac\AppData\Roaming\npm"

echo Verificando Node...
node -v
if %ERRORLEVEL% NEQ 0 (
    echo ERRO: Node.js nao encontrado!
    echo Verifique se o Node esta instalado.
    pause
    exit
)

:: Indo para a pasta do projeto
cd /d "%~dp0nexus"

echo.
echo Verificando dependencias...
if not exist node_modules (
    echo Instalando dependencias (pode demorar um pouco)...
    call npm install
)

echo.
echo Iniciando servidor de desenvolvimento...
echo Acesse no navegador: http://localhost:5173
echo.
call npm run dev

:: Se o servidor cair, o pause segura a janela
pause
