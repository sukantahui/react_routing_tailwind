#!/usr/bin/env bash
# ==============================================================================
# LAB DRILL: THREE-WAY MERGE & MERGE-BASE COMPUTATION
# Instructor: Sukanta Hui (Coder & AccoTax, Barrackpore)
# ==============================================================================

set -e
echo "=== Step 1: Initializing 3-Way Merge Sandbox ==="
SANDBOX_DIR="three_way_merge_sandbox"
rm -rf "$SANDBOX_DIR"
mkdir "$SANDBOX_DIR"
cd "$SANDBOX_DIR"

git init
git config user.name "Sachin Sharma"
git config user.email "sachin.barrackpore@example.com"

echo "=== Step 2: Creating Common Ancestor Commit C1 (Merge Base) ==="
cat << 'EOF' > ledger.txt
[Company Ledger v1.0]
Header: AccoTax Barrackpore
Section A: General Accounts
Section B: Tax Accounts
Footer: Authorized Signatory
EOF

git add ledger.txt && git commit -m "Commit C1: initial common ancestor ledger"
BASE_SHA=$(git rev-parse HEAD)
echo "Merge Base SHA is: $BASE_SHA"

echo "=== Step 3: Forking feature-tax and modifying Section B ==="
git switch -c feature-tax
cat << 'EOF' > ledger.txt
[Company Ledger v1.0]
Header: AccoTax Barrackpore
Section A: General Accounts
Section B: GST 18% Tax Calculations (Mahima)
Footer: Authorized Signatory
EOF
git commit -am "Commit F1: Mahima updates Section B"

echo "=== Step 4: Switching to main and modifying Section A (Divergence!) ==="
git switch main
cat << 'EOF' > ledger.txt
[Company Ledger v1.0]
Header: AccoTax Barrackpore
Section A: General Accounts & Payroll (Sachin)
Section B: Tax Accounts
Footer: Authorized Signatory
EOF
git commit -am "Commit M1: Sachin updates Section A"

echo "=== Step 5: Computing the Merge Base programmatically ==="
CALC_BASE=$(git merge-base main feature-tax)
echo "Calculated Merge Base: $CALC_BASE"
echo "Expected Base SHA:     $BASE_SHA"

if [ "$CALC_BASE" = "$BASE_SHA" ]; then
    echo "SUCCESS: git merge-base correctly identified Commit C1 as the common ancestor!"
fi

echo "=== Step 6: Executing 3-Way Merge ==="
git merge feature-tax -m "Merge branch 'feature-tax' into main (3-Way Merge)"

echo "=== Step 7: Inspecting Synthesized Result ==="
echo "Content of merged ledger.txt:"
cat ledger.txt

echo "=== Step 8: Verifying Merge Commit Parents ==="
git log --graph --oneline -n 3
MERGE_COMMIT_SHA=$(git rev-parse HEAD)
echo "Parents of Merge Commit ($MERGE_COMMIT_SHA):"
git rev-parse HEAD^1 HEAD^2

echo "=== Lab Completed Successfully! ==="
