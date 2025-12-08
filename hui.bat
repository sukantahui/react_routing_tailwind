@echo off
echo Starting Tailwind CLI watcher...
start "TAILWIND" cmd /k "npx @tailwindcss/cli -i ./src/input.css -o ./src/output.css --watch"

echo Starting Vite/React dev server...
start "VITE DEV" cmd /k "npm run dev"

echo Opening VS Code...
start "VS CODE" cmd /k "code ."

echo Waiting 3 seconds for Vite to boot...
timeout /t 3 >nul

echo Opening browser at http://localhost:5173 ...
start "" http://localhost:5173

echo All processes started in separate terminals.

