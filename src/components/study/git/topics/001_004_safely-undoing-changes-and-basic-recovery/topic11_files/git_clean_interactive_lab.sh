#!/usr/bin/env bash
# ==============================================================================
# Topic 11 Terminal Lab: Interactive Clean Walkthrough & Menu Commands
# Educator: Sukanta Hui (Coder & AccoTax, Barrackpore)
# ==============================================================================

set -e

SANDBOX_DIR="/tmp/git_clean_interactive_lab_$$"
mkdir -p "$SANDBOX_DIR"
cd "$SANDBOX_DIR"

echo "==> Initializing test repository..."
git init -b main
git config user.name "Interactive Cleaner"
git config user.email "cleaner@barrackpore-devs.in"

echo "app source" > app.js
git add app.js && git commit -m "feat: initial commit"

echo "==> Generating candidate untracked files..."
echo "junk 1" > temp_dump.log
echo "junk 2" > debug.txt
echo "valuable notes" > important_notes.txt
mkdir -p scratch_dir
echo "scratch file" > scratch_dir/scratch.txt

echo "==> Candidates created:"
git status --short

echo "==> DEMO: Automated pipe into interactive clean (Selecting command 5: quit)..."
printf "5\n" | git clean -id

echo "==> Verified: all files survived because we selected quit!"
ls -la

echo "==> DEMO: Filtering by pattern in clean..."
# Filter out important_notes.txt, then clean
printf "2\n!important_notes.txt\n1\n" | git clean -id || true

rm -rf "$SANDBOX_DIR"
echo "✔ Interactive clean lab completed successfully!"
