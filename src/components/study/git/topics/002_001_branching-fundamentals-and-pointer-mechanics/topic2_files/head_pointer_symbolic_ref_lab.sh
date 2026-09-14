#!/usr/bin/env bash
# ==============================================================================
# LAB DRILL: THE ROLE OF HEAD (.git/HEAD SYMBOLIC REFERENCE)
# Instructor: Sukanta Hui (Coder & AccoTax, Barrackpore)
# ==============================================================================

set -e
echo "=== Step 1: Initializing Sandbox Repository for HEAD Inspection ==="
SANDBOX_DIR="head_symref_sandbox"
rm -rf "$SANDBOX_DIR"
mkdir "$SANDBOX_DIR"
cd "$SANDBOX_DIR"

git init
git config user.name "Sachin Sharma"
git config user.email "sachin.barrackpore@example.com"

echo "=== Step 2: Inspecting initial HEAD before any commit ==="
echo "Content of .git/HEAD:"
cat .git/HEAD
echo "Notice: HEAD points to refs/heads/main (or master), an 'unborn branch'."

echo "=== Step 3: Making initial commit ==="
echo "Tally Prime Ledger v1.0" > ledger.txt
git add ledger.txt
git commit -m "Initial commit for ledger"

echo "=== Step 4: Verifying HEAD and symbolic-ref ==="
echo "Reading .git/HEAD file directly:"
cat .git/HEAD

echo "Using git symbolic-ref:"
git symbolic-ref HEAD

echo "Resolving HEAD to exact commit SHA using git rev-parse:"
git rev-parse HEAD

echo "=== Step 5: Creating and switching to a new feature branch ==="
git switch -c feature-tax-slab

echo "Inspecting .git/HEAD on new branch:"
cat .git/HEAD

echo "=== Step 6: Making a commit on feature branch to observe HEAD movement ==="
echo "GST 18% slab rules" >> ledger.txt
git commit -am "feat: add 18% GST slab rule"

echo "SHA of feature-tax-slab branch:"
cat .git/refs/heads/feature-tax-slab

echo "HEAD rev-parse output:"
git rev-parse HEAD

echo "=== Step 7: Switching back to main branch ==="
git switch main

echo "Inspecting .git/HEAD after switching back:"
cat .git/HEAD
echo "Current commit SHA on main:"
git rev-parse HEAD

echo "=== Lab Completed Successfully! ==="
