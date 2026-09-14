#!/usr/bin/env bash
# ==============================================================================
# LAB SCRIPT: Topic 9 - Inspecting Unstaged vs Staged Changes with git diff
# Module: 001_002_git-three-tree-architecture-and-basic-workflow
# Educator: Sukanta Hui (Coder & AccoTax, Barrackpore)
# ==============================================================================

set -e
LAB_DIR="/tmp/git_diff_lab_$(date +%s)"
mkdir -p "$LAB_DIR"
cd "$LAB_DIR"

echo "🧪 [STEP 1] Initializing lab repository..."
git init -b main
git config user.name "Sukanta Hui Student"
git config user.email "student@coderaccotax.com"

echo "🧪 [STEP 2] Creating base initial commit..."
cat << 'EOF' > calculation.js
function calculateGST(amount) {
  const rate = 0.18;
  return amount * rate;
}
EOF
git add calculation.js
git commit -m "feat(tax): initial GST calculation logic"

echo "🧪 [STEP 3] Making Stage 1 modification and STAGING it..."
cat << 'EOF' > calculation.js
function calculateGST(amount, category = "standard") {
  // Staged enhancement
  const rates = { standard: 0.18, luxury: 0.28, essential: 0.05 };
  const rate = rates[category] || 0.18;
  return amount * rate;
}
EOF
git add calculation.js

echo "🧪 [STEP 4] Making Stage 2 modification in WORKING TREE (UNSTAGED)..."
cat << 'EOF' > calculation.js
function calculateGST(amount, category = "standard") {
  // Staged enhancement
  const rates = { standard: 0.18, luxury: 0.28, essential: 0.05 };
  const rate = rates[category] || 0.18;
  // Unstaged debug statement & round-off
  const tax = Math.round(amount * rate * 100) / 100;
  console.log("Calculated tax: " + tax);
  return tax;
}
EOF

echo "========================================================"
echo "📊 1. UNSTAGED DIFF: git diff (Working Tree vs Index)"
echo "========================================================"
git diff

echo ""
echo "========================================================"
echo "📊 2. STAGED DIFF: git diff --staged (Index vs HEAD)"
echo "========================================================"
git diff --staged

echo ""
echo "========================================================"
echo "📊 3. TOTAL ACCUMULATED DIFF: git diff HEAD (Tree vs HEAD)"
echo "========================================================"
git diff HEAD

echo ""
echo "========================================================"
echo "📊 4. STAT SUMMARY: git diff --stat HEAD"
echo "========================================================"
git diff --stat HEAD

echo ""
echo "✅ Lab execution complete. Clean up: rm -rf $LAB_DIR"
