#!/usr/bin/env bash
# ==============================================================================
# LAB DRILL: SACHIN & MAHIMA CLASSROOM EXPERIMENT (INSPECTING .git/refs/heads/)
# Instructor: Sukanta Hui (Coder & AccoTax, Barrackpore)
# ==============================================================================

set -e
echo "=== Step 1: Initializing Classroom Sandbox ==="
SANDBOX_DIR="classroom_branch_sandbox"
rm -rf "$SANDBOX_DIR"
mkdir "$SANDBOX_DIR"
cd "$SANDBOX_DIR"

git init
git config user.name "Sachin & Mahima"
git config user.email "classroom.barrackpore@example.com"

echo "=== Step 2: Sachin creates Baseline Commit C1 on main ==="
echo "AccoTax Ledger v1.0" > ledger.txt
git add ledger.txt && git commit -m "Commit C1: init repository"

echo "Content of .git/refs/heads/main:"
cat .git/refs/heads/main

echo "=== Step 3: Mahima creates feature-gst branch ==="
git branch feature-gst

echo "Content of .git/refs/heads/main:        $(cat .git/refs/heads/main)"
echo "Content of .git/refs/heads/feature-gst: $(cat .git/refs/heads/feature-gst)"
echo "VERIFICATION: Both files contain the exact same SHA!"

echo "=== Step 4: Mahima switches and commits C2 on feature-gst ==="
git switch feature-gst
echo "function calcGST() { return 18; }" >> gst.js
git add gst.js && git commit -m "Commit C2: add GST calc logic"

echo "=== Step 5: Inspecting pointers after Mahima's commit ==="
echo "main ref:        $(cat .git/refs/heads/main) (STILL C1!)"
echo "feature-gst ref: $(cat .git/refs/heads/feature-gst) (ADVANCED TO C2!)"

echo "=== Step 6: Sachin switches back to main and commits C3 ==="
git switch main
echo "Main branch company footer" >> ledger.txt
git commit -am "Commit C3: update company footer"

echo "=== Step 7: Final Pointer Divergence Inspection ==="
echo "main ref:        $(cat .git/refs/heads/main) (ADVANCED TO C3!)"
echo "feature-gst ref: $(cat .git/refs/heads/feature-gst) (POINTS TO C2!)"

echo "=== Step 8: Visual DAG view ==="
git log --graph --oneline --all

echo "=== Classroom Experiment Completed Successfully! ==="
