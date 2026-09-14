#!/usr/bin/env bash
# ==============================================================================
# Terminal Lab: Decision Matrix for Undoing Changes in Git
# Module: 001_004_safely-undoing-changes-and-basic-recovery (Topic 0)
# Educator: Sukanta Hui (Coder & AccoTax, Barrackpore)
# ==============================================================================

set -e

echo "=== Setting up Decision Matrix Sandbox Repository ==="
SANDBOX_DIR="/tmp/git-undo-decision-matrix-lab"
rm -rf "$SANDBOX_DIR"
mkdir -p "$SANDBOX_DIR"
cd "$SANDBOX_DIR"

git init
git config user.name "Sukanta Hui"
git config user.email "sukanta@codernaccotax.co.in"

echo "# Invoicing System" > README.md
echo "console.log('App Initialized');" > app.js
git add README.md app.js
git commit -m "feat: initial commit for billing engine"

echo ""
echo "=== Step 1: Discarding Unstaged Working Tree Changes ==="
echo "console.log('BROKEN UNSTAGED EDIT');" >> app.js
echo "Status before restore:"
git status -s
git restore app.js
echo "Status after git restore app.js (should be clean):"
git status -s

echo ""
echo "=== Step 2: Unstaging Staged Changes Without Losing Code ==="
echo "const TAX_RATE = 0.18;" >> app.js
git add app.js
echo "Status after staging:"
git status -s
git restore --staged app.js
echo "Status after git restore --staged app.js (file remains modified on disk):"
git status -s

echo ""
echo "=== Step 3: Amending a Local Commit ==="
git add app.js
git commit -m "feat(tax): add tax rate constant"
echo "const DISCOUNT_RATE = 0.05;" >> app.js
git add app.js
git commit --amend -m "feat(tax): add tax rate and standard discount constant"
git log --oneline -n 1

echo ""
echo "=== Step 4: Reverting a Commit Cleanly ==="
git revert --no-edit HEAD
git log --oneline -n 2

echo ""
echo "=== Sandbox Decision Matrix Verification Complete ==="
