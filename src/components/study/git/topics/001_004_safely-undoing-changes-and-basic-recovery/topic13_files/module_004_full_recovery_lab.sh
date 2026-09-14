#!/usr/bin/env bash
# ==============================================================================
# Topic 13 Terminal Lab: Module 004 Comprehensive Undo & Recovery Master Drill
# Educator: Sukanta Hui (Coder & AccoTax, Barrackpore)
# ==============================================================================

set -e

SANDBOX_DIR="/tmp/module_004_master_lab_$$"
mkdir -p "$SANDBOX_DIR"
cd "$SANDBOX_DIR"

echo "======================================================================"
echo "STARTING MODULE 001_004 MASTER LAB SIMULATION"
echo "======================================================================"

echo "==> [DRILL 1] Initializing repository..."
git init -b main
git config user.name "Master Explorer"
git config user.email "master@barrackpore-devs.in"

echo "export const systemName = 'AccoTax Core';" > core.js
git add core.js
git commit -m "feat(core): initial production system"

# ------------------------------------------------------------------------------
# Drill 1: git restore (Working tree and Staging)
# ------------------------------------------------------------------------------
echo "==> [DRILL 1] Testing git restore..."
echo "broken local test code" >> core.js
git restore core.js
echo "✔ Working tree modification cleanly discarded!"

echo "staged syntax error" >> core.js
git add core.js
git restore --staged core.js
git restore core.js
echo "✔ Staged change cleanly unstaged and discarded!"

# ------------------------------------------------------------------------------
# Drill 2: git commit --amend
# ------------------------------------------------------------------------------
echo "==> [DRILL 2] Testing git commit --amend..."
echo "export const version = '2.0.0';" >> core.js
git commit -am "wip typo msg"
git commit --amend -m "feat(core): add system version v2.0.0"
echo "✔ Commit message successfully amended!"

# ------------------------------------------------------------------------------
# Drill 3: Reset Modes and Reflog Recovery
# ------------------------------------------------------------------------------
echo "==> [DRILL 3] Testing Reset Modes & Reflog..."
echo "console.log('buggy feature');" >> core.js
git commit -am "feat(bug): broken payment hook"
PRE_RESET_SHA=$(git rev-parse --short HEAD)

git reset --hard HEAD~1
echo "✔ Hard reset executed; HEAD moved back."

echo "==> Restoring from Reflog..."
git reset --hard "$PRE_RESET_SHA"
echo "✔ Successfully recovered commit from Reflog: $(git rev-parse --short HEAD)"

# ------------------------------------------------------------------------------
# Drill 4: git revert & Re-reverting
# ------------------------------------------------------------------------------
echo "==> [DRILL 4] Testing git revert..."
git revert --no-edit "$PRE_RESET_SHA"
REVERT_COMMIT_SHA=$(git rev-parse --short HEAD)
echo "✔ Revert commit created: $REVERT_COMMIT_SHA"

git revert --no-edit "$REVERT_COMMIT_SHA"
echo "✔ Re-revert successfully restored the feature code forward in time!"

# ------------------------------------------------------------------------------
# Drill 5: git clean
# ------------------------------------------------------------------------------
echo "==> [DRILL 5] Testing git clean..."
mkdir -p temp_build
echo "artifact" > temp_build/output.bin
echo "scratch" > scratch.txt

git clean -nd
git clean -fd
echo "✔ Untracked folders and files purged!"

echo "======================================================================"
echo "FINAL AUDIT: git status"
echo "======================================================================"
git status

rm -rf "$SANDBOX_DIR"
echo "✔ ALL 5 MODULE MASTER DRILLS PASSED WITH 100% SUCCESS!"
