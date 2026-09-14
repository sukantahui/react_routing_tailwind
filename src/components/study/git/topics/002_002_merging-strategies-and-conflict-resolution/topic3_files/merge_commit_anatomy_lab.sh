#!/usr/bin/env bash
# ==============================================================================
# LAB DRILL: MERGE COMMIT ANATOMY & MULTI-PARENT INSPECTION
# Instructor: Sukanta Hui (Coder & AccoTax, Barrackpore)
# ==============================================================================

set -e
echo "=== Step 1: Initializing Merge Commit Sandbox ==="
SANDBOX_DIR="merge_commit_sandbox"
rm -rf "$SANDBOX_DIR"
mkdir "$SANDBOX_DIR"
cd "$SANDBOX_DIR"

git init
git config user.name "Sachin Sharma"
git config user.email "sachin.barrackpore@example.com"

echo "=== Step 2: Base Commit C1 on main ==="
echo "AccoTax v1" > app.js
git add app.js && git commit -m "Commit C1: init"

echo "=== Step 3: Feature Commit F1 on feature branch ==="
git switch -c feature-gst
echo "GST 18%" >> app.js
git commit -am "Commit F1: add GST"
F1_SHA=$(git rev-parse HEAD)

echo "=== Step 4: Divergent Commit M1 on main ==="
git switch main
echo "Main header" >> header.txt
git add header.txt && git commit -m "Commit M1: add header on main"
M1_SHA=$(git rev-parse HEAD)

echo "=== Step 5: Executing Merge (Creating Merge Commit) ==="
git merge feature-gst -m "Merge branch 'feature-gst' into main"
MERGE_SHA=$(git rev-parse HEAD)

echo "=== Step 6: Inspecting Raw Commit Object with git cat-file ==="
echo "--- git cat-file -p $MERGE_SHA ---"
git cat-file -p "$MERGE_SHA"

echo "=== Step 7: Verifying Parent 1 and Parent 2 SHAs ==="
echo "Parent 1 (HEAD^1): $(git rev-parse HEAD^1) (Matches M1: $M1_SHA)"
echo "Parent 2 (HEAD^2): $(git rev-parse HEAD^2) (Matches F1: $F1_SHA)"

echo "=== Step 8: Visualizing DAG with git log --graph ==="
git log --graph --oneline

echo "=== Lab Completed Successfully! ==="
