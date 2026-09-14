#!/usr/bin/env bash
# ==============================================================================
# LAB SCRIPT: Topic 5 - Interactive Staging with git add -p (Patch Mode)
# Module: 001_002_git-three-tree-architecture-and-basic-workflow
# Educator: Sukanta Hui (Coder & AccoTax, Barrackpore)
# ==============================================================================

set -e
LAB_DIR="/tmp/git_patch_lab_$(date +%s)"
mkdir -p "$LAB_DIR"
cd "$LAB_DIR"

echo "🧪 [STEP 1] Initializing lab repository..."
git init -b main
git config user.name "Sukanta Hui Student"
git config user.email "student@coderaccotax.com"

echo "🧪 [STEP 2] Creating base file with multiple functions..."
cat << 'EOF' > billing.js
function calculateSubtotal(items) {
  return items.reduce((sum, item) => sum + item.price, 0);
}

function calculateTax(subtotal, rate) {
  return subtotal * rate;
}

function printReceipt(invoice) {
  console.log("Invoice ID: " + invoice.id);
}
EOF

git add billing.js
git commit -m "feat(billing): initial billing calculator functions"

echo "🧪 [STEP 3] Making two distinct changes separated by code (Hunk #1 & Hunk #2)..."
cat << 'EOF' > billing.js
function calculateSubtotal(items) {
  // Enhanced with discount deduction
  const gross = items.reduce((sum, item) => sum + item.price, 0);
  return gross > 1000 ? gross * 0.9 : gross;
}

function calculateTax(subtotal, rate) {
  return subtotal * rate;
}

function printReceipt(invoice) {
  console.log("=== BARRACKPORE CODER & ACCOTAX RECEIPT ===");
  console.log("Invoice ID: " + invoice.id);
  console.log("DEBUG LOG: Internal tax calculation timestamp: " + Date.now());
}
EOF

echo "========================================================"
echo "📊 DIFF SHOWING TWO HUNKS:"
echo "========================================================"
git diff

echo ""
echo "🧪 [STEP 4] Programmatically simulating 'git add -p' using a git filter/patch:"
# In automated script, we demonstrate staged vs unstaged inspection
git checkout -p billing.js <<< "n" || true

echo ""
echo "🧪 [STEP 5] Viewing unstaged vs staged state after inspection:"
git status -s

echo ""
echo "✅ Lab execution complete. Clean up: rm -rf $LAB_DIR"
