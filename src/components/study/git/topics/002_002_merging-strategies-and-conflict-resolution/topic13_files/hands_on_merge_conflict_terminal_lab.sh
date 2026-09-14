#!/usr/bin/env bash
# ==============================================================================
# COMPREHENSIVE BASH LAB: 3-WAY MERGE CONFLICT SIMULATION & RESOLUTION SANDBOX
# MODULE: 002_002_merging-strategies-and-conflict-resolution (Topic 13)
# INSTRUCTOR: Sukanta Hui (Coder & AccoTax, Barrackpore)
# ==============================================================================

set -euo pipefail

LAB_DIR="$HOME/git_module_002_002_comprehensive_lab"
echo "=========================================================================="
echo ">>> STARTING COMPREHENSIVE MERGE CONFLICT TERMINAL LAB (Topic 13) <<<"
echo "=========================================================================="
rm -rf "$LAB_DIR"
mkdir -p "$LAB_DIR"
cd "$LAB_DIR"

# Phase 1: Repo Setup
git init -b main
git config user.name "Sukanta Hui"
git config user.email "sukanta@coderaccotax.in"
git config merge.conflictStyle zdiff3

# Phase 2: Create Base Project
mkdir -p src __tests__
cat << 'EOF' > src/taxCalculator.js
// Coder & AccoTax Master Billing - Barrackpore
function computeTax(amount) {
    const GST_RATE = 0.18; // 18% standard baseline
    return amount * GST_RATE;
}
module.exports = { computeTax };
EOF

cat << 'EOF' > src/rateConfig.json
{
  "hourlyRate": 1500,
  "currency": "INR",
  "location": "Barrackpore"
}
EOF

git add .
git commit -m "feat: initial tax calculator and rate configuration baseline"
BASE_COMMIT=$(git rev-parse HEAD)
echo "Baseline Commit (C1 / Merge Base) created: $BASE_COMMIT"

# Phase 3: Branching into feature/corporate
git switch -c feature/corporate

cat << 'EOF' > src/taxCalculator.js
// Coder & AccoTax Master Billing - Barrackpore
function computeTax(amount) {
    const GST_RATE = 0.28; // 28% Luxury Corporate Tier
    return amount * GST_RATE;
}
module.exports = { computeTax };
EOF

cat << 'EOF' > src/rateConfig.json
{
  "hourlyRate": 3500,
  "currency": "INR",
  "location": "Barrackpore",
  "tier": "Corporate"
}
EOF

git commit -am "feat(corporate): set 28% GST rate and 3500 INR hourly rate"

# Phase 4: Divergent commit on main
git switch main

cat << 'EOF' > src/taxCalculator.js
// Coder & AccoTax Master Billing - Barrackpore
function computeTax(amount) {
    const GST_RATE = 0.12; // 12% Reduced Essential Tier
    return amount * GST_RATE;
}
module.exports = { computeTax };
EOF

cat << 'EOF' > src/rateConfig.json
{
  "hourlyRate": 2000,
  "currency": "INR",
  "location": "Barrackpore",
  "tier": "Standard Revised"
}
EOF

git commit -am "feat(rates): update standard GST rate to 12% and hourly rate to 2000 INR"

# Phase 5: Calculating and Verifying Merge Base
echo ""
echo "=== Phase 5: Calculating Merge Base Common Ancestor ==="
CALCULATED_BASE=$(git merge-base main feature/corporate)
echo "Calculated Merge Base SHA: $CALCULATED_BASE"
if [ "$CALCULATED_BASE" == "$BASE_COMMIT" ]; then
    echo "✓ SUCCESS: Merge base matches initial baseline commit exactly!"
fi

# Phase 6: Triggering Merge Conflict
echo ""
echo "=== Phase 6: Triggering 3-Way Merge Conflict ==="
set +e
git merge feature/corporate
MERGE_STATUS=$?
set -e

echo ""
echo "Unmerged paths in index:"
git ls-files -u

echo ""
echo "Viewing zdiff3 markers in src/taxCalculator.js:"
cat src/taxCalculator.js

# Phase 7: Professional Conflict Resolution
echo ""
echo "=== Phase 7: Resolving Conflicts via Clean Synthesis ==="
cat << 'EOF' > src/taxCalculator.js
// Coder & AccoTax Master Billing - Barrackpore (Unified)
function computeTax(amount, slab = "standard") {
    const GST_RATE = (slab === "corporate") ? 0.28 : 0.12;
    return amount * GST_RATE;
}
module.exports = { computeTax };
EOF

cat << 'EOF' > src/rateConfig.json
{
  "standardHourlyRate": 2000,
  "corporateHourlyRate": 3500,
  "currency": "INR",
  "location": "Barrackpore"
}
EOF

# Phase 8: Staging and Finalizing Commit
git add .
git diff --check # Verify 0 marker errors

git commit -m "merge: resolve tax and rate card conflicts with multi-tier slab engine"

echo ""
echo "=== Phase 8: Verifying Resulting 2-Parent Topology ==="
git log --graph --oneline --all

PARENTS=$(git rev-list --parents -n 1 HEAD)
echo "Merge Commit Parent Topology: $PARENTS"

echo ""
echo "=========================================================================="
echo ">>> COMPREHENSIVE TERMINAL LAB COMPLETED WITH 100% SUCCESS! <<<"
echo "=========================================================================="
