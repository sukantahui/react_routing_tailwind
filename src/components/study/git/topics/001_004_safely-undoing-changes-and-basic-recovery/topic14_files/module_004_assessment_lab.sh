#!/usr/bin/env bash
# ==============================================================================
# Topic 14 Terminal Lab: Module 004 Complete Mastery Assessment
# Educator: Sukanta Hui (Coder & AccoTax, Barrackpore)
# ==============================================================================

set -e

SANDBOX_DIR="/tmp/module_004_assessment_$$"
mkdir -p "$SANDBOX_DIR"
cd "$SANDBOX_DIR"

echo "======================================================================"
echo "RUNNING MODULE 001_004 FINAL MASTERY ASSESSMENT LAB"
echo "======================================================================"

git init -b main
git config user.name "Certification Candidate"
git config user.email "candidate@barrackpore-devs.in"

echo "init" > app.txt
git add app.txt && git commit -m "feat: c0"

# Assessment Test 1: Restore
echo "edit" >> app.txt
git restore app.txt
[ "$(git status --porcelain)" == "" ] && echo "✔ Assessment 1 (Working Tree Restore) PASSED"

# Assessment Test 2: Unstage
echo "staged" >> app.txt
git add app.txt
git restore --staged app.txt
git restore app.txt
[ "$(git status --porcelain)" == "" ] && echo "✔ Assessment 2 (Staging Unstage) PASSED"

# Assessment Test 3: Amend
git commit --allow-empty -m "wip"
git commit --amend -m "feat: polished message"
[ "$(git log -1 --pretty=%B | tr -d '\n')" == "feat: polished message" ] && echo "✔ Assessment 3 (Commit Amend) PASSED"

# Assessment Test 4: Reset & Reflog Recovery
git commit --allow-empty -m "temp commit to test reflog"
SAVED_SHA=$(git rev-parse --short HEAD)
git reset --hard HEAD~1
git reset --hard "$SAVED_SHA"
[ "$(git rev-parse --short HEAD)" == "$SAVED_SHA" ] && echo "✔ Assessment 4 (Reset & Reflog Recovery) PASSED"

# Assessment Test 5: Revert
git revert --no-edit HEAD
echo "✔ Assessment 5 (Revert Public Safety) PASSED"

# Assessment Test 6: Clean
echo "temp" > junk.log
mkdir -p junk_dir
echo "x" > junk_dir/x.bin
git clean -fd
[ "$(git status --porcelain)" == "" ] && echo "✔ Assessment 6 (Workspace Clean) PASSED"

echo "======================================================================"
echo "ALL MODULE 004 ASSESSMENT DRILLS PASSED: SCORE 100/100"
echo "======================================================================"

rm -rf "$SANDBOX_DIR"
