#!/usr/bin/env bash
# ==============================================================================
# Topic 4 Terminal Lab: Understanding Commit Rewriting Risks & Remote Divergence
# Educator: Sukanta Hui (Coder & AccoTax, Barrackpore)
# ==============================================================================

set -e

# Step 1: Create a sandbox remote and local repos
SANDBOX_DIR="/tmp/git_divergence_lab_$$"
mkdir -p "$SANDBOX_DIR/remote.git" "$SANDBOX_DIR/dev_alice" "$SANDBOX_DIR/dev_bob"

echo "==> Initializing bare remote repository..."
git init --bare "$SANDBOX_DIR/remote.git"

echo "==> Setting up Alice's repository..."
cd "$SANDBOX_DIR/dev_alice"
git init -b main
git config user.name "Alice Sharma"
git config user.email "alice@barrackpore-devs.in"
git remote add origin "$SANDBOX_DIR/remote.git"

echo "initial code" > app.js
git add app.js
git commit -m "feat: initial commit"
git push -u origin main

echo "==> Setting up Bob's repository by cloning..."
cd "$SANDBOX_DIR/dev_bob"
git clone "$SANDBOX_DIR/remote.git" .
git config user.name "Bob Ghosh"
git config user.email "bob@barrackpore-devs.in"

echo "==> Alice makes commit C1 and pushes..."
cd "$SANDBOX_DIR/dev_alice"
echo "console.log('tax module v1');" >> app.js
git add app.js
git commit -m "feat(tax): initial calculation"
git push origin main
ALICE_ORIGINAL_SHA=$(git rev-parse --short HEAD)
echo "Alice pushed commit: $ALICE_ORIGINAL_SHA"

echo "==> Bob pulls Alice's commit..."
cd "$SANDBOX_DIR/dev_bob"
git pull origin main
echo "Bob is now at commit: $(git rev-parse --short HEAD)"

echo "==> DANGER DEMO: Alice amends the pushed commit locally..."
cd "$SANDBOX_DIR/dev_alice"
echo "console.log('tax module v1.1 patched');" >> app.js
git add app.js
git commit --amend -m "feat(tax): refined calculation formula"
ALICE_AMENDED_SHA=$(git rev-parse --short HEAD)
echo "Alice's new amended commit: $ALICE_AMENDED_SHA (different SHA!)"

echo "==> Alice attempts normal git push (This will fail!)..."
set +e
git push origin main 2>&1
PUSH_STATUS=$?
set -e

if [ $PUSH_STATUS -ne 0 ]; then
  echo "✔ Successfully observed Git preventing non-fast-forward push!"
fi

echo "==> Alice checks git status against remote..."
git fetch origin
git status

echo "==> Cleanup complete. Sandbox: $SANDBOX_DIR"
rm -rf "$SANDBOX_DIR"
echo "✔ Lab completed successfully!"
