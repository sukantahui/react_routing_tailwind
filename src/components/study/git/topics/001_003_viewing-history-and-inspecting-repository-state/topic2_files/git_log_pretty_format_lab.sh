#!/usr/bin/env bash
# ==============================================================================
# Git Lab 001_003_02: Custom Pretty Print & Log Formatting Engine
# Instructor: Sukanta Hui (Coder & AccoTax, Barrackpore)
# Cohort: Debangshu, Swadeep, Sachin, Mahima, Susmita, Abhronila, Tuhina
# ==============================================================================

set -e

echo "--------------------------------------------------------"
echo "Initializing Custom Log Pretty Print Lab..."
echo "--------------------------------------------------------"

LAB_DIR="git_log_pretty_sandbox"
rm -rf "$LAB_DIR"
mkdir -p "$LAB_DIR"
cd "$LAB_DIR"

git init -b main

# Commit 1
git config user.name "Debangshu Technical"
git config user.email "debangshu@barrackpore-devs.org"
echo "console.log('App Core');" > index.js
git add index.js
git commit -m "feat(core): initial application setup"

# Commit 2
GIT_AUTHOR_NAME="Susmita Database" \
GIT_AUTHOR_EMAIL="susmita@barrackpore-devs.org" \
GIT_AUTHOR_DATE="2026-09-12 11:00:00 +0530" \
git commit --allow-empty -m "feat(db): configure postgres connection pooling"

# Commit 3
GIT_AUTHOR_NAME="Swadeep SeniorDev" \
GIT_AUTHOR_EMAIL="swadeep@barrackpore-devs.org" \
GIT_AUTHOR_DATE="2026-09-13 16:45:00 +0530" \
git commit --allow-empty -m "fix(auth): correct jwt token expiration clamp"
git tag -a v1.0.0 -m "Production release 1.0.0"

echo ""
echo "=== 1. Standard Short Date Format ==="
git log --pretty=format:'%h %ad | %s%d [%an]' --date=short

echo ""
echo ""
echo "=== 2. Relative Date Colored Dashboard ==="
git log --pretty=format:'%C(yellow)%h%C(reset) %C(cyan)%ar%C(reset) | %C(green)%s%C(reset) %C(auto)%d%C(reset) [%C(bold blue)%an%C(reset)]'

echo ""
echo ""
echo "=== 3. Exporting to Tab-Separated TSV Audit Report ==="
git log --pretty=format:'%h%x09%an%x09%ae%x09%ad%x09%s' --date=iso > audit_report.tsv
echo "Generated audit_report.tsv successfully:"
cat audit_report.tsv

echo ""
echo "--------------------------------------------------------"
echo "Lab completed successfully!"
echo "--------------------------------------------------------"
