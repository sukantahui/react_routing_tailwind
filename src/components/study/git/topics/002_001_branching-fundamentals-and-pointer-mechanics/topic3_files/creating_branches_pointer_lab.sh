#!/usr/bin/env bash
# ==============================================================================
# LAB DRILL: CREATING BRANCHES & INSPECTING POINTERS IN .git/refs/heads/
# Instructor: Sukanta Hui (Coder & AccoTax, Barrackpore)
# ==============================================================================

set -e
echo "=== Step 1: Initializing Branching Sandbox ==="
SANDBOX_DIR="branch_creation_sandbox"
rm -rf "$SANDBOX_DIR"
mkdir "$SANDBOX_DIR"
cd "$SANDBOX_DIR"

git init
git config user.name "Mahima Ghosh"
git config user.email "mahima.barrackpore@example.com"

echo "=== Step 2: Creating Baseline Commits ==="
echo "AccoTax Ledger v1" > ledger.txt
git add ledger.txt
git commit -m "Commit C1: init repository"

echo "GST Calculation v1" >> ledger.txt
git commit -am "Commit C2: add GST calc logic"

echo "=== Step 3: Checking initial refs folder ==="
echo "Files in .git/refs/heads/:"
ls -la .git/refs/heads/

echo "=== Step 4: Creating a branch using 'git branch feature-tally' ==="
git branch feature-tally

echo "Files in .git/refs/heads/ now:"
ls -la .git/refs/heads/

echo "=== Step 5: Checking active branch (Notice we are STILL on main) ==="
git branch --show-current
cat .git/HEAD

echo "=== Step 6: Verifying SHA matches between main and feature-tally ==="
echo "main ref SHA:         $(cat .git/refs/heads/main)"
echo "feature-tally ref SHA: $(cat .git/refs/heads/feature-tally)"

echo "=== Step 7: Creating hierarchical branch 'feature/billing/invoice' ==="
git branch feature/billing/invoice
echo "Checking directory structure in .git/refs/heads:"
find .git/refs/heads/ -type f

echo "=== Step 8: Branching from an older commit (C1) ==="
FIRST_COMMIT=$(git rev-list --max-parents=0 HEAD)
git branch legacy-v1 "$FIRST_COMMIT"

echo "legacy-v1 points to: $(cat .git/refs/heads/legacy-v1)"
echo "First commit was:    $FIRST_COMMIT"

echo "=== Lab Completed Successfully! ==="
