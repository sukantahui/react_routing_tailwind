#!/usr/bin/env bash
# ==============================================================================
# LAB DRILL: DELETING BRANCHES (SAFE -d VS FORCE -D)
# Instructor: Sukanta Hui (Coder & AccoTax, Barrackpore)
# ==============================================================================

set -e
echo "=== Step 1: Initializing Deletion Sandbox ==="
SANDBOX_DIR="branch_deletion_sandbox"
rm -rf "$SANDBOX_DIR"
mkdir "$SANDBOX_DIR"
cd "$SANDBOX_DIR"

git init
git config user.name "Sachin Sharma"
git config user.email "sachin.barrackpore@example.com"

echo "=== Step 2: Creating Baseline Commit on main ==="
echo "AccoTax Ledger Initial" > ledger.txt
git add ledger.txt && git commit -m "feat: initial ledger"

echo "=== Step 3: Creating and Merging a Feature Branch ==="
git switch -c feature-merged
echo "Merged Feature Code" >> ledger.txt
git commit -am "feat: add feature code"

git switch main
git merge feature-merged

echo "=== Step 4: Testing Safe Deletion on Merged Branch (-d) ==="
git branch -d feature-merged
echo "feature-merged deleted successfully with -d!"

echo "=== Step 5: Creating an Unmerged Experimental Branch ==="
git switch -c experiment-failed
echo "Experimental buggy code" >> experiment.txt
git add experiment.txt && git commit -m "test: experimental code"

git switch main

echo "=== Step 6: Testing Safe Deletion on Unmerged Branch (Should Fail) ==="
if git branch -d experiment-failed 2>&1; then
    echo "Unexpected success"
else
    echo "Git safely blocked deletion because experiment-failed has unmerged commits!"
fi

echo "=== Step 7: Force Deleting with -D ==="
git branch -D experiment-failed
echo "experiment-failed deleted with force flag -D!"

echo "=== Step 8: Verifying refs/heads directory ==="
echo "Remaining branches:"
ls -la .git/refs/heads/

echo "=== Lab Completed Successfully! ==="
