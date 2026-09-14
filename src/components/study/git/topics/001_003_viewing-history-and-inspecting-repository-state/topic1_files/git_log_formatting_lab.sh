#!/usr/bin/env bash
# ==============================================================================
# Git Lab 001_003_01: Formatting Log Output with --oneline, --decorate, --graph --all
# Instructor: Sukanta Hui (Coder & AccoTax, Barrackpore)
# Cohort: Debangshu, Swadeep, Sachin, Mahima, Susmita, Abhronila, Tuhina
# ==============================================================================

set -e

echo "--------------------------------------------------------"
echo "Initializing Git Log Formatting & Graph Lab..."
echo "--------------------------------------------------------"

LAB_DIR="git_log_formatting_sandbox"
rm -rf "$LAB_DIR"
mkdir -p "$LAB_DIR"
cd "$LAB_DIR"

git init -b main

git config user.name "Sukanta Hui"
git config user.email "sukanta@barrackpore-devs.org"

# Commit 1 on main
echo "# Barrackpore FinTech Project" > README.md
git add README.md
git commit -m "feat(core): initial repository setup"

# Commit 2 on main
echo "const APP_NAME = 'AccoTax Billing';" > app.js
git add app.js
git commit -m "feat(core): setup base application entrypoint"
git tag -a v1.0.0 -m "Release version 1.0.0"

# Create feature branch 1: feature/discount
git checkout -b feature/discount
echo "function calculateDiscount(rate) { return rate * 0.1; }" > discount.js
git add discount.js
git commit -m "feat(discount): add festive promo coupon calculator"

echo "function getDiscountTier() { return 'VIP'; }" >> discount.js
git add discount.js
git commit -m "feat(discount): support VIP tier discount overrides"

# Switch back to main and make parallel commits
git checkout main
echo "const GST_RATE = 0.18;" >> app.js
git add app.js
git commit -m "feat(tax): configure standard 18% GST constant"

# Merge feature/discount into main with merge commit
git merge --no-ff feature/discount -m "merge: integrate feature/discount into main"

# Create another branch not yet merged: feature/audit
git checkout -b feature/audit
echo "// Audit logs engine" > audit.js
git add audit.js
git commit -m "feat(audit): initialize compliance audit logging"

# Switch back to main
git checkout main

echo ""
echo "=== Step 1: Standard git log (Current Branch Only) ==="
git log --oneline

echo ""
echo "=== Step 2: Decorated Log Output (Showing Refs & Tags) ==="
git log --oneline --decorate

echo ""
echo "=== Step 3: Graphical Log Across ALL Branches ==="
git log --graph --oneline --decorate --all

echo ""
echo "=== Step 4: Configuring Global Alias 'git lg' ==="
git config --local alias.lg "log --graph --oneline --decorate --all"
echo "Testing local alias: git lg"
git lg

echo ""
echo "--------------------------------------------------------"
echo "Lab completed successfully! Graph topology created."
echo "--------------------------------------------------------"
