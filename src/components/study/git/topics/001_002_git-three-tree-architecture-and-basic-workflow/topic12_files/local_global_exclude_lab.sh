#!/usr/bin/env bash
# ==============================================================================
# LAB SCRIPT: Topic 12 - Local Exclude & Global Gitignore
# Module: 001_002_git-three-tree-architecture-and-basic-workflow
# Educator: Sukanta Hui (Coder & AccoTax, Barrackpore)
# ==============================================================================

set -e
LAB_DIR="/tmp/local_global_exclude_lab_$(date +%s)"
GLOBAL_IGNORE="/tmp/test_global_gitignore_$(date +%s)"
mkdir -p "$LAB_DIR"
cd "$LAB_DIR"

echo "🧪 [STEP 1] Initializing repository..."
git init -b main
git config user.name "Sukanta Hui Student"
git config user.email "student@coderaccotax.com"

echo "🧪 [STEP 2] Configuring Global core.excludesfile..."
echo ".DS_Store" > "$GLOBAL_IGNORE"
echo "Thumbs.db" >> "$GLOBAL_IGNORE"
echo "*.personal_notes" >> "$GLOBAL_IGNORE"
git config core.excludesfile "$GLOBAL_IGNORE"

echo "🧪 [STEP 3] Configuring Local Repository-Specific Exclude (.git/info/exclude)..."
echo "# Local-only scratch files (never committed)" >> .git/info/exclude
echo "local_scratch.js" >> .git/info/exclude
echo "benchmarks/" >> .git/info/exclude

echo "🧪 [STEP 4] Configuring Shared .gitignore (Tier 1)..."
cat << 'EOF' > .gitignore
node_modules/
dist/
.env
EOF
git add .gitignore
git commit -m "chore: initial shared .gitignore"

echo "🧪 [STEP 5] Generating files across all three tiers..."
mkdir -p dist benchmarks node_modules
touch dist/bundle.js
touch node_modules/pkg.js
touch local_scratch.js benchmarks/speed.txt
touch .DS_Store Thumbs.db project.personal_notes
touch src_app.js

echo "========================================================"
echo "📊 STATUS WITH ALL 3 TIERS ACTIVE (git status -s):"
echo "========================================================"
git status -s

echo ""
echo "========================================================"
echo "🔍 AUDITING SOURCE OF EXCLUSION WITH git check-ignore -v:"
echo "========================================================"
echo "Checking dist/bundle.js (.gitignore Tier 1):"
git check-ignore -v dist/bundle.js || true

echo "Checking local_scratch.js (.git/info/exclude Tier 2):"
git check-ignore -v local_scratch.js || true

echo "Checking project.personal_notes (Global Excludes Tier 3):"
git check-ignore -v project.personal_notes || true

echo ""
echo "✅ Lab execution complete. Clean up: rm -rf $LAB_DIR $GLOBAL_IGNORE"
