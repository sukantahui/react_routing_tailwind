#!/usr/bin/env bash
# ==============================================================================
# Topic 7 Terminal Lab: Reflog Recovery & Understanding Data Permanence
# Educator: Sukanta Hui (Coder & AccoTax, Barrackpore)
# ==============================================================================

set -e

SANDBOX_DIR="/tmp/git_hard_safety_lab_$$"
mkdir -p "$SANDBOX_DIR"
cd "$SANDBOX_DIR"

echo "==> Initializing repository..."
git init -b main
git config user.name "Accident Recovery Tester"
git config user.email "recovery@barrackpore-devs.in"

echo "==> Creating 3 commits..."
echo "file 0" > f0.txt && git add f0.txt && git commit -m "c0: base"
echo "file 1" > f1.txt && git add f1.txt && git commit -m "c1: feature a"
echo "file 2" > f2.txt && git add f2.txt && git commit -m "c2: critical payment logic"
LAST_GOOD_COMMIT=$(git rev-parse --short HEAD)
echo "Tip commit before reset: $LAST_GOOD_COMMIT"

echo "==> DISASTER SIMULATION: Running git reset --hard HEAD~2..."
git reset --hard HEAD~2
echo "Current HEAD is now at: $(git rev-parse --short HEAD)"
echo "Files on disk:"
ls -l

echo "==> RECOVERY STEP 1: Inspecting git reflog..."
git reflog -n 5

echo "==> RECOVERY STEP 2: Restoring with git reset --hard HEAD@{1}..."
git reset --hard "HEAD@{1}"
echo "HEAD after recovery: $(git rev-parse --short HEAD)"
echo "Restored files on disk:"
ls -l

if [ -f "f2.txt" ]; then
  echo "✔ Successfully recovered all committed work using git reflog!"
else
  echo "❌ Recovery failed!"
  exit 1
fi

rm -rf "$SANDBOX_DIR"
echo "✔ Lab completed cleanly!"
