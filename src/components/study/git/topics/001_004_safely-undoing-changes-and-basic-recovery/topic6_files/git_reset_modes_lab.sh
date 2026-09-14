#!/usr/bin/env bash
# ==============================================================================
# Topic 6 Terminal Lab: Deep Dive into the Three Modes of git reset
# Educator: Sukanta Hui (Coder & AccoTax, Barrackpore)
# ==============================================================================

set -e

SANDBOX_DIR="/tmp/git_reset_modes_lab_$$"
mkdir -p "$SANDBOX_DIR"
cd "$SANDBOX_DIR"

echo "==> Initializing test repository..."
git init -b main
git config user.name "Git Explorer"
git config user.email "explorer@barrackpore-devs.in"

echo "==> Setting up base commit (C0)..."
echo "export const taxRate = 0.18;" > tax.js
git add tax.js
git commit -m "feat(tax): standard 18% GST"

# ------------------------------------------------------------------------------
# Test 1: --soft Reset
# ------------------------------------------------------------------------------
echo "==> Adding commit C1 for --soft test..."
echo "export const cessRate = 0.01;" >> tax.js
git add tax.js
git commit -m "feat(tax): add 1% cess"

echo "==> Executing: git reset --soft HEAD~1"
git reset --soft HEAD~1
echo "Checking status (should be STAGED in green):"
git status --short

# ------------------------------------------------------------------------------
# Test 2: --mixed Reset
# ------------------------------------------------------------------------------
echo "==> Re-committing C1..."
git commit -m "feat(tax): add 1% cess"

echo "==> Executing: git reset --mixed HEAD~1"
git reset --mixed HEAD~1
echo "Checking status (should be UNSTAGED in red):"
git status --short

# ------------------------------------------------------------------------------
# Test 3: --hard Reset
# ------------------------------------------------------------------------------
echo "==> Re-committing C1..."
git add tax.js
git commit -m "feat(tax): add 1% cess"

echo "==> Executing: git reset --hard HEAD~1"
git reset --hard HEAD~1
echo "Checking status (should be clean):"
git status
echo "Contents of tax.js (should only have base 18% GST):"
cat tax.js

# Cleanup
rm -rf "$SANDBOX_DIR"
echo "✔ All three reset modes verified successfully!"
