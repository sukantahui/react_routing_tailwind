#!/usr/bin/env bash
# ==============================================================================
# LAB SCRIPT: Topic 7 - The Philosophy of Atomic Commits
# Module: 001_002_git-three-tree-architecture-and-basic-workflow
# Educator: Sukanta Hui (Coder & AccoTax, Barrackpore)
# ==============================================================================

set -e
LAB_DIR="/tmp/atomic_commits_lab_$(date +%s)"
mkdir -p "$LAB_DIR"
cd "$LAB_DIR"

echo "🧪 [STEP 1] Initializing lab repository..."
git init -b main
git config user.name "Sukanta Hui Student"
git config user.email "student@coderaccotax.com"

echo "🧪 [STEP 2] Committing Atomic Step 1: Base Invoice Calculation..."
cat << 'EOF' > invoice.js
export function calculateTotal(items) {
  return items.reduce((acc, item) => acc + item.price * item.qty, 0);
}
EOF
git add invoice.js
git commit -m "feat(invoice): implement base total calculation"

echo "🧪 [STEP 3] Committing Atomic Step 2: Unit Test Suite..."
cat << 'EOF' > invoice.test.js
import { calculateTotal } from './invoice.js';

const mockItems = [{ price: 100, qty: 2 }, { price: 50, qty: 1 }];
if (calculateTotal(mockItems) !== 250) {
  throw new Error("Test Failed");
}
console.log("Invoice tests passed cleanly!");
EOF
git add invoice.test.js
git commit -m "test(invoice): add unit tests for base total calculation"

echo "🧪 [STEP 4] Committing Atomic Step 3: Refactoring Discount Logic..."
cat << 'EOF' > invoice.js
export function applyDiscount(subtotal, discountPercent = 0) {
  return subtotal * (1 - discountPercent / 100);
}

export function calculateTotal(items, discountPercent = 0) {
  const subtotal = items.reduce((acc, item) => acc + item.price * item.qty, 0);
  return applyDiscount(subtotal, discountPercent);
}
EOF
git add invoice.js
git commit -m "refactor(invoice): extract discount computation into modular helper"

echo "========================================================"
echo "📊 ATOMIC COMMITS HISTORY (Notice discrete logical steps):"
echo "========================================================"
git log --oneline --decorate --graph

echo ""
echo "🧪 [STEP 5] Demonstrating clean independent revert of Step 3:"
git revert HEAD --no-edit

echo ""
echo "📊 LOG AFTER ATOMIC REVERT:"
git log --oneline -n 3

echo ""
echo "✅ Lab execution complete. Clean up: rm -rf $LAB_DIR"
