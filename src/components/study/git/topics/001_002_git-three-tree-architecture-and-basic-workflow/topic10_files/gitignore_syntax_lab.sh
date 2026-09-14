#!/usr/bin/env bash
# ==============================================================================
# LAB SCRIPT: Topic 10 - Ignoring Files with .gitignore (Syntax & Rules)
# Module: 001_002_git-three-tree-architecture-and-basic-workflow
# Educator: Sukanta Hui (Coder & AccoTax, Barrackpore)
# ==============================================================================

set -e
LAB_DIR="/tmp/gitignore_syntax_lab_$(date +%s)"
mkdir -p "$LAB_DIR"
cd "$LAB_DIR"

echo "🧪 [STEP 1] Initializing lab repository..."
git init -b main
git config user.name "Sukanta Hui Student"
git config user.email "student@coderaccotax.com"

echo "🧪 [STEP 2] Creating .gitignore with diverse syntax rules..."
cat << 'EOF' > .gitignore
# Logs & Environment
*.log
.env
.env.*
!.env.example

# Build Outputs & Directories
dist/
build/
coverage/

# Nested glob patterns
**/temp/
docs/**/*.draft.md

# Negation test
logs/*
!logs/audit.log
EOF

git add .gitignore
git commit -m "chore: configure comprehensive .gitignore rules"

echo "🧪 [STEP 3] Creating mock files matching and not matching rules..."
mkdir -p dist logs docs/architecture temp src/temp
touch app.log error.log
touch .env .env.local .env.example
touch dist/bundle.js
touch logs/debug.log logs/audit.log
touch docs/architecture/api.draft.md docs/architecture/api.final.md
touch temp/data.json src/temp/cache.json
touch src/index.js

echo "========================================================"
echo "📊 STATUS WITH IGNORED FILES HIDDEN (git status -s):"
echo "========================================================"
git status -s

echo ""
echo "========================================================"
echo "🔍 REVEALING IGNORED FILES (git status -s --ignored):"
echo "========================================================"
git status -s --ignored

echo ""
echo "========================================================"
echo "🧪 [STEP 4] Testing git check-ignore on specific files:"
echo "========================================================"
git check-ignore -v app.log
git check-ignore -v .env.local
git check-ignore -v dist/bundle.js
git check-ignore -v logs/debug.log

echo ""
echo "✅ Lab execution complete. Clean up: rm -rf $LAB_DIR"
