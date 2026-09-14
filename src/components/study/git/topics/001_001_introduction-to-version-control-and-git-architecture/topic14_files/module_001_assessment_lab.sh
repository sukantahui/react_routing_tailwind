#!/usr/bin/env bash
# ==============================================================================
# LAB SCRIPT: Module 001_001 Self-Assessment Verification Script
# MODULE: 001_001_introduction-to-version-control-and-git-architecture (Topic 14)
# EDUCATOR: Sukanta Hui (Barrackpore - Coder & AccoTax)
# ==============================================================================

set -e

echo "=== MODULE 001_001 GRADUATION AUDIT ==="
echo ""
echo "Evaluating Core Competency Checks:"

echo -n "Check 1: Git CLI Installed: "
if command -v git >/dev/null 2>&1; then
    echo "PASSED ($(git --version))"
else
    echo "FAILED"
    exit 1
fi

echo -n "Check 2: Global user.name configured: "
if [ -n "$(git config --global user.name)" ]; then
    echo "PASSED ($(git config --global user.name))"
else
    echo "WARNING: Not configured"
fi

echo -n "Check 3: Global user.email configured: "
if [ -n "$(git config --global user.email)" ]; then
    echo "PASSED ($(git config --global user.email))"
else
    echo "WARNING: Not configured"
fi

echo -n "Check 4: init.defaultBranch standard: "
if [ "$(git config --global init.defaultBranch)" == "main" ]; then
    echo "PASSED (main)"
else
    echo "INFO: $(git config --global init.defaultBranch || echo 'default/unset')"
fi

echo -n "Check 5: Line ending autocrlf policy: "
echo "PASSED ($(git config --global core.autocrlf || echo 'unset'))"

echo ""
echo "=== MODULE 001_001 AUDIT COMPLETED ==="
