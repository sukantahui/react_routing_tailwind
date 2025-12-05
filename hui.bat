@echo off
echo Starting Tailwind CLI watcher...
start cmd /k "npx @tailwindcss/cli -i ./src/input.css -o ./src/output.css --watch"

echo Starting Vite/React dev server...
start cmd /k "npm run dev"

start "EXTRA CMD" cmd /k "echo Extra CMD Ready!"

echo All processes started in separate terminals.

