#!/usr/bin/env bash
# ==============================================================================
# Git Lab 001_003_08: Comparing Revisions with git diff
# Instructor: Sukanta Hui (Coder & AccoTax, Barrackpore)
# Cohort: Debangshu, Swadeep, Sachin, Mahima, Susmita, Abhronila, Tuhina
# ==============================================================================

set -e

echo "--------------------------------------------------------"
echo "Initializing Git Diff Revisions Sandbox..."
echo "--------------------------------------------------------"

LAB_DIR="git_diff_revisions_sandbox"
rm -rf "$LAB_DIR"
mkdir -p "$LAB_DIR"
cd "$LAB_DIR"

git init -b main

git config user.name "Sukanta Hui"
git config user.email "sukanta@barrackpore-devs.org"

# Commit 1 (Genesis)
cat << 'EOF' > billing.js
function calculateTotal(subtotal) {
  const tax = subtotal * 0.05;
  return subtotal + tax;
}
EOF
git add billing.js
git commit -m "feat(billing): initial 5% tax calculator"
git tag v1.0.0

# Create feature branch: feature/tax-reform
git checkout -b feature/tax-reform
cat << 'EOF' > billing.js
function calculateTotal(subtotal) {
  const gst = subtotal * 0.18;
  const cess = subtotal * 0.01;
  return subtotal + gst + cess;
}
EOF
git add billing.js
git commit -m "feat(tax): upgrade to 18% GST + 1% Cess"

# Switch back to main
git checkout main

# Edit file in working tree without staging (Unstaged diff)
echo "// Unstaged comment in working directory" >> billing.js

echo ""
echo "=== 1. Unstaged Changes (Working Tree vs. Staging Area) ==="
git diff

# Stage the file
git add billing.js

# Edit again without staging (Now we have BOTH staged and unstaged changes)
echo "// Second unstaged edit" >> billing.js

echo ""
echo "=== 2. Staged Changes (Staging Area vs. HEAD) ==="
git diff --staged

echo ""
echo "=== 3. Working Tree vs. HEAD (Bypassing Index) ==="
git diff HEAD

echo ""
echo "=== 4. Comparing Two Branches (main vs. feature/tax-reform) ==="
git diff main feature/tax-reform

echo ""
echo "--------------------------------------------------------"
echo "Lab completed successfully!"
echo "--------------------------------------------------------"
