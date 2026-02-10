@echo off
cd /d "%~dp0"
setlocal enabledelayedexpansion

:: Carregar variaveis do .env (simples)
if exist .env (
    for /f "usebackq tokens=1* delims==" %%A in (".env") do (
        if not "%%A"=="" set "%%A=%%B"
    )
)

"C:\Users\isaac\OneDrive\Desktop\arquivos antigravity\node-v24.13.0-win-x64\node-v24.13.0-win-x64\node.exe" "dist\mcp\index.js"