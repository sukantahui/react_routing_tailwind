#!/usr/bin/env bash
# ==============================================================================
# LAB DRILL: THE DETACHED HEAD STATE (TRIGGERS & INSPECTION)
# Instructor: Sukanta Hui (Coder & AccoTax, Barrackpore)
# ==============================================================================

set -e
echo "=== Step 1: Initializing Detached HEAD Sandbox ==="
SANDBOX_DIR="detached_head_sandbox"
rm -rf "$SANDBOX_DIR"
mkdir "$SANDBOX_DIR"
cd "$SANDBOX_DIR"

git init
git config user.name "Mahima Ghosh"
git config user.email "mahima.barrackpore@example.com"

echo "=== Step 2: Creating 3 Baseline Commits ==="
echo "AccoTax v1: Initial setup" > app.js
git add app.js && git commit -m "Commit C1: init app"

echo "AccoTax v2: Added GST 18%" >> app.js
git commit -am "Commit C2: add GST calc"
C2_SHA=$(git rev-parse HEAD)

echo "AccoTax v3: Added Discount Module" >> app.js
git commit -am "Commit C3: add discount"

echo "=== Step 3: Trigger 1 - Checking out a historical commit SHA ==="
git checkout "$C2_SHA"

echo "Reading .git/HEAD in detached state:"
cat .git/HEAD

echo "Checking status:"
git status

echo "=== Step 4: Tagging and checking out a Tag ==="
git switch main
git tag v1.0.0
git checkout v1.0.0

echo "Reading .git/HEAD on Tag checkout:"
cat .git/HEAD

echo "=== Step 5: Modern command with git switch --detach ==="
git switch --detach "$C2_SHA"
echo "Content of .git/HEAD:"
cat .git/HEAD

echo "=== Step 6: Returning safely to main ==="
git switch main
echo "Content of .git/HEAD after returning:"
cat .git/HEAD

echo "=== Lab Completed Successfully! ==="
