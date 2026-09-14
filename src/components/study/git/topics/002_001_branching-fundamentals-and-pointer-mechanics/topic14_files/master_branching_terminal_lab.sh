#!/usr/bin/env bash
# ==============================================================================
# MASTER LAB DRILL: COMPREHENSIVE BRANCHING & POINTER MECHANICS
# Instructor: Sukanta Hui (Coder & AccoTax, Barrackpore)
# ==============================================================================

set -e
echo "=== Phase 1: Repository Initialization & Baseline Commit ==="
SANDBOX_DIR="master_branch_lab_sandbox"
rm -rf "$SANDBOX_DIR"
mkdir "$SANDBOX_DIR"
cd "$SANDBOX_DIR"

git init
git config user.name "Terminal Master"
git config user.email "master.barrackpore@example.com"

echo "AccoTax Core v1.0" > app.js
git add app.js && git commit -m "feat: initial commit C1"
C1_SHA=$(git rev-parse HEAD)

echo "=== Phase 2: Feature Branch Creation with git switch -c ==="
git switch -c feature/billing-v1
echo "function generateBill() { return 'Bill #101'; }" >> app.js
git commit -am "feat: add billing function"

echo "=== Phase 3: Entering Detached HEAD on Commit C1 ==="
git switch --detach "$C1_SHA"
echo "// Experimental AI tax prediction algorithm" >> app.js
git commit -am "experiment: neural tax prediction model"
EXP_SHA=$(git rev-parse HEAD)

echo "=== Phase 4: Rescuing Experimental Commit to a Named Branch ==="
git switch -c feature/ai-tax-rescued

echo "=== Phase 5: Divergent Development on main ==="
git switch main
echo "// Main branch configuration updates" >> app.js
git commit -am "chore: update system configuration"

echo "=== Phase 6: Code Review Diff using Three-Dot Notation ==="
echo "--- Three-Dot Diff (PR View) ---"
git diff main...feature/billing-v1

echo "=== Phase 7: Merging and Clean Branch Deletion ==="
git merge feature/billing-v1
git branch -d feature/billing-v1

echo "=== Phase 8: Final Branch Ecosystem Inspection ==="
git branch -v
git log --graph --oneline --all

echo "=== All Master Drills Passed Successfully! ==="
