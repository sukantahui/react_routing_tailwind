@echo off
echo Starting development environment...

REM Start Tailwind and Vite servers
start "TAILWIND" cmd /c "npx @tailwindcss/cli -i ./src/input.css -o ./src/output.css --watch"
start "VITE DEV" cmd /c "npm run dev"

REM Wait for Vite to boot and open localhost
timeout /t 3 >nul
start http://localhost:5173

echo All development services initialized successfully.

start "" "C:\Program Files\Firefox Developer Edition\firefox.exe"  -no-remote   -P "CNAT-Developer"   --devtools   -new-window ^
  "https://titus.protondns.net:2083/cpsess6220590010/frontend/jupiter/terminal/index.html"