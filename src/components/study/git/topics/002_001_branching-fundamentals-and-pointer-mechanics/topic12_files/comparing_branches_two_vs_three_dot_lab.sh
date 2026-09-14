#!/usr/bin/env bash
# ==============================================================================
# LAB DRILL: COMPARING BRANCHES (TWO-DOT .. VS THREE-DOT ... NOTATION)
# Instructor: Sukanta Hui (Coder & AccoTax, Barrackpore)
# ==============================================================================

set -e
echo "=== Step 1: Initializing Diff Sandbox ==="
SANDBOX_DIR="branch_diff_sandbox"
rm -rf "$SANDBOX_DIR"
mkdir "$SANDBOX_DIR"
cd "$SANDBOX_DIR"

git init
git config user.name "Sachin Sharma"
git config user.email "sachin.barrackpore@example.com"

echo "=== Step 2: Creating Common Base Commit C1 ==="
echo "AccoTax Ledger v1.0 Base" > ledger.txt
git add ledger.txt && git commit -m "Commit C1: common ancestor base"

echo "=== Step 3: Creating feature-gst branch from C1 ==="
git switch -c feature-gst
echo "GST 18% Rule Function" >> gst.txt
git add gst.txt && git commit -m "Commit F1: add GST feature"

echo "=== Step 4: Making a commit on main (Branch Divergence) ==="
git switch main
echo "Main branch invoice header update" >> ledger.txt
git commit -am "Commit M1: update ledger header on main"

echo "=== Step 5: Testing Two-Dot Diff (git diff main..feature-gst) ==="
echo "--- Two-Dot Diff Output (Direct Tip Comparison) ---"
git diff main..feature-gst
echo "Notice: Two-dot diff shows gst.txt added AND ledger.txt header removed!"

echo "=== Step 6: Testing Three-Dot Diff (git diff main...feature-gst) ==="
echo "--- Three-Dot Diff Output (Merge-Base Comparison - PR View) ---"
git diff main...feature-gst
echo "Notice: Three-dot diff shows ONLY gst.txt additions (the feature PR work)!"

echo "=== Step 7: Verifying with git merge-base ==="
COMMON_BASE=$(git merge-base main feature-gst)
echo "Merge Base SHA is: $COMMON_BASE"
echo "Diff against merge base matches 3-dot exactly:"
git diff "$COMMON_BASE" feature-gst

echo "=== Lab Completed Successfully! ==="
