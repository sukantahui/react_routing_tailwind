#!/usr/bin/env bash
# ==============================================================================
# Script: git_installation_verification_lab.sh
# Topic 5: Installing Git on Windows, macOS, and Linux (Environment Verification)
# Course: Git Mastery Track · Module 001_001
# Educator: Sukanta Hui (Coder & AccoTax, Barrackpore)
# ==============================================================================

set -euo pipefail

echo "======================================================================"
echo "  CODER & ACCOTAX · GIT ENVIRONMENT VERIFICATION LAB"
echo "  Testing Git Binary, Environment PATH, and Shell Capabilities"
echo "======================================================================"
echo ""

# ------------------------------------------------------------------------------
# STEP 1: Verify Git Binary & Version
# ------------------------------------------------------------------------------
echo "--- [Step 1] Checking Installed Git Version ---"
if command -v git &> /dev/null; then
    GIT_VER=$(git --version)
    echo "[✓] Found: $GIT_VER"
else
    echo "[!] ERROR: Git binary is not found in system PATH."
    exit 1
fi

# ------------------------------------------------------------------------------
# STEP 2: Verify Binary Location & PATH Priority
# ------------------------------------------------------------------------------
echo ""
echo "--- [Step 2] Locating Git Binary Path ---"
echo "Binary executable path: $(which git)"

# ------------------------------------------------------------------------------
# STEP 3: Detect Operating System Environment
# ------------------------------------------------------------------------------
echo ""
echo "--- [Step 3] Operating System Environment Detection ---"
OS_TYPE="$(uname -s)"
case "${OS_TYPE}" in
    Linux*)     echo "[✓] Environment: Linux POSIX System";;
    Darwin*)    echo "[✓] Environment: Apple macOS";;
    MINGW*|MSYS*|CYGWIN*) echo "[✓] Environment: Windows (Git Bash / MinGW64)";;
    *)          echo "[✓] Environment: Other (${OS_TYPE})";;
esac

# ------------------------------------------------------------------------------
# STEP 4: Test Basic Git Command Execution
# ------------------------------------------------------------------------------
echo ""
echo "--- [Step 4] Testing Core Git Execution Mechanics ---"
SANDBOX=$(mktemp -d -t git_verify_env_XXXXXX)
cd "$SANDBOX"
git init -q test_repo
cd test_repo
echo "Verification Test File" > verify.txt
git add verify.txt
git commit -q -m "test: verification commit"

echo "[✓] Core snapshot committed successfully:"
git log -1 --oneline

# Cleanup
cd /tmp
rm -rf "$SANDBOX"

echo ""
echo "======================================================================"
echo "  [SUCCESS] Git installation and environment verification passed 100%."
echo "======================================================================"
