#!/usr/bin/env bash
# ==============================================================================
# Topic 10 Terminal Lab: Safe Pruning of Untracked Files with git clean
# Educator: Sukanta Hui (Coder & AccoTax, Barrackpore)
# ==============================================================================

set -e

SANDBOX_DIR="/tmp/git_clean_lab_$$"
mkdir -p "$SANDBOX_DIR"
cd "$SANDBOX_DIR"

echo "==> Initializing repository..."
git init -b main
git config user.name "Cleanliness Inspector"
git config user.email "inspector@barrackpore-devs.in"

echo "node_modules/" > .gitignore
echo "dist/" >> .gitignore
echo "export const app = 'clean';" > index.js
git add .gitignore index.js
git commit -m "feat: initial setup with gitignore"

echo "==> Creating untracked files and ignored build directories..."
echo "scratch notes" > scratch.txt
echo "another temp" > temp.log
mkdir -p dist build_artifacts
echo "bundle.js" > dist/bundle.js
echo "artifact.bin" > build_artifacts/artifact.bin

echo "==> Current status before clean:"
git status --short --ignored

echo "==> STEP 1: Dry run (git clean -nd)..."
git clean -nd

echo "==> STEP 2: Force clean untracked files & folders (git clean -fd)..."
git clean -fd
echo "Checking remaining files (dist/ should still exist because it is ignored in .gitignore):"
ls -la

echo "==> STEP 3: Nuke ignored directories as well (git clean -fdx)..."
git clean -fdx
echo "Checking final status (should be 100% clean):"
git status

rm -rf "$SANDBOX_DIR"
echo "✔ git clean lab completed successfully!"
