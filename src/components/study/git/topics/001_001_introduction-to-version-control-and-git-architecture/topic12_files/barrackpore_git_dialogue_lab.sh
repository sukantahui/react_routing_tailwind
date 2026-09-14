#!/usr/bin/env bash
# ==============================================================================
# LAB SCRIPT: Classroom Dialogue Lab - Git Simulation
# MODULE: 001_001_introduction-to-version-control-and-git-architecture (Topic 12)
# EDUCATOR: Sukanta Hui (Barrackpore - Coder & AccoTax)
# ==============================================================================

set -e

SANDBOX_DIR="./sandbox_barrackpore_dialogue"
rm -rf "$SANDBOX_DIR"
mkdir -p "$SANDBOX_DIR"
cd "$SANDBOX_DIR"

echo "=== BARRACKPORE GIT LAB SIMULATION ==="
echo "Initializing lab repository..."
git init

echo ""
echo "Simulating Sukanta Sir's First Atomic Commit..."
echo "console.log('Welcome to Barrackpore Software Development Lab');" > main.js
git add main.js
git commit -m "feat: initial commit for student mentorship lab"

echo ""
echo "Simulating Sachin's Feature Branch..."
git branch feature-auth
git switch feature-auth
echo "function authenticateUser() { return true; }" >> main.js
git commit -am "feat(auth): add user authentication handler"

echo ""
echo "Simulating Susmita's Independent Branch..."
git switch main
git switch -c feature-ui
echo "const renderHeader = () => '<h1>Barrackpore Portal</h1>';" >> ui.js
git add ui.js
git commit -m "feat(ui): add header rendering component"

echo ""
echo "Viewing Full Multi-Branch History Graph:"
git log --all --graph --oneline --decorate

echo ""
echo "=== SIMULATION COMPLETE: CLEANING UP ==="
cd ..
rm -rf "$SANDBOX_DIR"
echo "Sandbox cleared successfully."
