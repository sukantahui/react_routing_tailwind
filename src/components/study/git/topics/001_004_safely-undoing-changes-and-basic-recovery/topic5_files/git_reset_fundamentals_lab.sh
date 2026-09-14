#!/usr/bin/env bash
# ==============================================================================
# Topic 5 Terminal Lab: Demystifying git reset & Pointer Movement Mechanics
# Educator: Sukanta Hui (Coder & AccoTax, Barrackpore)
# ==============================================================================

set -e

SANDBOX_DIR="/tmp/git_reset_basics_lab_$$"
mkdir -p "$SANDBOX_DIR"
cd "$SANDBOX_DIR"

echo "==> Initializing repository..."
git init -b main
git config user.name "Student Developer"
git config user.email "student@barrackpore-code.in"

echo "==> Creating 3 sequential commits (C0, C1, C2)..."
echo "console.log('v0: base app');" > index.js
git add index.js
git commit -m "feat: initial commit (C0)"
C0_SHA=$(git rev-parse --short HEAD)

echo "console.log('v1: auth feature');" >> index.js
git add index.js
git commit -m "feat(auth): login added (C1)"
C1_SHA=$(git rev-parse --short HEAD)

echo "console.log('v2: payment gateway bug');" >> index.js
git add index.js
git commit -m "feat(pay): buggy payment logic (C2)"
C2_SHA=$(git rev-parse --short HEAD)

echo "==> Current log before reset:"
git log --oneline

echo "==> DEMO 1: Resetting HEAD~1 with --soft..."
git reset --soft HEAD~1
echo "Current HEAD pointer: $(git rev-parse --short HEAD) (Should equal C1: $C1_SHA)"
echo "Checking git status (changes should be staged in green):"
git status --short

echo "==> Re-committing C2 so we can test mixed reset..."
git commit -m "feat(pay): buggy payment logic (C2 re-committed)"

echo "==> DEMO 2: Resetting HEAD~1 with --mixed (default)..."
git reset --mixed HEAD~1
echo "Current HEAD pointer: $(git rev-parse --short HEAD)"
echo "Checking git status (changes should be unstaged in red):"
git status --short

echo "==> Inspecting reflog to see pointer transitions..."
git reflog -n 5

echo "==> Lab completed successfully. Cleaning up sandbox: $SANDBOX_DIR"
rm -rf "$SANDBOX_DIR"
echo "✔ All pointer mechanics verified!"
