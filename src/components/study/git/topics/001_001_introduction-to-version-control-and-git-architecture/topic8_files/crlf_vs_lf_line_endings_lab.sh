#!/usr/bin/env bash
# ==============================================================================
# Script: crlf_vs_lf_line_endings_lab.sh
# Topic 8: Line Endings Across Operating Systems (CRLF vs LF and .gitattributes)
# Course: Git Mastery Track · Module 001_001
# Educator: Sukanta Hui (Coder & AccoTax, Barrackpore)
# ==============================================================================

set -euo pipefail

echo "======================================================================"
echo "  CODER & ACCOTAX · LINE ENDINGS NORMALIZATION LAB"
echo "  Simulating Windows CRLF vs Linux LF and .gitattributes Enforcement"
echo "======================================================================"
echo ""

SANDBOX_DIR=$(mktemp -d -t git_lab_line_endings_XXXXXX)
cd "$SANDBOX_DIR"
echo "[+] Initializing sandbox in: $SANDBOX_DIR"

git init crlf_lab
cd crlf_lab
git branch -m main

# ------------------------------------------------------------------------------
# STEP 1: Create a .gitattributes File
# ------------------------------------------------------------------------------
echo "--- [Step 1] Creating Standard .gitattributes File ---"
cat << 'EOF' > .gitattributes
# Auto-detect text files and normalize to LF in repository
* text=auto eol=lf

# Explicitly force Unix LF for scripts and code
*.sh text eol=lf
*.js text eol=lf
*.py text eol=lf

# Raw binary assets must never be modified
*.png binary
*.jpg binary
EOF

git add .gitattributes
git commit -m "chore: add .gitattributes for universal LF normalization"
echo "[✓] .gitattributes committed successfully."

# ------------------------------------------------------------------------------
# STEP 2: Create a Shell Script with Simulated Windows CRLF
# ------------------------------------------------------------------------------
echo ""
echo "--- [Step 2] Creating File with Windows CRLF (\r\n) ---"
printf '#!/usr/bin/env bash\r\necho "Hello from Barrackpore!"\r\n' > deploy.sh

echo "Inspecting raw bytes of deploy.sh before Git staging:"
file deploy.sh || true

# ------------------------------------------------------------------------------
# STEP 3: Stage and Commit (Observing Automatic LF Normalization)
# ------------------------------------------------------------------------------
echo ""
echo "--- [Step 3] Staging File into Git Object Database ---"
git add deploy.sh
git commit -m "feat: add deploy script with automatic LF normalization"

echo ""
echo "[✓] Inspecting committed Blob object in Git database (Pure LF guaranteed):"
BLOB_SHA=$(git ls-tree HEAD deploy.sh | awk '{print $3}')
echo "Blob SHA: $BLOB_SHA"
git cat-file -p "$BLOB_SHA" | tr -d '\n' | cat -v

# ------------------------------------------------------------------------------
# STEP 4: Test git add --renormalize
# ------------------------------------------------------------------------------
echo ""
echo "--- [Step 4] Running Repository-wide Renormalization Check ---"
git add --renormalize .
git status

# Cleanup
cd /tmp
rm -rf "$SANDBOX_DIR"
echo ""
echo "======================================================================"
echo "  [SUCCESS] Line ending normalization lab executed with 100% success."
echo "======================================================================"
