#!/usr/bin/env bash
# ==============================================================================
# Script: git_config_hierarchy_lab.sh
# Topic 9: Configuration Scope Hierarchy (System vs Global vs Local vs Worktree)
# Course: Git Mastery Track · Module 001_001
# Educator: Sukanta Hui (Coder & AccoTax, Barrackpore)
# ==============================================================================

set -euo pipefail

echo "======================================================================"
echo "  CODER & ACCOTAX · GIT CONFIGURATION HIERARCHY LAB"
echo "  Testing 4-Tier Scope Resolution: System -> Global -> Local -> Env"
echo "======================================================================"
echo ""

SANDBOX_DIR=$(mktemp -d -t git_lab_hierarchy_XXXXXX)
cd "$SANDBOX_DIR"
echo "[+] Initializing sandbox at: $SANDBOX_DIR"

# ------------------------------------------------------------------------------
# STEP 1: Inspect Global Identity
# ------------------------------------------------------------------------------
echo "--- [Step 1] Global Baseline Scope ---"
git config --global user.name "Sukanta Hui"
git config --global user.email "sukanta@codernaccotax.co.in"
echo "[✓] Global Name:  $(git config --global user.name)"
echo "[✓] Global Email: $(git config --global user.email)"

# ------------------------------------------------------------------------------
# STEP 2: Create Local Repository and Apply Local Override
# ------------------------------------------------------------------------------
echo ""
echo "--- [Step 2] Initializing Repository with Local Override ---"
git init enterprise_portal
cd enterprise_portal
git branch -m main

# Verify inheritance before override
echo "Inherited user.email before local override: $(git config user.email)"

# Set local override
git config --local user.email "sukanta.hui@corporate-client.com"
echo "[✓] Effective user.email after local override: $(git config user.email)"

# ------------------------------------------------------------------------------
# STEP 3: Demonstrate Environment Variable Highest Precedence
# ------------------------------------------------------------------------------
echo ""
echo "--- [Step 3] Environment Variable Precedence Test ---"
echo "Active config email: $(git config user.email)"
echo "Executing commit with GIT_AUTHOR_EMAIL override..."

echo "const version = '2.0.0';" > version.js
git add version.js
GIT_AUTHOR_EMAIL="automated-ci-bot@cloud.com" git commit -m "chore: release 2.0.0"

echo "[✓] Author in committed metadata (overrode local and global configs):"
git log -1 --format="%an <%ae>"

# ------------------------------------------------------------------------------
# STEP 4: Inspect Active Config Origin File Paths
# ------------------------------------------------------------------------------
echo ""
echo "--- [Step 4] Tracing Origins of Active Configuration ---"
git config --list --show-origin | grep -E "user\.(name|email)"

# Cleanup
cd /tmp
rm -rf "$SANDBOX_DIR"
echo ""
echo "======================================================================"
echo "  [SUCCESS] Configuration hierarchy lab completed successfully."
echo "======================================================================"
