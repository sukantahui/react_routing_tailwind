#!/usr/bin/env bash
# ==============================================================================
# LAB DRILL: RECOVERING FROM DETACHED HEAD (RESCUE VIA SWITCH -c & REFLOG)
# Instructor: Sukanta Hui (Coder & AccoTax, Barrackpore)
# ==============================================================================

set -e
echo "=== Step 1: Initializing Rescue Sandbox ==="
SANDBOX_DIR="detached_rescue_sandbox"
rm -rf "$SANDBOX_DIR"
mkdir "$SANDBOX_DIR"
cd "$SANDBOX_DIR"

git init
git config user.name "Debangshu Poddar"
git config user.email "debangshu.barrackpore@example.com"

echo "=== Step 2: Creating Baseline Commit ==="
echo "AccoTax Payroll Engine Base" > payroll.js
git add payroll.js && git commit -m "feat: payroll base"
BASE_SHA=$(git rev-parse HEAD)

echo "=== Step 3: Entering Detached HEAD and Creating Commits ==="
git switch --detach "$BASE_SHA"
echo "function bonusCalc() { return 5000; }" >> payroll.js
git commit -am "feat: add experimental bonus algorithm"
BONUS_SHA=$(git rev-parse HEAD)

echo "=== Step 4: Accidentally Switching to Main ==="
git switch main
echo "Current log on main (Notice bonus commit is missing):"
git log --oneline

echo "=== Step 5: Locating the Lost Commit via Reflog ==="
git reflog -n 5

echo "=== Step 6: Rescuing via 'git switch -c rescue-bonus-feature' ==="
git switch -c rescue-bonus-feature "$BONUS_SHA"

echo "Log on rescue-bonus-feature branch:"
git log --oneline

echo "Verifying payroll.js content:"
cat payroll.js

echo "=== Step 7: Merging Rescued Branch into main ==="
git switch main
git merge rescue-bonus-feature

echo "Final log on main:"
git log --oneline

echo "=== Lab Completed Successfully! ==="
