#!/usr/bin/env bash
# ==============================================================================
# BASH LAB: END-TO-END CONFLICT RESOLUTION WORKFLOW
# MODULE: 002_002_merging-strategies-and-conflict-resolution (Topic 7)
# INSTRUCTOR: Sukanta Hui (Coder & AccoTax, Barrackpore)
# ==============================================================================

set -euo pipefail

LAB_DIR="$HOME/git_conflict_resolution_workflow_lab"
echo "=== Step 1: Initializing Sandbox Repository at $LAB_DIR ==="
rm -rf "$LAB_DIR"
mkdir -p "$LAB_DIR"
cd "$LAB_DIR"

git init -b main
git config user.name "Sukanta Hui"
git config user.email "sukanta@coderaccotax.in"

echo "=== Step 2: Creating Base Salary Calculator ==="
cat << 'EOF' > payroll.js
// Coder & AccoTax Payroll Module - Barrackpore
function calculateNetSalary(basicPay) {
    const HRA_PERCENT = 0.20; // 20% House Rent Allowance
    const PF_DEDUCTION = 1800; // Standard Provident Fund
    return basicPay + (basicPay * HRA_PERCENT) - PF_DEDUCTION;
}

module.exports = { calculateNetSalary };
EOF

git add payroll.js
git commit -m "feat: initial payroll calculation logic"

echo "=== Step 3: Branching into feature/metro-hra (Sachin's changes) ==="
git switch -c feature/metro-hra

# Sachin updates HRA to 24% for Kolkata metro employees
cat << 'EOF' > payroll.js
// Coder & AccoTax Payroll Module - Barrackpore
function calculateNetSalary(basicPay) {
    const HRA_PERCENT = 0.24; // 24% Metro Kolkata Allowance
    const PF_DEDUCTION = 1800; // Standard Provident Fund
    return basicPay + (basicPay * HRA_PERCENT) - PF_DEDUCTION;
}

module.exports = { calculateNetSalary };
EOF

git commit -am "feat(payroll): update HRA to 24% for Kolkata metro tier"

echo "=== Step 4: Branching main into feature/revised-pf (Susmita's changes) ==="
git switch main

# Susmita updates HRA to 27% (New Government Rule) and PF to 2000
cat << 'EOF' > payroll.js
// Coder & AccoTax Payroll Module - Barrackpore
function calculateNetSalary(basicPay) {
    const HRA_PERCENT = 0.27; // 27% National Benchmark HRA
    const PF_DEDUCTION = 2000; // Revised PF Slab
    return basicPay + (basicPay * HRA_PERCENT) - PF_DEDUCTION;
}

module.exports = { calculateNetSalary };
EOF

git commit -am "feat(payroll): revise national benchmark HRA to 27% and PF to 2000"

echo "=== Step 5: Initiating Merge & Capturing Conflict State ==="
set +e
git merge feature/metro-hra
set -e

echo ""
echo "=== Step 6: Step 1 of Workflow: git status ==="
git status

echo ""
echo "=== Step 7: Step 2 of Workflow: Inspecting git diff ==="
git diff

echo ""
echo "=== Step 8: Step 3 of Workflow: Editing & Cleaning Conflict Markers ==="
# Sukanta Sir resolves by making HRA configurable by city location and setting PF to 2000
cat << 'EOF' > payroll.js
// Coder & AccoTax Payroll Module - Barrackpore (Resolved)
function calculateNetSalary(basicPay, isMetro = true) {
    const HRA_PERCENT = isMetro ? 0.27 : 0.24;
    const PF_DEDUCTION = 2000; // Revised PF Slab
    return basicPay + (basicPay * HRA_PERCENT) - PF_DEDUCTION;
}

module.exports = { calculateNetSalary };
EOF

echo "--- Resolved payroll.js content: ---"
cat payroll.js

echo ""
echo "=== Step 9: Step 4 of Workflow: Staging Resolved File ==="
git add payroll.js
git status

echo ""
echo "=== Step 10: Step 5 of Workflow: Finalizing Merge Commit ==="
git commit -m "merge: resolve payroll conflict by integrating city-based metro HRA and revised PF"

echo ""
echo "=== Step 11: Verifying Final Git Topology ==="
git log --graph --oneline --all

echo "=== Lab Complete: 5-step conflict resolution workflow executed flawlessly! ==="
