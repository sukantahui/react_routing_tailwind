#!/usr/bin/env bash
# ==============================================================================
# LAB DRILL: RENAMING BRANCHES (git branch -m and git branch -M)
# Instructor: Sukanta Hui (Coder & AccoTax, Barrackpore)
# ==============================================================================

set -e
echo "=== Step 1: Initializing Sandbox Repository ==="
SANDBOX_DIR="renaming_branches_sandbox"
rm -rf "$SANDBOX_DIR"
mkdir "$SANDBOX_DIR"
cd "$SANDBOX_DIR"

git init
git config user.name "Tuhina Mukherjee"
git config user.email "tuhina.barrackpore@example.com"

echo "=== Step 2: Creating Baseline Commit ==="
echo "AccoTax Ledger v1" > ledger.txt
git add ledger.txt
git commit -m "feat: initial commit"

echo "=== Step 3: Renaming current branch from default to 'main' ==="
git branch -m main
echo "Current branch name:"
git branch --show-current
echo "Content of .git/HEAD:"
cat .git/HEAD

echo "=== Step 4: Creating a branch with a deliberate typo ==="
git branch feat-gst-typo
echo "List of branches:"
git branch

echo "=== Step 5: Renaming arbitrary branch while on 'main' ==="
git branch -m feat-gst-typo feature/gst-calculation
echo "List of branches after rename:"
git branch

echo "=== Step 6: Verifying filesystem ref file rename ==="
echo "Files in .git/refs/heads/:"
find .git/refs/heads/ -type f

echo "=== Step 7: Testing uppercase -M to force rename ==="
git branch temp-scratch
git switch temp-scratch
echo "Scratch file" > scratch.txt
git add scratch.txt && git commit -m "temp commit"

echo "Force renaming current branch to overwrite an existing name with -M:"
git branch -M feature/gst-calculation
echo "Active branch is now: $(git branch --show-current)"

echo "=== Lab Completed Successfully! ==="
