#!/usr/bin/env bash
# ==============================================================================
# Git Lab 002_003_01: Rebase vs Merge Philosophical Comparison Sandbox
# Instructor: Sukanta Hui (Coder & AccoTax, Barrackpore)
# ==============================================================================

set -e

LAB_DIR="$HOME/git_rebase_vs_merge_lab1"
rm -rf "$LAB_DIR"
mkdir -p "$LAB_DIR"
cd "$LAB_DIR"

echo "=== 1. Initializing AccoTax Audit Sandbox ==="
git init
git config user.name "Sukanta Hui"
git config user.email "sukanta@accotax.in"

echo "Base accounting rules" > rules.txt
git add rules.txt
git commit -m "feat: initial tax rules"

echo "FY 2026-27 Rates" >> rules.txt
git add rules.txt
git commit -m "feat: FY 2026-27 updates"

# Clone into two repositories to compare side-by-side
cd ..
cp -r "$LAB_DIR" "$LAB_DIR-merge"
cp -r "$LAB_DIR" "$LAB_DIR-rebase"

echo ""
echo "=== 2. Simulating Branching in MERGE Repository ==="
cd "$LAB_DIR-merge"
git switch -c feature/tds-calc
echo "TDS 10% on professional fees" > tds.txt
git add tds.txt
git commit -m "feat: implement TDS section 194J"

git switch main
echo "GSTIN validation active" > gstin.txt
git add gstin.txt
git commit -m "feat: GSTIN validation checks"

echo "--- Performing 3-Way Merge ---"
git switch main
git merge feature/tds-calc -m "merge: integrate TDS calculation"

echo "--- Merge History Graph ---"
git log --graph --oneline --all

echo ""
echo "=== 3. Simulating Branching in REBASE Repository ==="
cd "$LAB_DIR-rebase"
git switch -c feature/tds-calc
echo "TDS 10% on professional fees" > tds.txt
git add tds.txt
git commit -m "feat: implement TDS section 194J"

git switch main
echo "GSTIN validation active" > gstin.txt
git add gstin.txt
git commit -m "feat: GSTIN validation checks"

echo "--- Performing Rebase + Fast-Forward Merge ---"
git switch feature/tds-calc
git rebase main
git switch main
git merge feature/tds-calc

echo "--- Rebase History Graph (Notice the single linear line!) ---"
git log --graph --oneline --all

echo ""
echo "=== Lab 1 Completed: Compare the two terminal graphs above! ==="
