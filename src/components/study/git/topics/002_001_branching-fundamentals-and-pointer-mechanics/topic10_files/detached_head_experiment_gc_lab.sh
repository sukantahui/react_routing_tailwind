#!/usr/bin/env bash
# ==============================================================================
# LAB DRILL: EXPERIMENTING IN DETACHED HEAD & OBSERVING DANGLING COMMITS
# Instructor: Sukanta Hui (Coder & AccoTax, Barrackpore)
# ==============================================================================

set -e
echo "=== Step 1: Initializing Sandbox Repository ==="
SANDBOX_DIR="detached_experiment_sandbox"
rm -rf "$SANDBOX_DIR"
mkdir "$SANDBOX_DIR"
cd "$SANDBOX_DIR"

git init
git config user.name "Swadeep Sarkar"
git config user.email "swadeep.barrackpore@example.com"

echo "=== Step 2: Creating Baseline Commit ==="
echo "AccoTax v1" > app.js
git add app.js && git commit -m "Commit C1: init"
BASE_SHA=$(git rev-parse HEAD)

echo "=== Step 3: Entering Detached HEAD on C1 ==="
git switch --detach "$BASE_SHA"

echo "=== Step 4: Making 2 Experimental Commits in Detached HEAD ==="
echo "// Experiment 1" >> app.js
git commit -am "Commit E1: prototype fast math"
E1_SHA=$(git rev-parse HEAD)

echo "// Experiment 2" >> app.js
git commit -am "Commit E2: neural network tax predictor"
E2_SHA=$(git rev-parse HEAD)

echo "Log in detached HEAD:"
git log --oneline -n 3

echo "=== Step 5: Switching back to main (Observe Git Warning) ==="
git switch main

echo "Log on main (Notice E1 and E2 are invisible from main):"
git log --oneline

echo "=== Step 6: Finding unreachable commits with git fsck ==="
git fsck --lost-found || true

echo "=== Step 7: Locating the commit in reflog ==="
git reflog

echo "=== Lab Completed Successfully! ==="
