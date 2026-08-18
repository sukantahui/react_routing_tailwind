@echo off

if "%~1"=="" (
    echo Usage: cnat ^<number^>
    echo Example: cnat 17
    exit /b 1
)

set "NUM=%~1"

echo Creating Topic%NUM%.jsx...
echo Creating topic%NUM%_files folder...
echo Creating topic%NUM%_questions.js...

type nul > "Topic%NUM%.jsx"
mkdir "topic%NUM%_files" 2>nul
type nul > "topic%NUM%_files\topic%NUM%_questions.js"

echo.
echo Created successfully:
echo.
echo Topic%NUM%.jsx
echo topic%NUM%_files\
echo     topic%NUM%_questions.js