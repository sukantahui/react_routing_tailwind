#!/usr/bin/env bash
# ==============================================================================
# Script: cvcs_vs_dvcs_lab.sh
# Topic 2: Centralized vs Distributed VCS
# Course: Git Mastery Track · Module 001_001
# Educator: Sukanta Hui (Coder & AccoTax, Barrackpore)
# ==============================================================================

set -euo pipefail

echo "======================================================================"
echo "  CODER & ACCOTAX · GIT LAB: CVCS VS DVCS BENCHMARK & BRANCHING"
echo "  Measuring Local Pointer Mechanics and Offline Resilience"
echo "======================================================================"
echo ""

SANDBOX_DIR=$(mktemp -d -t git_lab_cvcs_dvcs_XXXXXX)
cd "$SANDBOX_DIR"
echo "[+] Initializing sandbox in: $SANDBOX_DIR"

git init enterprise_project
cd enterprise_project
git branch -m main

# ------------------------------------------------------------------------------
# STEP 1: Fast Atomic Commits
# ------------------------------------------------------------------------------
echo ""
echo "--- [Step 1] Creating Baseline Commits ---"
cat << 'EOF' > app.js
// Enterprise Billing Engine - Coder & AccoTax
const taxRate = 0.18; // 18% GST standard
function calculateTotal(subtotal) {
  return subtotal + (subtotal * taxRate);
}
console.log("Invoice 101 Total:", calculateTotal(1000));
EOF

git add app.js
git commit -m "feat(billing): initial GST tax calculation logic"

# ------------------------------------------------------------------------------
# STEP 2: Measure Instant Branch Creation
# ------------------------------------------------------------------------------
echo ""
echo "--- [Step 2] Measuring Instant Branch Creation Speed ---"
START_TIME=$(date +%s%N)
git branch feature/discount-coupons
git branch feature/multi-currency
git branch feature/pdf-invoice-generator
END_TIME=$(date +%s%N)
ELAPSED=$(( (END_TIME - START_TIME) / 1000000 ))
echo "[✓] Created 3 independent branches in ${ELAPSED} ms (Instant 41-byte pointers)!"

# ------------------------------------------------------------------------------
# STEP 3: Inspect Branch Pointer Files
# ------------------------------------------------------------------------------
echo ""
echo "--- [Step 3] Inspecting Physical Branch Pointer Files in .git/refs/heads/ ---"
ls -la .git/refs/heads/
echo ""
echo "Contents of .git/refs/heads/main:"
cat .git/refs/heads/main
echo ""
echo "Contents of .git/refs/heads/feature/discount-coupons:"
cat .git/refs/heads/feature/discount-coupons

# ------------------------------------------------------------------------------
# STEP 4: Demonstrate Offline Branch Switching & History Diffing
# ------------------------------------------------------------------------------
echo ""
echo "--- [Step 4] Offline Feature Development on Branch ---"
git switch feature/discount-coupons
cat << 'EOF' >> app.js

function applyCoupon(total, couponCode) {
  if (couponCode === "BARRACKPORE10") return total * 0.90;
  return total;
}
console.log("Discounted Total:", applyCoupon(1180, "BARRACKPORE10"));
EOF

git add app.js
git commit -m "feat(coupon): add BARRACKPORE10 promotional coupon code"

echo ""
echo "[✓] Local Diff against main (computed offline in sub-milliseconds):"
git diff main..feature/discount-coupons --stat

# Cleanup
cd /tmp
rm -rf "$SANDBOX_DIR"
echo ""
echo "======================================================================"
echo "  [SUCCESS] CVCS vs DVCS comparison lab completed with zero network calls."
echo "======================================================================"
