#!/usr/bin/env bash
# ==============================================================================
# Git Lab 002_003_02: Step-by-Step Standard Rebase Workflow Sandbox
# Instructor: Sukanta Hui (Coder & AccoTax, Barrackpore)
# ==============================================================================

set -e

LAB_DIR="$HOME/git_rebase_workflow_lab2"
rm -rf "$LAB_DIR"
mkdir -p "$LAB_DIR"
cd "$LAB_DIR"

echo "=== 1. Initialize Repo and Base Ledger ==="
git init
git config user.name "Sukanta Hui"
git config user.email "sukanta@accotax.in"

echo "AccoTax Core v1.0" > core.js
git add core.js
git commit -m "feat: initial commit on main"

echo "=== 2. Create Feature Branch ==="
git switch -c feature/eway-export
echo "export function exportEwayBill(val) { return 'EWAY:' + val; }" > eway.js
git add eway.js
git commit -m "feat: add eway bill export helper"

echo "=== 3. Add Commits to Main Branch ==="
git switch main
echo "export const GST_RATE_18 = 0.18;" >> core.js
git add core.js
git commit -m "feat: define standard 18% GST rate"

echo "=== 4. Execute Standard Rebase Workflow ==="
echo "Current branch list:"
git branch -v

echo "Switching to feature branch and rebasing onto main..."
git switch feature/eway-export
git rebase main

echo ""
echo "=== 5. Verify Clean Linear DAG ==="
git log --graph --oneline --decorate --all

echo "=== 6. Fast-Forward Merge into Main ==="
git switch main
git merge feature/eway-export

echo ""
echo "=== Final Main Branch History ==="
git log --graph --oneline --decorate

echo "=== Lab 2 Completed Successfully! ==="
