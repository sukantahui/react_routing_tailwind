#!/usr/bin/env bash
# ==============================================================================
# LAB SCRIPT: Topic 6 - Creating Commits: CLI vs Multi-line Editors
# Module: 001_002_git-three-tree-architecture-and-basic-workflow
# Educator: Sukanta Hui (Coder & AccoTax, Barrackpore)
# ==============================================================================

set -e
LAB_DIR="/tmp/git_commit_lab_$(date +%s)"
mkdir -p "$LAB_DIR"
cd "$LAB_DIR"

echo "🧪 [STEP 1] Initializing lab repository..."
git init -b main
git config user.name "Sukanta Hui Student"
git config user.email "student@coderaccotax.com"

echo "🧪 [STEP 2] Creating initial commit using single -m..."
echo "const app = 'Barrackpore POS';" > index.js
git add index.js
git commit -m "feat: initial POS bootstrap"

echo "🧪 [STEP 3] Creating multi-line commit using dual -m flags (Title + Body)..."
echo "const GST_RATE = 0.18;" >> index.js
git add index.js
git commit -m "feat(tax): add standard 18% GST tax constant" \
  -m "Introduced GST_RATE constant for compliance with West Bengal tax brackets. Hardcoded values replaced to enable centralized configuration."

echo "🧪 [STEP 4] Testing git commit --amend to fix a minor omission..."
echo "// Reference: AccoTax Barrackpore 2026 Guidelines" >> index.js
git add index.js
git commit --amend -m "feat(tax): add standard 18% GST tax constant" \
  -m "Introduced GST_RATE constant with reference to AccoTax Barrackpore guidelines."

echo "========================================================"
echo "📊 COMMITTED HISTORY & DETAILED HEAD OBJECT:"
echo "========================================================"
git log --stat

echo ""
echo "========================================================"
echo "🔍 LOW-LEVEL CAT-FILE ON LATEST COMMIT OBJECT:"
echo "========================================================"
git cat-file -p HEAD

echo ""
echo "✅ Lab execution complete. Clean up: rm -rf $LAB_DIR"
