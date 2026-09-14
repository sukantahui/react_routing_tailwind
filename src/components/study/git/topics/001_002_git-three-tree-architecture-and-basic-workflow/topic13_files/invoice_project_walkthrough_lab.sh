#!/usr/bin/env bash
# ==============================================================================
# LAB SCRIPT: Topic 13 - Invoice Management Classroom Walkthrough
# Module: 001_002_git-three-tree-architecture-and-basic-workflow
# Educator: Sukanta Hui (Coder & AccoTax, Barrackpore)
# ==============================================================================

set -e
LAB_DIR="/tmp/invoice_walkthrough_lab_$(date +%s)"
mkdir -p "$LAB_DIR"
cd "$LAB_DIR"

echo "🚀 [START] Barrackpore Coder & AccoTax Invoice Walkthrough Lab"

echo "🧪 [COMMIT 1 - Sachin] Initialize repo and .gitignore..."
git init -b main
cat << 'EOF' > .gitignore
node_modules/
dist/
.env
.env.local
*.log
.DS_Store
Thumbs.db
EOF
git config user.name "Sachin (Coder & AccoTax)"
git config user.email "sachin@coderaccotax.com"
git add .gitignore
git commit -m "chore: initialize repository and configure standard .gitignore"

echo "🧪 [COMMIT 2 - Mahima] Scaffold core invoice models..."
git config user.name "Mahima (Coder & AccoTax)"
git config user.email "mahima@coderaccotax.com"
cat << 'EOF' > invoice_schema.json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "title": "Barrackpore Invoice Schema",
  "type": "object",
  "properties": {
    "invoiceId": { "type": "string" },
    "customer": { "type": "string" },
    "items": { "type": "array" },
    "taxRate": { "type": "number" }
  },
  "required": ["invoiceId", "customer", "items", "taxRate"]
}
EOF
git add invoice_schema.json
git commit -m "feat(core): scaffold JSON schema definition for invoice data"

echo "🧪 [COMMIT 3 - Susmita] Add unit tests for calculations..."
git config user.name "Susmita (Coder & AccoTax)"
git config user.email "susmita@coderaccotax.com"
cat << 'EOF' > invoice.test.js
// Mock unit test suite
console.log("Running Invoice Calculation Test Suite...");
const items = [{ price: 100, qty: 2 }, { price: 50, qty: 1 }];
const subtotal = 250;
const tax = subtotal * 0.18;
if (subtotal + tax !== 295) {
  throw new Error("Test Failed");
}
console.log("✅ All tests passed cleanly!");
EOF
git add invoice.test.js
git commit -m "test(core): create unit test assertions for GST and subtotal math"

echo "🧪 [COMMIT 4 - Sachin] Implement GST calculation engine..."
git config user.name "Sachin (Coder & AccoTax)"
git config user.email "sachin@coderaccotax.com"
cat << 'EOF' > invoice.js
export function calculateSubtotal(items) {
  return items.reduce((sum, item) => sum + item.price * item.qty, 0);
}

export function calculateGST(subtotal, rate = 0.18) {
  return subtotal * rate;
}

export function calculateGrandTotal(items, rate = 0.18) {
  const subtotal = calculateSubtotal(items);
  const gst = calculateGST(subtotal, rate);
  return subtotal + gst;
}
EOF
git add invoice.js
git commit -m "feat(calc): implement subtotal and 18% GST calculation algorithms"

echo "🧪 [COMMIT 5 - Abhronila] Fix zero-item edge cases..."
git config user.name "Abhronila (Coder & AccoTax)"
git config user.email "abhronila@coderaccotax.com"
cat << 'EOF' > invoice.js
export function calculateSubtotal(items = []) {
  if (!items || items.length === 0) return 0;
  return items.reduce((sum, item) => sum + (item.price || 0) * (item.qty || 1), 0);
}

export function calculateGST(subtotal = 0, rate = 0.18) {
  if (subtotal <= 0) return 0;
  return Math.round(subtotal * rate * 100) / 100;
}

export function calculateGrandTotal(items = [], rate = 0.18) {
  const subtotal = calculateSubtotal(items);
  const gst = calculateGST(subtotal, rate);
  return subtotal + gst;
}
EOF
git add invoice.js
git commit -m "fix(calc): guard against empty arrays and add two-decimal rounding"

echo "🧪 [COMMIT 6 - Debangshu] Refactor discount computation..."
git config user.name "Debangshu (Coder & AccoTax)"
git config user.email "debangshu@coderaccotax.com"
cat << 'EOF' > discount.js
export function applyFestiveDiscount(subtotal, couponCode = "") {
  if (couponCode === "BARRACKPORE2026") {
    return subtotal * 0.90; // 10% discount
  }
  return subtotal;
}
EOF
git add discount.js
git commit -m "refactor(calc): modularize festive promotional discount logic"

echo "🧪 [COMMIT 7 - Susmita] Complete documentation in README..."
git config user.name "Susmita (Coder & AccoTax)"
git config user.email "susmita@coderaccotax.com"
cat << 'EOF' > README.md
# Barrackpore Invoice Management Engine

Architected by the Coder & AccoTax student cohort under mentorship of Sukanta Hui.

## Features
- JSON Schema invoice validation
- 18% GST calculation with 2-decimal round-off guarantees
- Festive promotional discount handler
- 100% test coverage and atomic commit history

## Verification
\`\`\`bash
node invoice.test.js
\`\`\`
EOF
git add README.md
git commit -m "docs: add comprehensive project README and verification instructions"

echo "========================================================"
echo "📊 COMPLETE WALKTHROUGH COMMIT LOG GRAPH:"
echo "========================================================"
git log --graph --pretty=format:'%C(yellow)%h%Creset -%C(cyan)%d%Creset %s %C(green)(%cr)%Creset %C(bold blue)<%an>%Creset' --abbrev-commit

echo ""
echo "========================================================"
echo "🧪 [VERIFICATION] Running automated tests:"
echo "========================================================"
node invoice.test.js

echo ""
echo "✅ Lab execution complete. Clean up: rm -rf $LAB_DIR"
