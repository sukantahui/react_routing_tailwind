#!/usr/bin/env bash
# ==============================================================================
# Git Lab 002_003_00: What is Git Rebase? Replaying Commits on a New Base
# Instructor: Sukanta Hui (Coder & AccoTax, Barrackpore)
# ==============================================================================

set -e

LAB_DIR="$HOME/git_rebase_lab0"
rm -rf "$LAB_DIR"
mkdir -p "$LAB_DIR"
cd "$LAB_DIR"

echo "=== Initializing Sandbox Repository ==="
git init
git config user.name "Sukanta Hui"
git config user.email "sukanta@accotax.in"

echo "=== Step 1: Creating Base Commits on main ==="
echo "AccoTax Ledger v1.0" > ledger.txt
git add ledger.txt
git commit -m "feat: initial ledger setup (Commit A)"

echo "Financial Year 2026-27 Config" > config.json
git add config.json
git commit -m "feat: add FY 2026-27 settings (Commit B)"

echo "=== Step 2: Branching Feature Branch ==="
git switch -c feature/gst-calc

echo "export function calcGST(amount) { return amount * 0.18; }" > gst.js
git add gst.js
git commit -m "feat: implement 18% GST calculation (Commit C)"

echo "export function calcCess(amount) { return amount * 0.02; }" >> gst.js
git add gst.js
git commit -m "feat: add compensation cess (Commit D)"

echo "=== Step 3: Diverging main with new commits ==="
git switch main
echo "export const CURRENCY = 'INR (₹)';" > currency.js
git add currency.js
git commit -m "feat: add Rupee currency constant (Commit E)"

echo "export const BARRACKPORE_OFFICE_CODE = 'WB-BP-700120';" >> config.json
git add config.json
git commit -m "feat: register Barrackpore regional office code (Commit F)"

echo ""
echo "=== History BEFORE Rebase ==="
git log --graph --oneline --all --decorate

echo ""
echo "=== Step 4: Replaying feature/gst-calc onto main ==="
git switch feature/gst-calc
git rebase main

echo ""
echo "=== History AFTER Rebase (Notice Linear DAG & New Hashes!) ==="
git log --graph --oneline --all --decorate

echo ""
echo "=== Step 5: Fast-Forwarding main to include rebased feature ==="
git switch main
git merge feature/gst-calc

echo ""
echo "=== Final Clean Linear Project History ==="
git log --graph --oneline --decorate

echo "=== Lab 0 Completed Successfully! ==="
