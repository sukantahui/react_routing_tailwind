#!/usr/bin/env bash
# ==============================================================================
# Git Lab 001_003_00: Deep Dive into git log & Commit Metadata
# Instructor: Sukanta Hui (Coder & AccoTax, Barrackpore)
# Cohort: Debangshu, Swadeep, Sachin, Mahima, Susmita, Abhronila, Tuhina
# ==============================================================================

set -e

echo "--------------------------------------------------------"
echo "Initializing Git Log Deep Dive Lab..."
echo "--------------------------------------------------------"

LAB_DIR="git_log_deep_dive_sandbox"
rm -rf "$LAB_DIR"
mkdir -p "$LAB_DIR"
cd "$LAB_DIR"

git init -b main

# Configure Author
git config user.name "Debangshu Technical"
git config user.email "debangshu@barrackpore-devs.org"

# Commit 1: Genesis commit
echo "# Barrackpore Billing Engine" > README.md
git add README.md
git commit -m "feat(core): initial repository setup for billing engine"

# Commit 2: Added tax calculator
cat << 'EOF' > tax_calc.js
// GST & Service Tax Calculator - Coder & AccoTax
function calculateGST(amount, ratePercent) {
  if (typeof amount !== 'number' || amount <= 0) return 0;
  return amount * (ratePercent / 100);
}
module.exports = { calculateGST };
EOF
git add tax_calc.js
git commit -m "feat(tax): implement 18% standard GST calculation helper"

# Commit 3: Modified by another author using GIT_AUTHOR_* overrides to simulate multi-author team
GIT_AUTHOR_NAME="Swadeep SeniorDev" \
GIT_AUTHOR_EMAIL="swadeep@barrackpore-devs.org" \
GIT_AUTHOR_DATE="2026-09-10 14:30:00 +0530" \
git commit --allow-empty -m "docs(api): add Swadeep's architectural signoff"

echo ""
echo "=== Step 1: Default git log ==="
git log

echo ""
echo "=== Step 2: Full raw commit metadata with author and committer ==="
git log --format=fuller

echo ""
echo "=== Step 3: Verifying the latest commit object directly via cat-file ==="
LATEST_COMMIT=$(git rev-parse HEAD)
echo "Latest Commit Hash: $LATEST_COMMIT"
git cat-file -p "$LATEST_COMMIT"

echo ""
echo "--------------------------------------------------------"
echo "Lab completed successfully! Explore the output above."
echo "--------------------------------------------------------"
