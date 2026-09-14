#!/usr/bin/env bash
# ==============================================================================
# LAB DRILL: PRESERVING BRANCH TOPOLOGIES WITH git merge --no-ff
# Instructor: Sukanta Hui (Coder & AccoTax, Barrackpore)
# ==============================================================================

set -e
echo "=== Step 1: Initializing No-FF Sandbox ==="
SANDBOX_DIR="no_ff_merge_sandbox"
rm -rf "$SANDBOX_DIR"
mkdir "$SANDBOX_DIR"
cd "$SANDBOX_DIR"

git init
git config user.name "Abhronila Das"
git config user.email "abhronila.barrackpore@example.com"

echo "=== Step 2: Creating Base Commit on main ==="
echo "AccoTax Ledger v1.0" > ledger.txt
git add ledger.txt && git commit -m "feat: initial ledger setup"

echo "=== Step 3: Creating feature-gst with 3 discrete commits ==="
git switch -c feature-gst
echo "function calcGST() {}" >> gst.js
git add gst.js && git commit -m "feat(gst): add basic calculation helper"

echo "function calcCGST() {}" >> gst.js
git commit -am "feat(gst): add central GST helper"

echo "function calcSGST() {}" >> gst.js
git commit -am "feat(gst): add state GST helper"

echo "=== Step 4: Merging into main using --no-ff ==="
git switch main
git merge --no-ff feature-gst -m "Merge feature/gst-calculation (Sprint #42)"

echo "=== Step 5: Deleting the feature branch pointer ==="
git branch -d feature-gst

echo "=== Step 6: Inspecting Graph (Notice the preserved branch topology!) ==="
git log --graph --oneline

echo "=== Step 7: Testing 1-Step Feature Rollback with git revert -m 1 ==="
MERGE_SHA=$(git rev-parse HEAD)
git revert -m 1 "$MERGE_SHA" --no-edit

echo "Graph after 1-step full feature revert:"
git log --graph --oneline -n 3

echo "=== Lab Completed Successfully! ==="
