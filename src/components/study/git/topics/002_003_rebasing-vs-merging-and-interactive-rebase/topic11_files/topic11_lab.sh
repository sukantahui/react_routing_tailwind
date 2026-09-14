#!/usr/bin/env bash
# ==============================================================================
# Git Lab 002_003_11: Autosquash Automation Sandbox
# Instructor: Sukanta Hui (Coder & AccoTax, Barrackpore)
# ==============================================================================

set -e

LAB_DIR="$HOME/git_autosquash_lab11"
rm -rf "$LAB_DIR"
mkdir -p "$LAB_DIR"
cd "$LAB_DIR"

echo "=== 1. Initialize Repo ==="
git init
git config user.name "Sukanta Hui"
git config user.email "sukanta@accotax.in"

echo "Initial" > base.txt
git add base.txt
git commit -m "feat: initial commit"

echo "=== 2. Create feature commits ==="
git switch -c feature/autosquash-demo

echo "function calcGST() { return 0.15; }" > gst.js
git add gst.js
git commit -m "feat: add GST calculation (TARGET COMMIT)"
TARGET_SHA=$(git rev-parse --short HEAD)

echo "export function calcTDS() { return 0.10; }" > tds.js
git add tds.js
git commit -m "feat: add TDS calculation (UNRELATED COMMIT)"

echo "=== 3. Spot bug in GST calculation: Fix with --fixup ==="
echo "function calcGST() { return 0.18; }" > gst.js
git add gst.js
git commit --fixup "$TARGET_SHA"

echo ""
echo "=== 4. Commit History BEFORE Autosquash ==="
git log --oneline

echo ""
echo "=== 5. Running Automated Rebase with --autosquash ==="
export GIT_SEQUENCE_EDITOR="cat"
git rebase -i --autosquash HEAD~3

echo ""
echo "=== 6. Commit History AFTER Autosquash ==="
git log --oneline

echo "=== Lab 11 Completed: Fixup folded automatically into target commit! ==="
