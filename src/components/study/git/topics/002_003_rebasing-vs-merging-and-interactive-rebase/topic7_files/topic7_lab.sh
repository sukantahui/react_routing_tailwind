#!/usr/bin/env bash
# ==============================================================================
# Git Lab 002_003_07: Interactive Rebase Mastery Sandbox
# Instructor: Sukanta Hui (Coder & AccoTax, Barrackpore)
# ==============================================================================

set -e

LAB_DIR="$HOME/git_interactive_rebase_lab7"
rm -rf "$LAB_DIR"
mkdir -p "$LAB_DIR"
cd "$LAB_DIR"

echo "=== 1. Initialize Git Repo ==="
git init
git config user.name "Sukanta Hui"
git config user.email "sukanta@accotax.in"

echo "Ledger core" > app.js
git add app.js
git commit -m "feat: initial ledger"

echo "=== 2. Create 4 commits on feature branch ==="
git switch -c feature/gst-cleanup

echo "GST calc v1" >> app.js
git add app.js
git commit -m "feat: start gst calc"

echo "// fixed typo" >> app.js
git add app.js
git commit -m "fix typo"

echo "// added debug print" >> app.js
git add app.js
git commit -m "wip debug"

echo "export function calcGST() { return 0.18; }" >> app.js
git add app.js
git commit -m "feat: finish gst calc function"

echo ""
echo "=== 3. Commit History BEFORE Interactive Rebase ==="
git log --oneline -n 5

echo ""
echo "=== 4. Simulating automated interactive squash via GIT_SEQUENCE_EDITOR ==="
export GIT_SEQUENCE_EDITOR="sed -i 's/^pick \(.*fix typo\)/fixup \1/; s/^pick \(.*wip debug\)/fixup \1/'"
git rebase -i HEAD~4

echo ""
echo "=== 5. Commit History AFTER Interactive Rebase ==="
git log --oneline -n 3

echo "=== Lab 7 Completed: 4 messy commits squashed into clean commits! ==="
