#!/usr/bin/env bash
# ==============================================================================
# LAB DRILL: CREATING AND SWITCHING IN ONE STEP (git switch -c / git checkout -b)
# Instructor: Sukanta Hui (Coder & AccoTax, Barrackpore)
# ==============================================================================

set -e
echo "=== Step 1: Initializing Sandbox Repository ==="
SANDBOX_DIR="atomic_branch_sandbox"
rm -rf "$SANDBOX_DIR"
mkdir "$SANDBOX_DIR"
cd "$SANDBOX_DIR"

git init
git config user.name "Debangshu Poddar"
git config user.email "debangshu.barrackpore@example.com"

echo "=== Step 2: Creating Initial Production Baseline ==="
echo "AccoTax Payroll Engine v1.0" > payroll.js
git add payroll.js
git commit -m "feat: initial payroll module"

echo "=== Step 3: Atomic Creation & Switch with 'git switch -c' ==="
git switch -c feature/epf-calculation

echo "Inspecting current branch and .git/HEAD:"
git branch --show-current
cat .git/HEAD

echo "=== Step 4: Making a commit on the new branch ==="
echo "function calcEPF(basic) { return basic * 0.12; }" >> payroll.js
git commit -am "feat: add 12% employee provident fund (EPF) calculator"

echo "=== Step 5: Testing legacy 'git checkout -b' for backward compatibility ==="
git switch -c feature/bonus-calculation
echo "function calcBonus(salary) { return salary * 0.0833; }" >> payroll.js
git commit -am "feat: add statutory annual bonus calculation"

echo "=== Step 6: Testing Uppercase '-C' to reset branch pointer ==="
echo "Attempting to create duplicate branch with lowercase -c (should fail safely):"
if git switch -c feature/epf-calculation 2>&1; then
    echo "Unexpected success"
else
    echo "Safely blocked! Branch already exists."
fi

echo "Forcing reset of branch pointer with uppercase -C:"
git switch -C feature/epf-calculation
echo "Successfully reset and switched using -C!"

echo "=== Lab Completed Successfully! ==="
