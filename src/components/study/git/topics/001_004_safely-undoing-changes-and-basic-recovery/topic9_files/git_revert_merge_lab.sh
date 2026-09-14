#!/usr/bin/env bash
# ==============================================================================
# Topic 9 Terminal Lab: Reverting Merge Commits & The Re-Merge Trap
# Educator: Sukanta Hui (Coder & AccoTax, Barrackpore)
# ==============================================================================

set -e

SANDBOX_DIR="/tmp/git_merge_revert_lab_$$"
mkdir -p "$SANDBOX_DIR"
cd "$SANDBOX_DIR"

echo "==> Initializing repository..."
git init -b main
git config user.name "Merge Specialist"
git config user.email "specialist@barrackpore-devs.in"

echo "==> Setting up base main branch commit..."
echo "console.log('base v1.0');" > app.js
git add app.js
git commit -m "feat: base app release"

echo "==> Creating and developing on feature-billing branch..."
git switch -c feature-billing
echo "console.log('billing calculation v1.0');" >> app.js
git commit -am "feat(billing): add invoicing"
echo "console.log('billing discounts v1.0 (WITH BUG!)');" >> app.js
git commit -am "feat(billing): add buggy discount calculation"

echo "==> Switching to main and performing a 3-way merge commit..."
git switch main
git merge --no-ff feature-billing -m "Merge branch 'feature-billing' into main"
MERGE_SHA=$(git rev-parse --short HEAD)
echo "Merge commit created: $MERGE_SHA"

echo "==> Inspecting merge commit parents..."
git show "$MERGE_SHA" --stat

echo "==> REVERTING the merge commit with -m 1 (Preserving main)..."
git revert -m 1 --no-edit "$MERGE_SHA"
REVERT_SHA=$(git rev-parse --short HEAD)
echo "Revert commit created: $REVERT_SHA"

echo "==> Verifying app.js (billing code is cleanly removed):"
cat app.js

echo "==> RE-REVERT DEMO: Bringing the feature back..."
git revert --no-edit "$REVERT_SHA"
echo "Verifying app.js (billing code is restored!):"
cat app.js

rm -rf "$SANDBOX_DIR"
echo "✔ Merge commit revert and re-revert verified successfully!"
