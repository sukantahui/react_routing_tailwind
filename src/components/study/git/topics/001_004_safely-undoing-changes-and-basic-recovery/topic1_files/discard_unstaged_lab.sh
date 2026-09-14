#!/usr/bin/env bash
# ==============================================================================
# Terminal Lab: Discarding Unstaged Changes with git restore
# Module: 001_004_safely-undoing-changes-and-basic-recovery (Topic 1)
# Educator: Sukanta Hui (Coder & AccoTax, Barrackpore)
# ==============================================================================

set -e

echo "=== Initializing Lab Sandbox ==="
LAB_DIR="/tmp/git-restore-lab"
rm -rf "$LAB_DIR"
mkdir -p "$LAB_DIR"
cd "$LAB_DIR"

git init
git config user.name "Sukanta Hui"
git config user.email "sukanta@codernaccotax.co.in"

echo "export const API_BASE = 'https://api.coderaccotax.co.in';" > api.js
echo "body { font-family: sans-serif; }" > style.css
git add api.js style.css
git commit -m "feat: initial API and styling setup"

echo ""
echo "=== Step 1: Modifying a tracked file with bad edits ==="
echo "export const API_BASE = 'BROKEN_SERVER_URL';" > api.js
echo "Status before restore:"
git status -s

echo ""
echo "=== Step 2: Restoring the file cleanly ==="
git restore api.js
echo "Status after git restore api.js (working tree is clean):"
git status -s
cat api.js

echo ""
echo "=== Step 3: Restoring a deleted file ==="
rm style.css
echo "Status after file deletion:"
git status -s
git restore style.css
echo "Status after git restore style.css (file recreated):"
git status -s
ls -la style.css

echo ""
echo "=== Step 4: Restoring from a historical commit source ==="
echo "export const API_BASE = 'https://v2.coderaccotax.co.in';" > api.js
git commit -am "feat: update API to v2"
echo "export const API_BASE = 'https://v3.experimental.org';" > api.js
git commit -am "feat: update API to v3"

echo "Current API:"
cat api.js
echo "Restoring api.js to initial v1 state (HEAD~2):"
git restore --source=HEAD~2 api.js
cat api.js

echo ""
echo "=== Lab 1 Completed Successfully ==="
