#!/usr/bin/env bash
# ==============================================================================
# Git Lab 001_003_04: Filtering Commit Messages with git log --grep
# Instructor: Sukanta Hui (Coder & AccoTax, Barrackpore)
# Cohort: Debangshu, Swadeep, Sachin, Mahima, Susmita, Abhronila, Tuhina
# ==============================================================================

set -e

echo "--------------------------------------------------------"
echo "Initializing Git Log Grep Lab..."
echo "--------------------------------------------------------"

LAB_DIR="git_log_grep_sandbox"
rm -rf "$LAB_DIR"
mkdir -p "$LAB_DIR"
cd "$LAB_DIR"

git init -b main

git config user.name "Sukanta Hui"
git config user.email "sukanta@barrackpore-devs.org"

# Commit 1
echo "const PORT = 8080;" > server.js
git add server.js
git commit -m "feat(server): initialize HTTP server on port 8080"

# Commit 2
echo "// JIRA-101: Tax Calculation" >> server.js
git add server.js
git commit -m "feat(tax): implement 18% standard GST helper [JIRA-101]"

# Commit 3
echo "// Security Middleware" >> server.js
git add server.js
git commit -m "fix(security): prevent header injection in auth tokens [JIRA-102]"

# Commit 4
echo "// Discount Engine" >> server.js
git add server.js
git commit -m "feat(discount): add festive promo coupon discount logic"

# Commit 5
echo "// Refactoring" >> server.js
git add server.js
git commit -m "refactor(core): cleanup unused imports and formatting"

echo ""
echo "=== 1. Searching for Ticket JIRA-102 ==="
git log --grep="JIRA-102" --oneline

echo ""
echo "=== 2. Searching for 'discount' or 'tax' (OR logic) ==="
git log --grep="discount" --grep="tax" -i --oneline

echo ""
echo "=== 3. Searching with Conventional Commits regex '^fix' ==="
git log --grep="^fix" --oneline

echo ""
echo "=== 4. Inverted grep (Exclude refactors) ==="
git log --invert-grep --grep="refactor" --oneline

echo ""
echo "--------------------------------------------------------"
echo "Lab completed successfully!"
echo "--------------------------------------------------------"
