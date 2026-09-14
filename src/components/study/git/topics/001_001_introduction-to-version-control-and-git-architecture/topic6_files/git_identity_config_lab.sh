#!/usr/bin/env bash
# ==============================================================================
# Script: git_identity_config_lab.sh
# Topic 6: Configuring Git Identity (user.name and user.email)
# Course: Git Mastery Track · Module 001_001
# Educator: Sukanta Hui (Coder & AccoTax, Barrackpore)
# ==============================================================================

set -euo pipefail

echo "======================================================================"
echo "  CODER & ACCOTAX · GIT IDENTITY CONFIGURATION LAB"
echo "  Testing Global vs Local Identity Hierarchies & Author Attribution"
echo "======================================================================"
echo ""

SANDBOX_DIR=$(mktemp -d -t git_lab_identity_XXXXXX)
cd "$SANDBOX_DIR"
echo "[+] Initializing sandbox at: $SANDBOX_DIR"

# ------------------------------------------------------------------------------
# STEP 1: Inspect Global Identity
# ------------------------------------------------------------------------------
echo "--- [Step 1] Reading Existing Global Identity ---"
GLOBAL_NAME=$(git config --global user.name || echo "Not Configured")
GLOBAL_EMAIL=$(git config --global user.email || echo "Not Configured")
echo "Global Name:  $GLOBAL_NAME"
echo "Global Email: $GLOBAL_EMAIL"

# ------------------------------------------------------------------------------
# STEP 2: Initialize a Local Project & Override with Local Identity
# ------------------------------------------------------------------------------
echo ""
echo "--- [Step 2] Initializing Repository with Local Override ---"
git init client_work_project
cd client_work_project
git branch -m main

# Set repository-specific local identity
git config --local user.name "Sukanta Hui (Barrackpore Lab)"
git config --local user.email "sukanta.hui@barrackpore-lab.org"

echo "[✓] Local configuration set in .git/config:"
git config --local --list | grep user

# ------------------------------------------------------------------------------
# STEP 3: Create a Commit & Inspect Author vs Committer Headers
# ------------------------------------------------------------------------------
echo ""
echo "--- [Step 3] Creating a Test Commit & Inspecting Metadata ---"
cat << 'EOF' > index.html
<!DOCTYPE html>
<html>
<head><title>Barrackpore Lab Portal</title></head>
<body><h1>Welcome to Coder & AccoTax</h1></body>
</html>
EOF

git add index.html
git commit -m "feat: initialize lab portal homepage"

echo ""
echo "[✓] Commit Author & Committer Verification:"
git log -1 --format="Commit SHA: %H%nAuthor:     %an <%ae>%nCommitter:  %cn <%ce>%nDate:       %ad%nSubject:    %s"

# ------------------------------------------------------------------------------
# STEP 4: Inspect Config Origin Path Resolution
# ------------------------------------------------------------------------------
echo ""
echo "--- [Step 4] Tracing Config Values to Exact Source Files ---"
git config --list --show-origin | grep -E "user\.(name|email)"

# Cleanup
cd /tmp
rm -rf "$SANDBOX_DIR"
echo ""
echo "======================================================================"
echo "  [SUCCESS] Git Identity configuration lab completed successfully."
echo "======================================================================"
