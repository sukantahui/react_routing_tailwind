#!/usr/bin/env bash
# ==============================================================================
# LAB SCRIPT: git init vs git clone Laboratory
# MODULE: 001_002_git-three-tree-architecture-and-basic-workflow (Topic 2)
# EDUCATOR: Sukanta Hui (Barrackpore - Coder & AccoTax)
# ==============================================================================

set -e

SANDBOX_DIR="./sandbox_init_vs_clone"
rm -rf "$SANDBOX_DIR"
mkdir -p "$SANDBOX_DIR"
cd "$SANDBOX_DIR"

echo "=== PART 1: 'git init' WORKFLOW (Local Genesis) ==="
mkdir local-project
cd local-project
git init
echo "# Local Project Created from Scratch" > README.md
git add README.md
git commit -m "feat: initial commit for local project"

echo "Listing local project commit log:"
git log --oneline

echo "Checking configured remotes (expecting none):"
git remote -v || echo "No remotes configured."
cd ..

echo ""
echo "=== PART 2: 'git clone' WORKFLOW (Local Offline Cloning) ==="
# We can clone directly from our local repository path!
git clone ./local-project ./cloned-project

cd cloned-project
echo "Inspecting cloned repository commit log:"
git log --oneline

echo "Checking auto-configured remotes in clone:"
git remote -v

echo ""
echo "=== CLEANING UP SANDBOX ==="
cd ..
rm -rf "$SANDBOX_DIR"
echo "Lab completed successfully!"
