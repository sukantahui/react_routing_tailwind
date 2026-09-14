#!/usr/bin/env bash
# ==============================================================================
# Git Lab 002_003_03: How Rebase Works Under the Hood
# Instructor: Sukanta Hui (Coder & AccoTax, Barrackpore)
# ==============================================================================

set -e

LAB_DIR="$HOME/git_rebase_under_the_hood_lab3"
rm -rf "$LAB_DIR"
mkdir -p "$LAB_DIR"
cd "$LAB_DIR"

echo "=== 1. Initialize Git Repo ==="
git init
git config user.name "Sukanta Hui"
git config user.email "sukanta@accotax.in"

echo "Base config" > app.cfg
git add app.cfg
git commit -m "Commit A: Initial"

echo "FY 2026-27" >> app.cfg
git add app.cfg
git commit -m "Commit B: Common Ancestor"

echo "=== 2. Create feature branch and add 2 commits ==="
git switch -c feature/audit
echo "Audit v1" > audit.log
git add audit.log
git commit -m "Commit C: Add audit log"

echo "Audit v2" >> audit.log
git add audit.log
git commit -m "Commit D: Add audit timestamps"

echo "=== 3. Add commits to main ==="
git switch main
echo "Main update 1" > main.txt
git add main.txt
git commit -m "Commit E: Main update"

echo "Main update 2" >> main.txt
git add main.txt
git commit -m "Commit F: Main tip"

echo "=== 4. Inspect Merge Base ==="
MERGE_BASE=$(git merge-base main feature/audit)
echo "Calculated Merge Base SHA: $MERGE_BASE"

echo "=== 5. Run Rebase and Inspect Output ==="
git switch feature/audit
git rebase main -v

echo "=== 6. Verify New Commit Hashes & Linearity ==="
git log --graph --oneline --all --decorate

echo "=== Lab 3 Completed: Low-level engine verified! ==="
