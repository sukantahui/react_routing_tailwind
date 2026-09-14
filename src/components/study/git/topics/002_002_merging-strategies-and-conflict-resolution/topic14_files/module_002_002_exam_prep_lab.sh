#!/usr/bin/env bash
# ==============================================================================
# BASH LAB: MODULE 002_002 EXAM PREPARATION & RECAP DRILL
# MODULE: 002_002_merging-strategies-and-conflict-resolution (Topic 14)
# INSTRUCTOR: Sukanta Hui (Coder & AccoTax, Barrackpore)
# ==============================================================================

set -euo pipefail

LAB_DIR="$HOME/git_module_002_002_exam_drill"
echo "=== Step 1: Initializing Exam Sandbox Repository at $LAB_DIR ==="
rm -rf "$LAB_DIR"
mkdir -p "$LAB_DIR"
cd "$LAB_DIR"

git init -b main
git config user.name "Sukanta Hui"
git config user.email "sukanta@coderaccotax.in"

echo "=== Drill 1: Fast-Forward Merge vs Explicit --no-ff Merge ==="
echo "console.log('App Core');" > app.js
git add app.js && git commit -m "feat: initial commit (C0)"

git switch -c feature/ff-demo
echo "console.log('Fast Forward Feature');" >> app.js
git commit -am "feat: feature addition"

git switch main
# Fast forward merge
git merge feature/ff-demo
echo "FF Merge complete. Number of parents in HEAD commit:"
git rev-list --parents -n 1 HEAD

echo ""
echo "=== Drill 2: 3-Way Merge with Merge Base Calculation ==="
git switch -c feature/3way-demo
echo "const GST = 0.28;" >> app.js
git commit -am "feat: 28% GST"

git switch main
echo "const GST = 0.12;" >> app.js
git commit -am "feat: 12% GST"

BASE_SHA=$(git merge-base main feature/3way-demo)
echo "Merge Base calculated: $BASE_SHA"

echo ""
echo "=== Drill 3: Triggering & Aborting a Merge Conflict ==="
set +e
git merge feature/3way-demo
set -e

echo "Active unmerged state:"
git status --short

echo "Aborting merge safely..."
git merge --abort
echo "Status after abort:"
git status --short

echo ""
echo "=== Drill 4: Squash Merging Drill ==="
git switch -c feature/squash-demo
echo "// micro commit 1" >> app.js && git commit -am "wip: step 1"
echo "// micro commit 2" >> app.js && git commit -am "wip: step 2"
echo "// micro commit 3" >> app.js && git commit -am "wip: step 3"

git switch main
git merge --squash feature/squash-demo
git commit -m "feat(squash): consolidate 3 micro commits into 1 atomic commit"
git branch -D feature/squash-demo

echo "Verified single-parent squash commit:"
git rev-list --parents -n 1 HEAD

echo ""
echo "=== Exam Drill Completed with 100% Success! Ready for Module 002_003! ==="
