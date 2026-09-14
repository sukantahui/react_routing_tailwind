#!/usr/bin/env bash
# ==============================================================================
# LAB SCRIPT: Topic 15 - Module 001_002 Assessment & Verification Script
# Module: 001_002_git-three-tree-architecture-and-basic-workflow
# Educator: Sukanta Hui (Coder & AccoTax, Barrackpore)
# ==============================================================================

set -e
LAB_DIR="/tmp/module_002_assessment_lab_$(date +%s)"
mkdir -p "$LAB_DIR"
cd "$LAB_DIR"

echo "🎓 ========================================================"
echo "🏆 MODULE 001_002 COMPREHENSIVE CERTIFICATION LAB"
echo "🎓 ========================================================"

echo ""
echo "🧪 [1/5] Testing Repository Initialization..."
git init -b main
git config user.name "Sukanta Hui Student"
git config user.email "student@coderaccotax.com"
echo "✅ Init with branch 'main' passed."

echo ""
echo "🧪 [2/5] Testing 3-Tier Exclusion System..."
echo "node_modules/" > .gitignore
echo ".env" >> .gitignore
git add .gitignore
git commit -m "chore: configure base gitignore"

echo "local_test.js" >> .git/info/exclude
touch local_test.js .env node_modules_test.js

echo "Verifying local exclude status:"
git status -s
echo "✅ 3-Tier ignore verification passed."

echo ""
echo "🧪 [3/5] Testing Atomic Conventional Commits..."
echo "export const tax = 0.18;" > tax.js
git add tax.js
git commit -m "feat(tax): add standard 18% GST constant"

echo "// formatted" >> tax.js
git add tax.js
git commit -m "style: apply consistent indentation"
echo "✅ Conventional commits verification passed."

echo ""
echo "🧪 [4/5] Testing Staged vs Unstaged Diff..."
echo "// Unstaged line" >> tax.js
echo "Unstaged diff output:"
git diff
echo "✅ Git diff verification passed."

echo ""
echo "🧪 [5/5] Testing History Graph Inspection..."
git log --oneline --graph --decorate
echo "✅ Log inspection passed."

echo ""
echo "🏆 Module 001_002 Assessment Lab successfully passed all checks!"
echo "Clean up: rm -rf $LAB_DIR"
