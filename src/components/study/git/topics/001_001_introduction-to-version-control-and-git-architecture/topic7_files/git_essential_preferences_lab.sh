#!/usr/bin/env bash
# ==============================================================================
# Script: git_essential_preferences_lab.sh
# Topic 7: Configuring Essential Preferences (core.editor, init.defaultBranch, color.ui)
# Course: Git Mastery Track · Module 001_001
# Educator: Sukanta Hui (Coder & AccoTax, Barrackpore)
# ==============================================================================

set -euo pipefail

echo "======================================================================"
echo "  CODER & ACCOTAX · GIT ESSENTIAL PREFERENCES LAB"
echo "  Configuring defaultBranch, editor, color.ui, and aliases"
echo "======================================================================"
echo ""

SANDBOX_DIR=$(mktemp -d -t git_lab_prefs_XXXXXX)
cd "$SANDBOX_DIR"
echo "[+] Initializing sandbox at: $SANDBOX_DIR"

# ------------------------------------------------------------------------------
# STEP 1: Verify Default Branch Configuration
# ------------------------------------------------------------------------------
echo "--- [Step 1] Configuring init.defaultBranch ---"
git config --global init.defaultBranch main
echo "[✓] Global init.defaultBranch is set to: $(git config --global init.defaultBranch)"

# ------------------------------------------------------------------------------
# STEP 2: Verify Initialized Repository Branch Name
# ------------------------------------------------------------------------------
echo ""
echo "--- [Step 2] Initializing Repo to Verify Default Branch 'main' ---"
git init test_main_repo
cd test_main_repo
echo "Testing Default Branch" > test.txt
git add test.txt
git commit -m "feat: initial commit on default branch"

ACTIVE_BRANCH=$(git branch --show-current)
echo "[✓] Active branch immediately upon initialization: '$ACTIVE_BRANCH'"

# ------------------------------------------------------------------------------
# STEP 3: Configure Developer Productivity Aliases
# ------------------------------------------------------------------------------
echo ""
echo "--- [Step 3] Setting and Testing Productivity Aliases ---"
git config --local alias.st status
git config --local alias.lg "log --graph --oneline --all"

echo "Testing alias 'git st':"
git st

echo ""
echo "Testing alias 'git lg':"
git lg

# Cleanup
cd /tmp
rm -rf "$SANDBOX_DIR"
echo ""
echo "======================================================================"
echo "  [SUCCESS] Essential preferences lab completed successfully."
echo "======================================================================"
