#!/usr/bin/env bash
# ==============================================================================
# LAB SCRIPT: Git's Three-Tree Architecture Laboratory
# MODULE: 001_002_git-three-tree-architecture-and-basic-workflow (Topic 0)
# EDUCATOR: Sukanta Hui (Barrackpore - Coder & AccoTax)
# ==============================================================================

set -e

SANDBOX_DIR="./sandbox_three_trees_lab"
rm -rf "$SANDBOX_DIR"
mkdir -p "$SANDBOX_DIR"
cd "$SANDBOX_DIR"

echo "=== GIT THREE-TREE ARCHITECTURE LAB ==="
echo "Step 1: Initializing fresh sandbox repository..."
git init

echo ""
echo "Step 2: Tree 1 (Working Tree) -> Creating a new file..."
echo "const cart = [];" > cart.js
echo "Status after creating cart.js on disk (Untracked in Working Tree):"
git status -s

echo ""
echo "Step 3: Tree 2 (Staging Index) -> Staging the file with git add..."
git add cart.js
echo "Status after git add (Staged in .git/index):"
git status -s
echo "Inspecting binary index cache directly:"
git ls-files --stage

echo ""
echo "Step 4: Modifying the file AGAIN on disk before committing..."
echo "cart.push({ item: 'Laptop', price: 65000 });" >> cart.js
echo "Status after second modification (Dual State: Staged + Unstaged):"
git status -s

echo ""
echo "Viewing diff between Working Tree and Staging Area (git diff):"
git diff

echo ""
echo "Viewing diff between Staging Area and HEAD (git diff --staged):"
git diff --staged

echo ""
echo "Step 5: Tree 3 (HEAD Repository) -> Committing the staged version..."
git commit -m "feat(cart): initialize empty shopping cart array"

echo ""
echo "Status after commit (Only second modification remains in Working Tree):"
git status -s

echo ""
echo "Step 6: Staging and committing the second change..."
git add cart.js
git commit -m "feat(cart): add initial laptop item to cart"

echo ""
echo "Final commit log showing atomic commit history:"
git log --oneline

echo ""
echo "=== CLEANING UP SANDBOX ==="
cd ..
rm -rf "$SANDBOX_DIR"
echo "Lab complete. Sandbox cleaned!"
