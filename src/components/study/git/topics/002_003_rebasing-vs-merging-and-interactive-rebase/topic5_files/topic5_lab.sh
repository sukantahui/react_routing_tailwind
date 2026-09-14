#!/usr/bin/env bash
# ==============================================================================
# Git Lab 002_003_05: Handling Conflicts During Git Rebase
# Instructor: Sukanta Hui (Coder & AccoTax, Barrackpore)
# ==============================================================================

set -e

LAB_DIR="$HOME/git_rebase_conflict_lab5"
rm -rf "$LAB_DIR"
mkdir -p "$LAB_DIR"
cd "$LAB_DIR"

echo "=== 1. Initialize Repo and Base Calculator ==="
git init
git config user.name "Sukanta Hui"
git config user.email "sukanta@accotax.in"

cat << 'EOF' > TaxEngine.js
// AccoTax Barrackpore Tax Engine
export function calculateTax(income) {
  return income * 0.10; // Standard 10%
}
EOF
git add TaxEngine.js
git commit -m "feat: initial 10% tax rate"

echo "=== 2. Feature branch modifies TaxEngine ==="
git switch -c feature/tax-rebate
cat << 'EOF' > TaxEngine.js
// AccoTax Barrackpore Tax Engine
export function calculateTax(income) {
  // Sachin's feature: 87A rebate
  if (income <= 700000) return 0;
  return income * 0.10;
}
EOF
git add TaxEngine.js
git commit -m "feat: add section 87A ₹7 Lakh tax rebate"

echo "=== 3. Main branch also modifies TaxEngine concurrently ==="
git switch main
cat << 'EOF' > TaxEngine.js
// AccoTax Barrackpore Tax Engine
export function calculateTax(income) {
  // Main update: 15% standard rate for high earners
  if (income > 1500000) return income * 0.15;
  return income * 0.10;
}
EOF
git add TaxEngine.js
git commit -m "feat: add 15% surcharge bracket for income > ₹15 Lakh"

echo "=== 4. Rebase and Trigger Conflict ==="
git switch feature/tax-rebate
echo "Attempting rebase (expected conflict)..."
git rebase main || true

echo ""
echo "=== 5. Inspect Conflict State ==="
git status

echo ""
echo "=== 6. Resolve Conflict Manually ==="
cat << 'EOF' > TaxEngine.js
// AccoTax Barrackpore Tax Engine
export function calculateTax(income) {
  // Unified logic: 87A rebate and 15% surcharge
  if (income <= 700000) return 0;
  if (income > 1500000) return income * 0.15;
  return income * 0.10;
}
EOF

echo "Staging resolved file..."
git add TaxEngine.js

echo "Continuing rebase with git rebase --continue..."
git rebase --continue

echo ""
echo "=== 7. Verify Successful Linear History ==="
git log --graph --oneline --decorate --all

echo "=== Lab 5 Completed Successfully! ==="
