#!/usr/bin/env bash
# ==============================================================================
# LAB SCRIPT: Inspecting Active Configuration: git config --list --show-origin
# MODULE: 001_001_introduction-to-version-control-and-git-architecture (Topic 10)
# EDUCATOR: Sukanta Hui (Barrackpore - Coder & AccoTax)
# ==============================================================================

set -e

echo "=== GIT CONFIGURATION ORIGIN INSPECTION LAB ==="
echo "Step 1: Inspecting all active configuration settings with origin files..."
git config --list --show-origin

echo ""
echo "Step 2: Checking active user identity resolution..."
echo -n "Active user.name:  "
git config user.name || echo "[Not Set]"
echo -n "Active user.email: "
git config user.email || echo "[Not Set]"

echo ""
echo "Step 3: Checking exact origin file of user identity..."
git config --show-origin user.name || echo "user.name origin not found"
git config --show-origin user.email || echo "user.email origin not found"

echo ""
echo "Step 4: Checking essential workflow configurations..."
echo -n "Default Branch: "
git config --show-origin init.defaultBranch || echo "init.defaultBranch not set"
echo -n "Line Endings:   "
git config --show-origin core.autocrlf || echo "core.autocrlf not set"
echo -n "Default Editor: "
git config --show-origin core.editor || echo "core.editor not set"

echo ""
echo "Step 5: Testing dynamic configuration lookup with regex..."
git config --get-regexp "^core\." || echo "No core settings matching"

echo ""
echo "=== CONFIGURATION AUDIT COMPLETE ==="
