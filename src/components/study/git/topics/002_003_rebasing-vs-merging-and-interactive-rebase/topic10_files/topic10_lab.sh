#!/usr/bin/env bash
# ==============================================================================
# Git Lab 002_003_10: Squashing WIP Commits Sandbox
# Instructor: Sukanta Hui (Coder & AccoTax, Barrackpore)
# ==============================================================================

set -e

LAB_DIR="$HOME/git_squash_wip_lab10"
rm -rf "$LAB_DIR"
mkdir -p "$LAB_DIR"
cd "$LAB_DIR"

echo "=== 1. Initialize Repo ==="
git init
git config user.name "Sukanta Hui"
git config user.email "sukanta@accotax.in"

echo "Base application" > app.js
git add app.js
git commit -m "feat: initial commit"

echo "=== 2. Simulate 5 Messy WIP Commits ==="
git switch -c feature/gstr1-export

echo "GSTR1 JSON v1" >> gstr1.js
git add gstr1.js
git commit -m "wip: start gstr1"

echo "GSTR1 JSON v2" >> gstr1.js
git add gstr1.js
git commit -m "fixed typo in gstr1"

echo "console.log('debug');" >> gstr1.js
git add gstr1.js
git commit -m "wip: debug log"

echo "export function exportGSTR1() { return { gstin: '19AAACB1234A1Z5' }; }" > gstr1.js
git add gstr1.js
git commit -m "feat: working gstr1 logic"

echo "// clean comments" >> gstr1.js
git add gstr1.js
git commit -m "cleanup"

echo ""
echo "=== History BEFORE Squashing (5 Messy Commits) ==="
git log --oneline -n 5

echo ""
echo "=== 3. Interactive Squash to 1 Conventional Commit ==="
export GIT_SEQUENCE_EDITOR="sed -i '2,5s/^pick/fixup/'"
git rebase -i HEAD~5

git commit --amend -m "feat(compliance): add automated GSTR-1 quarterly JSON export"

echo ""
echo "=== History AFTER Squashing (1 Pristine Review-Ready Commit!) ==="
git log --oneline -n 2

echo "=== Lab 10 Completed Successfully! ==="
