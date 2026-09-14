#!/usr/bin/env bash
# ==============================================================================
# LAB DRILL: THE CONCEPT OF MERGING FUNDAMENTALS
# Instructor: Sukanta Hui (Coder & AccoTax, Barrackpore)
# ==============================================================================

set -e
echo "=== Step 1: Initializing Repository Sandbox ==="
SANDBOX_DIR="merging_concept_sandbox"
rm -rf "$SANDBOX_DIR"
mkdir "$SANDBOX_DIR"
cd "$SANDBOX_DIR"

git init
git config user.name "Sachin Sharma"
git config user.email "sachin.barrackpore@example.com"

echo "=== Step 2: Creating Initial Base Commit on main ==="
echo "AccoTax Master Ledger v1.0" > ledger.txt
git add ledger.txt && git commit -m "feat: initial master ledger"

echo "=== Step 3: Forking a Feature Branch ==="
git switch -c feature-gst-slab
echo "GST Slab 18% Rules" >> ledger.txt
git commit -am "feat: add 18% GST tax calculation"

echo "=== Step 4: Switching back to main to prepare for merge ==="
git switch main

echo "Inspecting active branch and status:"
git branch --show-current
git status

echo "=== Step 5: Executing Merge of feature-gst-slab into main ==="
git merge feature-gst-slab

echo "=== Step 6: Verifying Merged Result ==="
echo "Content of ledger.txt on main:"
cat ledger.txt

echo "Log of main after merge:"
git log --oneline --graph

echo "=== Lab Completed Successfully! ==="
