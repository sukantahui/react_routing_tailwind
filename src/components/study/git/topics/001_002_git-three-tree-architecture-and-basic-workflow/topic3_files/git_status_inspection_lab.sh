#!/usr/bin/env bash
# ==============================================================================
# LAB SCRIPT: Topic 3 - Inspecting Working Tree Status & Short Format Matrix
# Module: 001_002_git-three-tree-architecture-and-basic-workflow
# Educator: Sukanta Hui (Coder & AccoTax, Barrackpore)
# ==============================================================================

set -e
LAB_DIR="/tmp/git_status_lab_$(date +%s)"
mkdir -p "$LAB_DIR"
cd "$LAB_DIR"

echo "🧪 [STEP 1] Initializing lab repository..."
git init -b main
git config user.name "Sukanta Hui Student"
git config user.email "student@coderaccotax.com"

echo "🧪 [STEP 2] Creating initial tracked files..."
echo "<h1>Barrackpore Student Portal</h1>" > index.html
echo "console.log('App init');" > app.js
echo "body { font-family: sans-serif; }" > style.css

echo "🧪 [STEP 3] First Commit..."
git add .
git commit -m "feat: initial commit with base web structure"

echo "🧪 [STEP 4] Generating distinct state matrix..."
# 1. Staged modification (M )
echo "console.log('App init v2');" > app.js
git add app.js

# 2. Unstaged modification ( M)
echo "<h1>Barrackpore Portal - Updated</h1>" > index.html

# 3. Both Staged and Unstaged (MM)
echo "/* Primary theme */" >> style.css
git add style.css
echo "/* Secondary theme edits */" >> style.css

# 4. Untracked file (??)
echo "SECRET_API_KEY=xyz123" > .env

# 5. Staged new file (A )
echo "module.exports = {};" > config.js
git add config.js

# 6. Unstaged deletion ( D)
echo "temp data" > notes.txt
git add notes.txt
git commit -m "docs: add notes.txt"
rm notes.txt

echo "========================================================"
echo "📊 FULL LONG STATUS (git status):"
echo "========================================================"
git status

echo ""
echo "========================================================"
echo "⚡ SHORT STATUS MATRIX (git status -s):"
echo "========================================================"
git status -s

echo ""
echo "========================================================"
echo "🚀 BRANCH + SHORT STATUS (git status -sb):"
echo "========================================================"
git status -sb

echo ""
echo "✅ Lab execution complete. Clean up: rm -rf $LAB_DIR"
