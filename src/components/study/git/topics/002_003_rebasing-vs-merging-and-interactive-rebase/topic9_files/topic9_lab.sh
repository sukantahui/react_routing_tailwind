#!/usr/bin/env bash
# ==============================================================================
# Git Lab 002_003_09: Splitting a Commit during Interactive Rebase
# Instructor: Sukanta Hui (Coder & AccoTax, Barrackpore)
# ==============================================================================

set -e

LAB_DIR="$HOME/git_split_commit_lab9"
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

echo "=== 2. Create Monolithic Megacommit ==="
echo "export function calcPenalty() { return 5000; }" > penalty.js
echo "DB_URL=mongodb://accotax-db:27017" > database.cfg
git add penalty.js database.cfg
git commit -m "feat: add penalty calculator and db config (MEGACOMMIT)"

echo ""
echo "=== History BEFORE Split ==="
git log --oneline

echo ""
echo "=== 3. Simulating interactive rebase with 'edit' ==="
export GIT_SEQUENCE_EDITOR="sed -i 's/^pick/edit/'"
git rebase -i HEAD~1

echo "Paused at megacommit! Resetting to working tree..."
git reset HEAD~

echo "Creating Atomic Commit 1: Database Config..."
git add database.cfg
git commit -m "fix(db): update production MongoDB connection URI"

echo "Creating Atomic Commit 2: Penalty Calculator..."
git add penalty.js
git commit -m "feat(gst): implement ₹5,000 late filing penalty calculation"

echo "Resuming rebase with git rebase --continue..."
git rebase --continue

echo ""
echo "=== History AFTER Split (2 Clean Atomic Commits!) ==="
git log --oneline

echo "=== Lab 9 Completed Successfully! ==="
