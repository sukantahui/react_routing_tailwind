#!/usr/bin/env bash
# ==============================================================================
# Git Lab 002_003_06: Rebase Control Commands (--skip & --abort)
# Instructor: Sukanta Hui (Coder & AccoTax, Barrackpore)
# ==============================================================================

set -e

LAB_DIR="$HOME/git_rebase_controls_lab6"
rm -rf "$LAB_DIR"
mkdir -p "$LAB_DIR"
cd "$LAB_DIR"

echo "=== 1. Initialize Sandbox Repository ==="
git init
git config user.name "Sukanta Hui"
git config user.email "sukanta@accotax.in"

echo "Initial core" > core.txt
git add core.txt
git commit -m "feat: initial commit"

echo "=== 2. Feature branch adds redundant and unique commits ==="
git switch -c feature/redundant-gst
echo "GST_RATE=0.18" >> core.txt
git add core.txt
git commit -m "feat: add 18% rate (redundant commit)"

echo "export function printInvoice() { return 'INVOICE'; }" > invoice.js
git add invoice.js
git commit -m "feat: add invoice printer"

echo "=== 3. Main branch already added GST rate independently ==="
git switch main
echo "GST_RATE=0.18" >> core.txt
git add core.txt
git commit -m "feat: master GST rate definition"

echo "=== 4. Test 1: Simulating rebase conflict & --abort ==="
git switch feature/redundant-gst
echo "Starting rebase onto main..."
git rebase main || true

echo ""
echo "Demonstrating safe emergency bailout with git rebase --abort:"
git rebase --abort
echo "Rebase successfully aborted! Branch returned to starting state."

echo ""
echo "=== 5. Test 2: Simulating rebase conflict & --skip ==="
echo "Restarting rebase..."
git rebase main || true

echo "Skipping redundant commit with git rebase --skip:"
git rebase --skip

echo ""
echo "=== 6. Final Clean History Verification ==="
git log --graph --oneline --decorate --all

echo "=== Lab 6 Completed Successfully! ==="
