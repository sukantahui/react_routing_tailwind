#!/usr/bin/env bash
# ==============================================================================
# LAB SCRIPT: Complete Environment Setup & Verification Script
# MODULE: 001_001_introduction-to-version-control-and-git-architecture (Topic 13)
# EDUCATOR: Sukanta Hui (Barrackpore - Coder & AccoTax)
# ==============================================================================

set -e

echo "=== GIT DEVELOPER ENVIRONMENT CONFIGURATION & AUDIT ==="

echo "Step 1: Checking Git Executable Binary..."
if command -v git >/dev/null 2>&1; then
    echo "  [OK] Git is installed at: $(command -v git)"
    echo "  [OK] Git Version: $(git --version)"
else
    echo "  [ERROR] Git binary not found in PATH!"
    exit 1
fi

echo ""
echo "Step 2: Checking Global Author Identity..."
CURRENT_NAME=$(git config --global user.name || echo "")
CURRENT_EMAIL=$(git config --global user.email || echo "")

if [ -z "$CURRENT_NAME" ]; then
    echo "  [WARN] Global user.name is not set. Setting default demo identity..."
    git config --global user.name "Sukanta Hui (Dev)"
fi

if [ -z "$CURRENT_EMAIL" ]; then
    echo "  [WARN] Global user.email is not set. Setting default demo identity..."
    git config --global user.email "sukanta.developer@example.com"
fi

echo "  -> Active user.name:  $(git config --global user.name)"
echo "  -> Active user.email: $(git config --global user.email)"

echo ""
echo "Step 3: Setting Modern Default Initial Branch to 'main'..."
git config --global init.defaultBranch main
echo "  -> init.defaultBranch: $(git config --global init.defaultBranch)"

echo ""
echo "Step 4: Standardizing Cross-Platform Line Endings..."
OS_NAME=$(uname -s)
if [[ "$OS_NAME" =~ "MINGW"|"MSYS"|"CYGWIN"|"Windows_NT" ]]; then
    echo "  -> Detected Windows OS. Setting core.autocrlf = true"
    git config --global core.autocrlf true
else
    echo "  -> Detected Unix/macOS. Setting core.autocrlf = input"
    git config --global core.autocrlf input
fi
echo "  -> core.autocrlf: $(git config --global core.autocrlf)"

echo ""
echo "Step 5: Configuring UI Colorization & Default Editor..."
git config --global color.ui auto
git config --global pull.rebase false
echo "  -> color.ui: $(git config --global color.ui)"
echo "  -> pull.rebase: $(git config --global pull.rebase)"

echo ""
echo "Step 6: Setting High-Yield Developer Aliases..."
git config --global alias.st status
git config --global alias.br branch
git config --global alias.ci commit
git config --global alias.lg "log --oneline --graph --all --decorate"
echo "  -> Created aliases: git st, git br, git ci, git lg"

echo ""
echo "Step 7: Final Active Configuration Audit with Origins..."
git config --list --show-origin | grep -E "user\.|init\.|core\.|color\.|alias\."

echo ""
echo "=== ENVIRONMENT SETUP & VERIFICATION COMPLETED SUCCESSFULLY ==="
