#!/usr/bin/env bash
# ==============================================================================
# LAB DRILL: LISTING AND INSPECTING BRANCHES (git branch -v, -vv, --merged)
# Instructor: Sukanta Hui (Coder & AccoTax, Barrackpore)
# ==============================================================================

set -e
echo "=== Step 1: Initializing Inspection Sandbox ==="
SANDBOX_DIR="branch_inspect_sandbox"
rm -rf "$SANDBOX_DIR"
mkdir "$SANDBOX_DIR"
cd "$SANDBOX_DIR"

git init
git config user.name "Swadeep Sarkar"
git config user.email "swadeep.barrackpore@example.com"

echo "=== Step 2: Creating Commits & Feature Branches ==="
echo "AccoTax Ledger v1" > ledger.txt
git add ledger.txt
git commit -m "feat: initial ledger setup"

git switch -c feature-gst
echo "GST 18% rules" >> ledger.txt
git commit -am "feat: add GST calculator"

git switch -c feature-discount
echo "Discount 10% rules" >> ledger.txt
git commit -am "feat: add discount calculator"

git switch main

echo "=== Step 3: Standard Branch Listing (git branch) ==="
git branch

echo "=== Step 4: Verbose Listing (git branch -v) ==="
git branch -v

echo "=== Step 5: Sorting branches by most recent commit date ==="
git branch --sort=-committerdate --format="%(refname:short) -> Last active: %(committerdate:relative)"

echo "=== Step 6: Testing --merged vs --no-merged ==="
echo "Branches already merged into main:"
git branch --merged

echo "Branches NOT merged into main:"
git branch --no-merged

echo "=== Step 7: Filtering branches that contain a specific commit ==="
FIRST_COMMIT=$(git rev-list --max-parents=0 HEAD)
echo "Branches containing first commit $FIRST_COMMIT:"
git branch --contains "$FIRST_COMMIT"

echo "=== Lab Completed Successfully! ==="
