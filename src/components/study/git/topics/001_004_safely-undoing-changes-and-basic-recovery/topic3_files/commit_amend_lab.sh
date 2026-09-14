#!/usr/bin/env bash
# ==============================================================================
# Terminal Lab: Amending Commits with git commit --amend
# Module: 001_004_safely-undoing-changes-and-basic-recovery (Topic 3)
# Educator: Sukanta Hui (Coder & AccoTax, Barrackpore)
# ==============================================================================

set -e

echo "=== Initializing Lab Sandbox ==="
LAB_DIR="/tmp/git-amend-lab"
rm -rf "$LAB_DIR"
mkdir -p "$LAB_DIR"
cd "$LAB_DIR"

git init
git config user.name "Sukanta Hui"
git config user.email "sukanta@codernaccotax.co.in"

echo "=== Step 1: Creating an initial commit with a typo in message ==="
echo "function calculateGST(amount) { return amount * 0.18; }" > gstCalculator.js
git add gstCalculator.js
git commit -m "feat(tax): implemnt 18% gst calculator" # Typo: implemnt

echo "Initial commit log:"
git log --oneline -n 1

echo ""
echo "=== Step 2: Fixing commit message typo with amend ==="
git commit --amend -m "feat(tax): implement 18% GST calculator"
echo "Log after message amend:"
git log --oneline -n 1

echo ""
echo "=== Step 3: Adding a forgotten test file to the commit ==="
echo "console.assert(calculateGST(100) === 18, 'GST test failed');" > gstCalculator.test.js
git add gstCalculator.test.js
git commit --amend --no-edit

echo "Log after adding forgotten file (--no-edit):"
git log --oneline -n 1
git show --stat HEAD

echo ""
echo "=== Step 4: Inspecting Git Reflog to see both pre-amend and amended SHAs ==="
git reflog -n 4

echo ""
echo "=== Lab 3 Completed Successfully ==="
