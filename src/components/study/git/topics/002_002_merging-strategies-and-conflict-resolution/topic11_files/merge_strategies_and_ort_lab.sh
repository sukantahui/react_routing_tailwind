#!/usr/bin/env bash
# ==============================================================================
# BASH LAB: MERGE STRATEGIES & ALGORITHMS (ORT VS RECURSIVE & STRATEGY OPTIONS)
# MODULE: 002_002_merging-strategies-and-conflict-resolution (Topic 11)
# INSTRUCTOR: Sukanta Hui (Coder & AccoTax, Barrackpore)
# ==============================================================================

set -euo pipefail

LAB_DIR="$HOME/git_strategies_ort_lab"
echo "=== Step 1: Initializing Sandbox Repository at $LAB_DIR ==="
rm -rf "$LAB_DIR"
mkdir -p "$LAB_DIR"
cd "$LAB_DIR"

git init -b main
git config user.name "Sukanta Hui"
git config user.email "sukanta@coderaccotax.in"

echo "Checking default merge strategy in current Git version ($(git --version)):"
# In Git 2.33+, default strategy is ort

echo "=== Step 2: Creating Base Client Ledger ==="
cat << 'EOF' > ledger.js
const CLIENT_NAME = "Barrackpore Sweets";
const ANNUAL_TURNOVER = 5000000;
const GST_PERCENT = 18;

function printSummary() {
    console.log(`${CLIENT_NAME}: Turnover ₹${ANNUAL_TURNOVER}`);
}
module.exports = { printSummary };
EOF

git add ledger.js
git commit -m "feat: initial client ledger record"

echo "=== Step 3: Divergent Branch with Renamed File and Directory (ORT Rename Detection) ==="
git switch -c feature/refactor-structure

mkdir -p src/billing
git mv ledger.js src/billing/clientLedger.js
sed -i 's/GST_PERCENT = 18/GST_PERCENT = 12/g' src/billing/clientLedger.js
echo "const AUDIT_CYCLE = 'Quarterly';" >> src/billing/clientLedger.js
git commit -am "refactor: move ledger to src/billing/ and update GST slab to 12%"

echo "=== Step 4: Divergent Edits on main (Concurrent Update on Old Path) ==="
git switch main

sed -i 's/ANNUAL_TURNOVER = 5000000/ANNUAL_TURNOVER = 7500000/g' ledger.js
git commit -am "feat: update client annual turnover to ₹75,00,000"

echo ""
echo "=== Step 5: Testing ORT Merge Engine with Automatic Directory & File Rename Detection ==="
echo "Executing: git merge -s ort feature/refactor-structure..."
git merge -s ort feature/refactor-structure -m "merge: integrate directory refactoring via modern ORT engine"

echo ""
echo "--- Post-Merge Verification: Inspecting Merged File Path & Content ---"
ls -la src/billing/clientLedger.js
cat src/billing/clientLedger.js

echo ""
echo "Notice how ORT automatically applied the turnover edit (₹75,00,000 from main) into the renamed file (src/billing/clientLedger.js from feature) with ZERO conflicts!"

echo ""
echo "=== Step 6: Testing Strategy Option (-X theirs) ==="
# Creating a small test conflict to demonstrate -X theirs
git switch -c feature/discount
sed -i 's/Quarterly/Bi-Monthly/g' src/billing/clientLedger.js
git commit -am "feat: change audit cycle to Bi-Monthly"

git switch main
sed -i 's/Quarterly/Annual/g' src/billing/clientLedger.js
git commit -am "feat: change audit cycle to Annual"

echo "Merging with -X theirs strategy option..."
git merge -X theirs feature/discount -m "merge: auto-accept incoming audit cycle via -X theirs"

echo ""
echo "Inspecting final resolved audit cycle (should be Bi-Monthly):"
grep "AUDIT_CYCLE" src/billing/clientLedger.js

echo ""
echo "=== Step 7: Verifying Final Commit Graph ==="
git log --graph --oneline --all

echo "=== Lab Complete: ORT strategy & strategy options demonstrated successfully! ==="
