#!/usr/bin/env bash
# ==============================================================================
# Script: git_design_principles_lab.sh
# Topic 4: Core Design Principles of Git (Blobs, Trees, Commits, Tags)
# Course: Git Mastery Track · Module 001_001
# Educator: Sukanta Hui (Coder & AccoTax, Barrackpore)
# ==============================================================================

set -euo pipefail

echo "======================================================================"
echo "  CODER & ACCOTAX · GIT DESIGN PRINCIPLES LAB"
echo "  Direct Exploration of the 4 Core Git Object Types (Blob, Tree, Commit, Tag)"
echo "======================================================================"
echo ""

SANDBOX_DIR=$(mktemp -d -t git_lab_design_principles_XXXXXX)
cd "$SANDBOX_DIR"
echo "[+] Initializing sandbox in: $SANDBOX_DIR"

git init design_lab
cd design_lab
git branch -m main

# ------------------------------------------------------------------------------
# STEP 1: Create a Blob Object
# ------------------------------------------------------------------------------
echo ""
echo "--- [Step 1] Creating a Blob Object Directly ---"
BLOB_SHA=$(echo "Coder & AccoTax Barrackpore - Clean Code Principles" | git hash-object -w --stdin)
echo "[✓] Blob SHA: $BLOB_SHA"
echo "[✓] Object Type: $(git cat-file -t "$BLOB_SHA")"
echo "[✓] Object Content:"
git cat-file -p "$BLOB_SHA"

# ------------------------------------------------------------------------------
# STEP 2: Create a Working File & Commit
# ------------------------------------------------------------------------------
echo ""
echo "--- [Step 2] Creating a Standard Working Tree & Commit ---"
mkdir -p src/utils
cat << 'EOF' > src/utils/math.js
export function add(a, b) { return a + b; }
EOF

cat << 'EOF' > README.md
# Project Barrackpore Git Core Lab
EOF

git add .
git commit -m "feat: initial commit with src/utils and README"

# ------------------------------------------------------------------------------
# STEP 3: Inspect Commit Object & Root Tree Object
# ------------------------------------------------------------------------------
echo ""
echo "--- [Step 3] Inspecting the Commit Object (HEAD) ---"
COMMIT_SHA=$(git rev-parse HEAD)
echo "Commit SHA: $COMMIT_SHA"
echo "Commit Type: $(git cat-file -t "$COMMIT_SHA")"
echo "Raw Commit Payload:"
git cat-file -p "$COMMIT_SHA"

echo ""
echo "--- [Step 4] Inspecting Root Tree Object ---"
TREE_SHA=$(git rev-parse HEAD^{tree})
echo "Root Tree SHA: $TREE_SHA"
echo "Root Tree Listing:"
git cat-file -p "$TREE_SHA"

# ------------------------------------------------------------------------------
# STEP 5: Create and Inspect an Annotated Tag Object
# ------------------------------------------------------------------------------
echo ""
echo "--- [Step 5] Creating & Inspecting an Annotated Tag Object ---"
git tag -a v1.0.0 -m "Release version 1.0.0 for Barrackpore class"
TAG_SHA=$(git rev-parse v1.0.0)
echo "Tag SHA: $TAG_SHA"
echo "Tag Object Type: $(git cat-file -t "$TAG_SHA")"
echo "Raw Tag Payload:"
git cat-file -p "$TAG_SHA"

# ------------------------------------------------------------------------------
# STEP 6: Content Deduplication Demonstration
# ------------------------------------------------------------------------------
echo ""
echo "--- [Step 6] Proving Content Deduplication (Identical Files share 1 Blob) ---"
cp README.md COPY_README.md
git add COPY_README.md
git commit -m "chore: duplicate README to demonstrate blob reuse"

echo "Listing tree entries - Notice both files share the exact same Blob SHA:"
git ls-tree HEAD

# Cleanup
cd /tmp
rm -rf "$SANDBOX_DIR"
echo ""
echo "======================================================================"
echo "  [SUCCESS] All 4 Git object types verified successfully."
echo "======================================================================"
