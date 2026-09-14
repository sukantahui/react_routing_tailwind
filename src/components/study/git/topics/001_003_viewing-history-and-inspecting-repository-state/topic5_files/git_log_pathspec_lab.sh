#!/usr/bin/env bash
# ==============================================================================
# Git Lab 001_003_05: Path-Specific History (git log -- <path>)
# Instructor: Sukanta Hui (Coder & AccoTax, Barrackpore)
# Cohort: Debangshu, Swadeep, Sachin, Mahima, Susmita, Abhronila, Tuhina
# ==============================================================================

set -e

echo "--------------------------------------------------------"
echo "Initializing Path-Specific Git History Lab..."
echo "--------------------------------------------------------"

LAB_DIR="git_pathspec_history_sandbox"
rm -rf "$LAB_DIR"
mkdir -p "$LAB_DIR"
cd "$LAB_DIR"

git init -b main

git config user.name "Sukanta Hui"
git config user.email "sukanta@barrackpore-devs.org"

mkdir -p src/tax src/auth config

# Commit 1
echo "const GST_RATE = 0.18;" > src/tax/gst_calculator.js
git add src/tax/gst_calculator.js
git commit -m "feat(tax): initialize GST calculator with 18% base rate"

# Commit 2 (unrelated file)
echo "const JWT_SECRET = 'secret_key';" > src/auth/auth_service.js
git add src/auth/auth_service.js
git commit -m "feat(auth): configure JWT authentication service"

# Commit 3 (modifies GST calculator)
echo "function calculateGST(amt) { return amt * 0.18; }" >> src/tax/gst_calculator.js
git add src/tax/gst_calculator.js
git commit -m "feat(tax): export calculateGST calculation function"

# Commit 4 (modifies config)
echo "{\"db\": \"postgres\"}" > config/db.json
git add config/db.json
git commit -m "feat(config): add database configuration"

echo ""
echo "=== 1. Total Commits Across All Files (Unfiltered) ==="
git log --oneline

echo ""
echo "=== 2. Path-Specific Commits for src/tax/gst_calculator.js Only ==="
git log --oneline -- src/tax/gst_calculator.js

echo ""
echo "=== 3. Path-Specific History for entire src/tax/ Directory ==="
git log --oneline -- src/tax/

echo ""
echo "=== 4. Detailed Inline Patch Diffs for GST Calculator ==="
git log -p -2 -- src/tax/gst_calculator.js

echo ""
echo "--------------------------------------------------------"
echo "Lab completed successfully!"
echo "--------------------------------------------------------"
