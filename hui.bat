@echo off
echo Starting development environment...

REM Start Tailwind and Vite servers
start "TAILWIND" cmd /c "npx @tailwindcss/cli -i ./src/input.css -o ./src/output.css --watch"
start "VITE DEV" cmd /c "npm run dev"

REM Wait for Vite to boot and open localhost
timeout /t 3 >nul
start http://localhost:5173

echo All development services initialized successfully.