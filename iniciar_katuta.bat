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
echo Iniciando n8n (isso pode levar alguns segundos)...
call n8n
pause
