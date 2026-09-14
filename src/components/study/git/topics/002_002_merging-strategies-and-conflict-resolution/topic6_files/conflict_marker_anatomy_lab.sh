#!/usr/bin/env bash
# ==============================================================================
# BASH LAB: ANATOMY OF CONFLICT MARKERS (STANDARD & DIFF3 STYLES)
# MODULE: 002_002_merging-strategies-and-conflict-resolution (Topic 6)
# INSTRUCTOR: Sukanta Hui (Coder & AccoTax, Barrackpore)
# ==============================================================================

set -euo pipefail

LAB_DIR="$HOME/git_conflict_marker_anatomy_lab"
echo "=== Step 1: Setting up Laboratory Repo at $LAB_DIR ==="
rm -rf "$LAB_DIR"
mkdir -p "$LAB_DIR"
cd "$LAB_DIR"

git init -b main
git config user.name "Sukanta Hui"
git config user.email "sukanta@coderaccotax.in"

echo "=== Step 2: Creating Base Accounting Module ==="
cat << 'EOF' > accountService.js
// Coder & AccoTax Billing Engine - Barrackpore
function calculateBill(baseAmount) {
    const consultationFee = 500; // Base rate
    return baseAmount + consultationFee;
}

module.exports = { calculateBill };
EOF

git add accountService.js
git commit -m "feat: initial billing calculation with base consultation fee"

echo "=== Step 3: Branching into feature/tier2 (Susmita's changes) ==="
git switch -c feature/tier2

cat << 'EOF' > accountService.js
// Coder & AccoTax Billing Engine - Barrackpore
function calculateBill(baseAmount) {
    const consultationFee = 2500; // Tier 2 Corporate Fee
    return baseAmount + consultationFee;
}

module.exports = { calculateBill };
EOF

git commit -am "feat(billing): set tier 2 fee to 2500 INR"

echo "=== Step 4: Updating main (Sachin's changes) ==="
git switch main

cat << 'EOF' > accountService.js
// Coder & AccoTax Billing Engine - Barrackpore
function calculateBill(baseAmount) {
    const consultationFee = 1200; // Standard Revised Fee
    return baseAmount + consultationFee;
}

module.exports = { calculateBill };
EOF

git commit -am "feat(billing): update standard consultation fee to 1200 INR"

echo "=== Step 5: Merge with Standard 2-Way Conflict Markers ==="
set +e
git merge feature/tier2
set -e

echo ""
echo "--- Viewing Standard 2-Way Conflict Markers ---"
cat accountService.js

echo ""
echo "=== Step 6: Aborting and Switching to zdiff3 (Modern 3-Way Markers) ==="
git merge --abort
git config merge.conflictStyle zdiff3

echo "Retrying merge with zdiff3 enabled..."
set +e
git merge feature/tier2
set -e

echo ""
echo "--- Viewing Modern zdiff3 Markers (Notice the ||||||| base section!) ---"
cat accountService.js

echo ""
echo "=== Step 7: Performing Clean Resolution ==="
# We resolve by introducing flexible tiered pricing incorporating both fees!
cat << 'EOF' > accountService.js
// Coder & AccoTax Billing Engine - Barrackpore (Resolved)
function calculateBill(baseAmount, tier = 'standard') {
    const consultationFee = (tier === 'corporate') ? 2500 : 1200;
    return baseAmount + consultationFee;
}

module.exports = { calculateBill };
EOF

echo "Staging resolved file..."
git add accountService.js
git commit -m "merge: resolve consultation fee conflict by implementing dynamic tiered billing"

echo ""
echo "=== Step 8: Verifying Git Log Graph ==="
git log --graph --oneline --all

echo "=== Lab Complete: Conflict markers analyzed and resolved! ==="
