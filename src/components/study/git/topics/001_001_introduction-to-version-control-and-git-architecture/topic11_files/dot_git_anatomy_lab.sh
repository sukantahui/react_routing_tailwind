#!/usr/bin/env bash
# ==============================================================================
# LAB SCRIPT: Anatomy of the .git Directory
# MODULE: 001_001_introduction-to-version-control-and-git-architecture (Topic 11)
# EDUCATOR: Sukanta Hui (Barrackpore - Coder & AccoTax)
# ==============================================================================

set -e

SANDBOX_DIR="./sandbox_dot_git_anatomy"
rm -rf "$SANDBOX_DIR"
mkdir -p "$SANDBOX_DIR"
cd "$SANDBOX_DIR"

echo "=== STEP 1: INITIALIZING FRESH REPOSITORY & INSPECTING .git ==="
git init
echo ""
echo "=== DIRECTORY TREE OF FRESH .git FOLDER ==="
ls -la .git/

echo ""
echo "=== STEP 2: INSPECTING HEAD ==="
echo -n "Contents of .git/HEAD: "
cat .git/HEAD

echo ""
echo "=== STEP 3: CREATING FIRST FILE & OBSERVING OBJECT CREATION ==="
echo "Hello Git Internals!" > welcome.txt
git add welcome.txt

echo "Files staged in .git/index:"
git ls-files --stage

echo ""
echo "Objects created inside .git/objects/ after staging:"
find .git/objects -type f

echo ""
echo "=== STEP 4: COMMITTING AND INSPECTING REFS & OBJECT DATABASE ==="
git commit -m "feat: initial commit for internals demo"

echo "Current HEAD pointer:"
cat .git/HEAD

echo "Active branch ref:"
cat .git/refs/heads/*

echo ""
echo "Inspecting the latest commit object with git cat-file:"
LATEST_COMMIT=$(cat .git/refs/heads/*)
echo "Commit Hash: $LATEST_COMMIT"
git cat-file -p "$LATEST_COMMIT"

echo ""
echo "=== STEP 5: CLEANING UP SANDBOX ==="
cd ..
rm -rf "$SANDBOX_DIR"
echo "Sandbox cleared successfully. Lab complete!"
