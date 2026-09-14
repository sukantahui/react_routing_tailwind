#!/usr/bin/env bash
# ==============================================================================
# LAB SCRIPT: Topic 4 - Staging Changes: git add variations & deletions
# Module: 001_002_git-three-tree-architecture-and-basic-workflow
# Educator: Sukanta Hui (Coder & AccoTax, Barrackpore)
# ==============================================================================

set -e
LAB_DIR="/tmp/git_add_variations_lab_$(date +%s)"
mkdir -p "$LAB_DIR"
cd "$LAB_DIR"

echo "🧪 [STEP 1] Initializing lab repository..."
git init -b main
git config user.name "Sukanta Hui Student"
git config user.email "student@coderaccotax.com"

echo "🧪 [STEP 2] Creating folder structure..."
mkdir -p src/backend src/frontend
echo "const server = 8080;" > src/backend/server.js
echo "const ui = true;" > src/frontend/app.js
echo "old obsolete helper" > src/backend/old_helper.js

git add .
git commit -m "feat: initial multi-tier layout"

echo "🧪 [STEP 3] Generating complex changes across folders..."
# 1. Modify tracked file in frontend
echo "const ui = 'React 19';" > src/frontend/app.js

# 2. Add untracked file in backend
echo "const auth = true;" > src/backend/auth.js

# 3. Delete tracked file in backend on disk
rm src/backend/old_helper.js

# 4. Add root file
echo "PORT=3000" > .env.example

echo "========================================================"
echo "📊 STATUS BEFORE STAGING:"
echo "========================================================"
git status -s

echo ""
echo "🧪 [STEP 4] Testing 'git add -u' (Tracked updates ONLY - notice untracked files are skipped):"
git add -u
git status -s

echo ""
echo "🧪 [STEP 5] Testing 'git add src/backend/' (Scoped staging):"
git add src/backend/
git status -s

echo ""
echo "🧪 [STEP 6] Inspecting low-level .git/index stage entries:"
git ls-files --stage

echo ""
echo "✅ Lab execution complete. Clean up: rm -rf $LAB_DIR"
