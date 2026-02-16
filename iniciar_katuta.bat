@echo off
TITLE n8n Katuta's Pizzaria
echo Iniciando o Motor da Katuta's... 
SET "PATH=%PATH%;C:\Program Files\nodejs;C:\Users\isaac\AppData\Roaming\npm"
echo Verificando Node...
node -v
if %ERRORLEVEL% NEQ 0 (
    echo ERRO: Node.js nao encontrado em C:\Program Files\nodejs
    pause
    exit
)
echo Ativando permissoes de rede (MODO TOTAL)...
SET N8N_CORS_ALLOWED_ORIGINS=*
SET N8N_LISTEN_ADDRESS=0.0.0.0
SET N8N_PROTOCOL=http

echo Abrindo Tunel Publico (ngrok - dominio fixo)...
start "ngrok Katuta" cmd /c "cd /d %~dp0 && ngrok.exe http 5678 --domain=disaffectedly-vibrative-rafael.ngrok-free.dev"
timeout /t 3 /nobreak >nul

echo Iniciando n8n...
call n8n
pause
