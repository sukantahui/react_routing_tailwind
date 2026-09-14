#!/usr/bin/env bash
# ==============================================================================
# Script: vcs_evolution_lab.sh
# Topic 1: Evolution of VCS (Local VCS -> Centralized VCS -> Distributed VCS)
# Course: Git Mastery Track · Module 001_001
# Educator: Sukanta Hui (Coder & AccoTax, Barrackpore)
# ==============================================================================

set -euo pipefail

echo "======================================================================"
echo "  CODER & ACCOTAX · GIT MASTERY LAB: EVOLUTION OF VCS"
echo "  Simulating Generation 1 (Local), Gen 2 (CVCS), Gen 3 (Git DVCS)"
echo "======================================================================"
echo ""

# Setup temporary sandbox directory
SANDBOX_DIR=$(mktemp -d -t git_lab_evolution_XXXXXX)
cd "$SANDBOX_DIR"
echo "[+] Created isolated sandbox at: $SANDBOX_DIR"

# ------------------------------------------------------------------------------
# STEP 1: Verify Git Installation & Version
# ------------------------------------------------------------------------------
echo ""
echo "--- [Step 1] Checking Git Binary & Version ---"
git --version
echo "[✓] Git DVCS Engine is active and ready."

# ------------------------------------------------------------------------------
# STEP 2: Initialize a Local Git Repository (Generation 3 Distributed VCS)
# ------------------------------------------------------------------------------
echo ""
echo "--- [Step 2] Initializing Local Git Repository ---"
git init my_project
cd my_project
git branch -m main

# ------------------------------------------------------------------------------
# STEP 3: Create Project Files & Make Initial Commits
# ------------------------------------------------------------------------------
echo ""
echo "--- [Step 3] Creating Commits with Full Cryptographic Integrity ---"
cat << 'EOF' > server.js
// Coder & AccoTax Barrackpore Student Portal
console.log("Server initialized on port 8080");
EOF

git add server.js
git commit -m "feat: initial commit for student portal"

cat << 'EOF' >> server.js
console.log("Registered students: Susmita, Sachin, Mahima, Debangshu");
EOF

git add server.js
git commit -m "feat: add enrolled student records"

# ------------------------------------------------------------------------------
# STEP 4: Inspect Offline History & DAG
# ------------------------------------------------------------------------------
echo ""
echo "--- [Step 4] Inspecting Local Offline Commit Graph ---"
git log --oneline --graph --decorate

# ------------------------------------------------------------------------------
# STEP 5: Demonstrate Instant Branching (DVCS Superpower)
# ------------------------------------------------------------------------------
echo ""
echo "--- [Step 5] Instant Branching & Parallel Development ---"
git switch -c feature/payment-gateway
echo "console.log('Payment Gateway: Razorpay/Stripe active');" >> server.js
git add server.js
git commit -m "feat(payment): add payment integration"

git switch main
echo "console.log('Admin Dashboard: Metrics active');" >> server.js
git add server.js
git commit -m "feat(admin): add dashboard metrics"

echo ""
echo "[✓] Full Commit Graph across divergent branches (executed 100% offline):"
git log --graph --oneline --all

# Cleanup
cd /tmp
rm -rf "$SANDBOX_DIR"
echo ""
echo "======================================================================"
echo "  [SUCCESS] Lab completed successfully with zero server dependencies."
echo "======================================================================"
