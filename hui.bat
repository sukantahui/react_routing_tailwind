@echo off
chcp 65001 >nul
setlocal enabledelayedexpansion
title React + Tailwind Dev Starter
//this is new
:: Navigate to script directory
cd /d "%~dp0"

echo ===============================================================
echo 🚀 STARTING DEV ENVIRONMENT ^& TOOLS
echo ===============================================================

:: 1. Start Tailwind CSS CLI Watcher
echo 🎨 Starting Tailwind CSS CLI watcher...
start "TAILWIND WATCHER" cmd /k "title TAILWIND WATCHER && npx @tailwindcss/cli -i ./src/input.css -o ./src/output.css --watch"

:: 2. Start Vite / React Dev Server
echo ⚡ Starting Vite / React dev server...
start "VITE DEV SERVER" cmd /k "title VITE DEV SERVER && npm run dev"

:: 3. Launch Antigravity IDE
echo 🛸 Launching Antigravity IDE...
if exist "%LOCALAPPDATA%\Programs\Antigravity IDE\Antigravity IDE.exe" (
    start "" "%LOCALAPPDATA%\Programs\Antigravity IDE\Antigravity IDE.exe" "%~dp0"
) else if exist "%LOCALAPPDATA%\Programs\Antigravity IDE\bin\antigravity-ide.cmd" (
    start "" "%LOCALAPPDATA%\Programs\Antigravity IDE\bin\antigravity-ide.cmd" "%~dp0"
) else (
    where antigravity-ide >nul 2>&1 && start "" antigravity-ide "%~dp0" || where agy >nul 2>&1 && start "" agy "%~dp0"
)

:: 4. Launch VS Code
echo 💻 Launching VS Code...
start "" code "%~dp0"

:: 5. Wait for Vite dev server to boot
echo ⏳ Waiting 3 seconds for Vite server...
ping 127.0.0.1 -n 4 >nul

:: 6. Open Localhost in Microsoft Edge
echo 🌐 Opening Localhost in Microsoft Edge...
if exist "C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe" (
    start "" "C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe" "http://localhost:5173"
) else if exist "C:\Program Files\Microsoft\Edge\Application\msedge.exe" (
    start "" "C:\Program Files\Microsoft\Edge\Application\msedge.exe" "http://localhost:5173"
) else (
    start "" "http://localhost:5173"
)

:: 7. Open Tools in Firefox Developer Edition
echo 🦊 Opening Terminal, ChatGPT ^& DeepSeek in Firefox Developer Edition...
if exist "C:\Program Files\Firefox Developer Edition\firefox.exe" (
    start "" "C:\Program Files\Firefox Developer Edition\firefox.exe" "https://titus.protondns.net:2083/cpsess2424099602/frontend/jupiter/terminal/index.html" "https://chatgpt.com/" "https://chat.deepseek.com/"
) else if exist "C:\Program Files (x86)\Firefox Developer Edition\firefox.exe" (
    start "" "C:\Program Files (x86)\Firefox Developer Edition\firefox.exe" "https://titus.protondns.net:2083/cpsess2424099602/frontend/jupiter/terminal/index.html" "https://chatgpt.com/" "https://chat.deepseek.com/"
) else if exist "C:\Program Files\Mozilla Firefox\firefox.exe" (
    start "" "C:\Program Files\Mozilla Firefox\firefox.exe" "https://titus.protondns.net:2083/cpsess2424099602/frontend/jupiter/terminal/index.html" "https://chatgpt.com/" "https://chat.deepseek.com/"
) else (
    start "" "https://titus.protondns.net:2083/cpsess2424099602/frontend/jupiter/terminal/index.html"
    start "" "https://chatgpt.com/"
    start "" "https://chat.deepseek.com/"
)

echo.
echo ✅ Everything launched successfully!
ping 127.0.0.1 -n 3 >nul
exit