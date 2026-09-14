#!/usr/bin/env bash
# ==============================================================================
# Topic 0 Terminal Lab: Demystifying Git Branch Pointers (41-Byte Ref Files)
# Educator: Sukanta Hui (Coder & AccoTax, Barrackpore)
# ==============================================================================

set -e

SANDBOX_DIR="/tmp/git_branch_pointer_lab_$$"
mkdir -p "$SANDBOX_DIR"
cd "$SANDBOX_DIR"

echo "==> Initializing test repository..."
git init -b main
git config user.name "Branch Explorer"
git config user.email "explorer@barrackpore-devs.in"

echo "console.log('v1.0 baseline');" > app.js
git add app.js
git commit -m "feat: initial commit"
MAIN_COMMIT_SHA=$(git rev-parse HEAD)

echo "==> Inspecting .git/refs/heads/main on the filesystem:"
cat .git/refs/heads/main
FILE_SIZE=$(wc -c < .git/refs/heads/main | tr -d ' ')
echo "File size of .git/refs/heads/main is: $FILE_SIZE bytes (40-char SHA + newline)"

echo "==> Creating a new branch named 'feature-billing'..."
git branch feature-billing

echo "==> Inspecting .git/refs/heads/ (both pointers exist now):"
ls -la .git/refs/heads/

echo "==> Content of .git/refs/heads/feature-billing:"
cat .git/refs/heads/feature-billing

echo "==> Confirming both branch files point to the exact same SHA:"
if [ "$(cat .git/refs/heads/main)" == "$(cat .git/refs/heads/feature-billing)" ]; then
  echo "✔ Both branches point to $MAIN_COMMIT_SHA (Zero duplication of code files!)"
fi

rm -rf "$SANDBOX_DIR"
echo "✔ Branch pointer lab completed successfully!"
