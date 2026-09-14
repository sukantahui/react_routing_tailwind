#!/usr/bin/env bash
# ==============================================================================
# Script: git_origins_linux_kernel_lab.sh
# Topic 3: Origins of Git (Linus Torvalds & Linux Kernel 2005)
# Course: Git Mastery Track · Module 001_001
# Educator: Sukanta Hui (Coder & AccoTax, Barrackpore)
# ==============================================================================

set -euo pipefail

echo "======================================================================"
echo "  CODER & ACCOTAX · GIT ORIGINS LAB: EXPLORING EARLY PLUMBING & SHA"
echo "  Recreating Linus Torvalds' 2005 Content-Addressable Object Model"
echo "======================================================================"
echo ""

SANDBOX_DIR=$(mktemp -d -t git_lab_origins_XXXXXX)
cd "$SANDBOX_DIR"
echo "[+] Initializing sandbox in: $SANDBOX_DIR"

git init git_origins_lab
cd git_origins_lab
git branch -m main

# ------------------------------------------------------------------------------
# STEP 1: Demonstrate Content-Addressable Storage (Plumbing Commands)
# ------------------------------------------------------------------------------
echo ""
echo "--- [Step 1] Creating Raw Git Blob Object without 'git add' ---"
BLOB_HASH=$(echo "Linux Kernel 2.6.12 Release Note by Linus Torvalds" | git hash-object -w --stdin)
echo "[✓] Computed 40-character SHA-1 hash: $BLOB_HASH"

# ------------------------------------------------------------------------------
# STEP 2: Inspect Raw Object in .git/objects/
# ------------------------------------------------------------------------------
echo ""
echo "--- [Step 2] Locating Physical Object on Disk ---"
DIR_PREFIX=${BLOB_HASH:0:2}
FILE_SUFFIX=${BLOB_HASH:2}
echo "[✓] Physical storage location: .git/objects/$DIR_PREFIX/$FILE_SUFFIX"
ls -la ".git/objects/$DIR_PREFIX/$FILE_SUFFIX"

# ------------------------------------------------------------------------------
# STEP 3: Read Object Content & Type using 'git cat-file'
# ------------------------------------------------------------------------------
echo ""
echo "--- [Step 3] Reading Object Type and Content via 'git cat-file' ---"
echo "Object Type: $(git cat-file -t "$BLOB_HASH")"
echo "Object Size: $(git cat-file -s "$BLOB_HASH") bytes"
echo "Object Content:"
git cat-file -p "$BLOB_HASH"

# ------------------------------------------------------------------------------
# STEP 4: Demonstrate Immutable Hash Collision Immunity
# ------------------------------------------------------------------------------
echo ""
echo "--- [Step 4] Cryptographic Tampering Detection ---"
echo "Changing even a single letter in content changes the entire SHA hash:"
HASH1=$(echo "Linus Torvalds" | git hash-object --stdin)
HASH2=$(echo "linus torvalds" | git hash-object --stdin)
echo "Hash for 'Linus Torvalds': $HASH1"
echo "Hash for 'linus torvalds': $HASH2"

# ------------------------------------------------------------------------------
# STEP 5: Verify Repository Integrity
# ------------------------------------------------------------------------------
echo ""
echo "--- [Step 5] Running Full Cryptographic FSCK ---"
git fsck --full

# Cleanup
cd /tmp
rm -rf "$SANDBOX_DIR"
echo ""
echo "======================================================================"
echo "  [SUCCESS] Git Origins Plumbing lab executed successfully."
echo "======================================================================"
