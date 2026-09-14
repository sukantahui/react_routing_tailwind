#!/usr/bin/env bash
# ==============================================================================
# LAB DRILL: FAST-FORWARD MERGE MECHANICS & --ff-only FLAG
# Instructor: Sukanta Hui (Coder & AccoTax, Barrackpore)
# ==============================================================================

set -e
echo "=== Step 1: Initializing Fast-Forward Sandbox ==="
SANDBOX_DIR="fast_forward_sandbox"
rm -rf "$SANDBOX_DIR"
mkdir "$SANDBOX_DIR"
cd "$SANDBOX_DIR"

git init
git config user.name "Mahima Ghosh"
git config user.email "mahima.barrackpore@example.com"

echo "=== Step 2: Creating Baseline Commit C1 on main ==="
echo "AccoTax Core v1" > app.js
git add app.js && git commit -m "Commit C1: init core"
C1_SHA=$(git rev-parse HEAD)

echo "=== Step 3: Creating and Committing on feature-gst ==="
git switch -c feature-gst
echo "function gst() { return 18; }" >> app.js
git commit -am "Commit C2: add GST calculator"

echo "function gstExempt() { return 0; }" >> app.js
git commit -am "Commit C3: add GST exemptions"
C3_SHA=$(git rev-parse HEAD)

echo "=== Step 4: Inspecting Pointers Before Merge ==="
echo "main ref SHA:        $(cat .git/refs/heads/main)"
echo "feature-gst ref SHA: $(cat .git/refs/heads/feature-gst)"

echo "=== Step 5: Performing Fast-Forward Merge into main ==="
git switch main
git merge feature-gst

echo "=== Step 6: Inspecting Pointers After Merge ==="
echo "main ref SHA:        $(cat .git/refs/heads/main)"
echo "feature-gst ref SHA: $(cat .git/refs/heads/feature-gst)"
echo "VERIFICATION: main pointer has advanced directly to C3 ($C3_SHA)!"

echo "=== Step 7: Testing --ff-only flag safety ==="
git switch -c feature-extra
echo "// extra line" >> app.js
git commit -am "Commit C4: extra work"

git switch main
git merge --ff-only feature-extra
echo "--ff-only succeeded cleanly!"

echo "=== Step 8: Verifying Linear History in Log ==="
git log --graph --oneline

echo "=== Lab Completed Successfully! ==="
