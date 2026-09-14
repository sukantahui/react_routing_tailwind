#!/usr/bin/env bash
# ==============================================================================
# Terminal Lab: Unstaging Changes with git restore --staged
# Module: 001_004_safely-undoing-changes-and-basic-recovery (Topic 2)
# Educator: Sukanta Hui (Coder & AccoTax, Barrackpore)
# ==============================================================================

set -e

echo "=== Initializing Unstaging Lab Sandbox ==="
LAB_DIR="/tmp/git-restore-staged-lab"
rm -rf "$LAB_DIR"
mkdir -p "$LAB_DIR"
cd "$LAB_DIR"

git init
git config user.name "Sukanta Hui"
git config user.email "sukanta@codernaccotax.co.in"

echo "const PORT = 3000;" > server.js
git add server.js
git commit -m "feat: initial server setup"

echo ""
echo "=== Step 1: Accidentally staging a secret .env.local file ==="
echo "const PORT = 8080;" > server.js
echo "DB_PASSWORD=SecretBarrackporePass123" > .env.local
git add .
echo "Status after accidental git add . (all staged green):"
git status -s

echo ""
echo "=== Step 2: Unstaging the secret file safely ==="
git restore --staged .env.local
echo "Status after unstaging .env.local:"
git status -s

echo ""
echo "=== Step 3: Protecting .env.local with .gitignore ==="
echo ".env.local" > .gitignore
git add .gitignore
git status -s
git commit -m "feat(config): update port and ignore local secrets"

echo ""
echo "=== Step 4: Unstaging all files in bulk ==="
echo "console.log('debug 1');" >> server.js
echo "console.log('debug 2');" >> .gitignore
git add .
echo "Staged files before bulk restore --staged:"
git status -s
git restore --staged .
echo "Status after bulk git restore --staged . (all files safely unstaged):"
git status -s

echo ""
echo "=== Unstaging Lab Completed Successfully ==="
