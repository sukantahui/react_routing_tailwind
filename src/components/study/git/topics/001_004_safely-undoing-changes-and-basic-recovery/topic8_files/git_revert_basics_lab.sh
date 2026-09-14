#!/usr/bin/env bash
# ==============================================================================
# Topic 8 Terminal Lab: Safe Public History Rollback with git revert
# Educator: Sukanta Hui (Coder & AccoTax, Barrackpore)
# ==============================================================================

set -e

SANDBOX_DIR="/tmp/git_revert_basics_lab_$$"
mkdir -p "$SANDBOX_DIR"
cd "$SANDBOX_DIR"

echo "==> Initializing repository..."
git init -b main
git config user.name "Team Developer"
git config user.email "dev@barrackpore-team.in"

echo "==> Setting up baseline commits..."
echo "console.log('v1.0: stable core');" > server.js
git add server.js
git commit -m "feat: stable production release v1.0"

echo "==> Introducing a faulty feature commit..."
echo "console.log('v1.1: flawed discount formula - price is zero!');" >> server.js
git add server.js
git commit -m "feat(billing): apply zero percent emergency discount"
BUGGY_SHA=$(git rev-parse --short HEAD)
echo "Buggy commit SHA: $BUGGY_SHA"

echo "==> Adding another good commit on top..."
echo "console.log('v1.2: header banner updated');" >> server.js
git add server.js
git commit -m "chore(ui): update header announcement"

echo "==> Current commit history:"
git log --oneline

echo "==> REVERTING the buggy commit ($BUGGY_SHA) cleanly..."
git revert --no-edit "$BUGGY_SHA"

echo "==> History after git revert (Notice new inverse commit added!):"
git log --oneline

echo "==> Inspecting server.js content to verify bug is gone:"
cat server.js

rm -rf "$SANDBOX_DIR"
echo "✔ git revert lab completed successfully!"
