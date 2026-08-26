@echo off
chcp 65001 >nul
setlocal enabledelayedexpansion
title Git Auto Sync

:: Navigate to script directory
cd /d "%~dp0"

echo ===============================================================
echo 🚀 GIT AUTO SYNC - COMMIT, PULL ^& PUSH
echo ===============================================================

:: 1. Verify Git Repository
git rev-parse --is-inside-work-tree >nul 2>&1
if !ERRORLEVEL! neq 0 (
    echo ❌ ERROR: This directory is not a Git repository!
    ping 127.0.0.1 -n 5 >nul
    exit /b 1
)

:: 2. Identify Current Branch
for /f "tokens=*" %%b in ('git branch --show-current 2^>nul') do set "CURRENT_BRANCH=%%b"
if "!CURRENT_BRANCH!"=="" set "CURRENT_BRANCH=main"
echo 📌 Target Branch: !CURRENT_BRANCH!

:: 3. Process Commit Message
set "COMMIT_MSG=%*"

:: If no message provided via command line arguments, prompt interactively
if "!COMMIT_MSG!"=="" (
    echo.
    set /p "COMMIT_MSG=📝 Enter commit message (Press Enter for auto-timestamp): "
)

:: If still blank, generate timestamped message
if "!COMMIT_MSG!"=="" (
    for /f "tokens=*" %%t in ('powershell -NoProfile -Command "Get-Date -Format 'yyyy-MM-dd HH:mm:ss'" 2^>nul') do set "TIMESTAMP=%%t"
    if defined TIMESTAMP (
        set "COMMIT_MSG=Auto sync on !TIMESTAMP!"
    ) else (
        set "COMMIT_MSG=Auto sync on %date% %time%"
    )
)

:: Remove accidental surrounding quotes
set "COMMIT_MSG=!COMMIT_MSG:"=!"

echo.
echo ===============================================================
echo 📦 1/4 Staging changes (git add .)...
echo ===============================================================
git add .
if !ERRORLEVEL! neq 0 (
    echo ❌ Failed to stage changes.
    ping 127.0.0.1 -n 5 >nul
    exit /b !ERRORLEVEL!
)

:: 4. Check if there are changes to commit
git diff --cached --quiet
if !ERRORLEVEL! equ 0 (
    echo ℹ️ No new changes detected to commit.
) else (
    echo.
    echo ===============================================================
    echo 📝 2/4 Committing: "!COMMIT_MSG!"...
    echo ===============================================================
    git commit -m "!COMMIT_MSG!"
    if !ERRORLEVEL! neq 0 (
        echo ❌ Commit failed.
        ping 127.0.0.1 -n 5 >nul
        exit /b !ERRORLEVEL!
    )
)

echo.
echo ===============================================================
echo ⬇️ 3/4 Pulling latest changes (git pull --rebase)...
echo ===============================================================
git pull --rebase origin !CURRENT_BRANCH!
if !ERRORLEVEL! neq 0 (
    echo ⚠️ Rebase pull had conflict or failed. Trying standard pull...
    git rebase --abort >nul 2>&1
    git pull origin !CURRENT_BRANCH!
    if !ERRORLEVEL! neq 0 (
        echo ❌ Failed to pull changes from remote. Please resolve conflicts.
        ping 127.0.0.1 -n 5 >nul
        exit /b !ERRORLEVEL!
    )
)

echo.
echo ===============================================================
echo ⬆️ 4/4 Pushing to remote (git push origin !CURRENT_BRANCH!)...
echo ===============================================================
git push origin !CURRENT_BRANCH!
if !ERRORLEVEL! neq 0 (
    echo ❌ Push failed! Please check your network connection or credentials.
    ping 127.0.0.1 -n 5 >nul
    exit /b !ERRORLEVEL!
)

echo.
echo ===============================================================
echo ✅ SUCCESS: Repository synced and pushed to '!CURRENT_BRANCH!'!
echo ===============================================================
ping 127.0.0.1 -n 3 >nul
exit /b 0
