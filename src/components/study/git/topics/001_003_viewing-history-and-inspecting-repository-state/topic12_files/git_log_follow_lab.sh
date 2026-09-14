#!/usr/bin/env bash
# ==============================================================================
# Git Lab 001_003_12: Tracking Renamed & Moved Files with git log --follow
# Instructor: Sukanta Hui (Coder & AccoTax, Barrackpore)
# Cohort: Debangshu, Swadeep, Sachin, Mahima, Susmita, Abhronila, Tuhina
# ==============================================================================

set -e

echo "--------------------------------------------------------"
echo "Initializing Git Log Follow Sandbox..."
echo "--------------------------------------------------------"

LAB_DIR="git_log_follow_sandbox"
rm -rf "$LAB_DIR"
mkdir -p "$LAB_DIR"
cd "$LAB_DIR"

git init -b main

# Commit 1: Genesis creation under old name (Author: Susmita)
GIT_AUTHOR_NAME="Susmita Database" \
GIT_AUTHOR_EMAIL="susmita@barrackpore-devs.org" \
GIT_AUTHOR_DATE="2026-09-01 10:00:00 +0530" \
cat << 'EOF' > old_tax_calc.js
// Legacy Tax Calculation Routine
function calculateOldGST(amount) {
  return amount * 0.18;
}
EOF
git add old_tax_calc.js
git commit -m "feat(tax): initial legacy tax calculator in old_tax_calc.js"

# Commit 2: Added utility function (Author: Debangshu)
GIT_AUTHOR_NAME="Debangshu Technical" \
GIT_AUTHOR_EMAIL="debangshu@barrackpore-devs.org" \
GIT_AUTHOR_DATE="2026-09-05 14:00:00 +0530" \
cat << 'EOF' >> old_tax_calc.js

function calculateCess(amount) {
  return amount * 0.01;
}
EOF
git add old_tax_calc.js
git commit -m "feat(tax): add 1% Cess calculation helper"

# Commit 3: Architectural Refactoring - Move & Rename into src/tax/gst_calculator.js (Author: Swadeep)
GIT_AUTHOR_NAME="Swadeep SeniorDev" \
GIT_AUTHOR_EMAIL="swadeep@barrackpore-devs.org" \
GIT_AUTHOR_DATE="2026-09-10 16:30:00 +0530" \
mkdir -p src/tax
git mv old_tax_calc.js src/tax/gst_calculator.js
git commit -m "refactor(structure): move old_tax_calc.js to src/tax/gst_calculator.js"

# Commit 4: Modernization update under new name (Author: Sukanta Hui)
GIT_AUTHOR_NAME="Sukanta Hui" \
GIT_AUTHOR_EMAIL="sukanta@barrackpore-devs.org" \
GIT_AUTHOR_DATE="2026-09-14 18:00:00 +0530" \
cat << 'EOF' >> src/tax/gst_calculator.js

module.exports = { calculateOldGST, calculateCess };
EOF
git add src/tax/gst_calculator.js
git commit -m "chore(exports): export module helpers"

echo ""
echo "=== 1. Standard git log (Stops at rename, missing pre-rename history!) ==="
git log --oneline -- src/tax/gst_calculator.js

echo ""
echo "=== 2. git log with --follow (Traverses across rename back to genesis!) ==="
git log --follow --oneline -- src/tax/gst_calculator.js

echo ""
echo "=== 3. git log with --follow and --stat (Showing {old => new} transformation) ==="
git log --follow --stat -n 3 -- src/tax/gst_calculator.js

echo ""
echo "--------------------------------------------------------"
echo "Lab completed successfully!"
echo "--------------------------------------------------------"
