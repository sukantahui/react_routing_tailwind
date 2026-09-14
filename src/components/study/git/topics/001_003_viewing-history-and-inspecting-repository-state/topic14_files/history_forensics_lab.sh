#!/usr/bin/env bash
# ==============================================================================
# SCRIPT: history_forensics_lab.sh
# MODULE: 001_003 - Viewing History & Inspecting Repository State
# TOPIC 14: Hands-on Terminal Lab: History Reconstruction & Pickaxe Forensics
# INSTRUCTOR: Sukanta Hui (Coder & AccoTax, Barrackpore)
# ==============================================================================
set -euo pipefail

echo "======================================================================"
echo "⚡ INITIALIZING HANDS-ON FORENSICS LAB: tax_engine_forensics_lab"
echo "======================================================================"

LAB_DIR="tax_engine_forensics_lab"
rm -rf "$LAB_DIR"
mkdir -p "$LAB_DIR"
cd "$LAB_DIR"

git init -b main

# Helper function to commit with author override
author_commit() {
  local name="$1"
  local email="$2"
  local date="$3"
  local msg="$4"
  GIT_AUTHOR_NAME="$name" GIT_AUTHOR_EMAIL="$email" GIT_AUTHOR_DATE="$date" \
  GIT_COMMITTER_NAME="$name" GIT_COMMITTER_EMAIL="$email" GIT_COMMITTER_DATE="$date" \
  git commit -m "$msg"
}

mkdir -p src/calculators config docs

# Step 1: Initial Commit by Debangshu
cat << 'EOF' > src/tax_calc.js
// Core Tax Calculator Module v1.0
// Author: Debangshu

export function calculateStandardGST(amount, rate) {
  if (amount <= 0) return 0;
  return (amount * rate) / 100;
}

export function calculateEmergencyVatExemption(amount, category) {
  // Emergency legacy exemption rule
  if (category === "MEDICINE_RELIEF") {
    return amount * 0.05;
  }
  return 0;
}
EOF

cat << 'EOF' > config/rates.json
{
  "cgst": 9.0,
  "sgst": 9.0,
  "igst": 18.0
}
EOF

git add .
author_commit "Debangshu Mukherjee" "debangshu@coderaccotax.in" "2026-01-05T10:00:00" "feat(core): initial tax calculation engine and rates config"

# Step 2: Documentation added by Swadeep
cat << 'EOF' > docs/ARCHITECTURE.md
# Tax Engine Architecture

This repository manages real-time GST and VAT deductions for SME clients across Barrackpore.
EOF
git add docs/ARCHITECTURE.md
author_commit "Swadeep Sen" "swadeep@coderaccotax.in" "2026-01-08T14:30:00" "docs: add initial architecture specification"

# Step 3: Feature addition by Mahima
cat << 'EOF' >> src/tax_calc.js

export function calculateCess(amount, luxuryIndex) {
  if (luxuryIndex > 5) {
    return amount * 0.12;
  }
  return 0;
}
EOF
git add src/tax_calc.js
author_commit "Mahima Shaw" "mahima@coderaccotax.in" "2026-01-12T11:15:00" "feat(cess): introduce luxury item cess calculation"

# Step 4: Branch creation for feature/gst-optimization
git checkout -b feature/gst-optimization

# Susmita refactors and moves tax_calc.js to calculators/gst_engine.js
mkdir -p src/calculators
git mv src/tax_calc.js src/calculators/gst_engine.js

# Susmita optimizes and accidentally removes calculateEmergencyVatExemption
cat << 'EOF' > src/calculators/gst_engine.js
// Optimized High-Throughput GST Engine v2.0
// Maintained by: Susmita

export function calculateStandardGST(amount, rate) {
  if (!amount || amount <= 0) return 0;
  return (amount * rate) / 100;
}

export function calculateCompositeGST(amount, turnover) {
  if (turnover < 15000000) {
    return amount * 0.01; // 1% composition scheme
  }
  return calculateStandardGST(amount, 18);
}

export function calculateCess(amount, luxuryIndex) {
  if (luxuryIndex > 5) {
    return amount * 0.12;
  }
  return 0;
}
EOF
git add .
author_commit "Susmita Nandy" "susmita@coderaccotax.in" "2026-01-18T16:45:00" "refactor(engine): relocate engine and optimize composition scheme (removes legacy vat)"

# Step 5: Formatting commit by Swadeep (Prettier auto-format)
cat << 'EOF' > src/calculators/gst_engine.js
// Optimized High-Throughput GST Engine v2.0
// Maintained by: Susmita

export function calculateStandardGST( amount, rate ) {
    if ( !amount || amount <= 0 ) return 0;
    return ( amount * rate ) / 100;
}

export function calculateCompositeGST( amount, turnover ) {
    if ( turnover < 15000000 ) {
        return amount * 0.01; // 1% composition scheme
    }
    return calculateStandardGST( amount, 18 );
}

export function calculateCess( amount, luxuryIndex ) {
    if ( luxuryIndex > 5 ) {
        return amount * 0.12;
    }
    return 0;
}
EOF
git add src/calculators/gst_engine.js
author_commit "Swadeep Sen" "swadeep@coderaccotax.in" "2026-01-20T09:00:00" "style: apply global prettier whitespace formatting"

# Step 6: Switch back to main and make a critical security hotfix
git checkout main
cat << 'EOF' >> config/rates.json
{
  "cgst": 9.0,
  "sgst": 9.0,
  "igst": 18.0,
  "security_audit_version": "2026.1"
}
EOF
git add config/rates.json
author_commit "Debangshu Mukherjee" "debangshu@coderaccotax.in" "2026-01-22T15:20:00" "fix(sec): update rate metadata for compliance audit"

echo ""
echo "======================================================================"
echo "✅ FORENSIC REPOSITORY BUILT SUCCESSFULLY!"
echo "======================================================================"
echo ""
echo "--- TASK 1: AUTHOR COMMIT METRICS ---"
echo "Command: git shortlog -sn --no-merges"
git shortlog -sn --no-merges
echo ""

echo "--- TASK 2: FIND DELETED FUNCTION (PICKAXE) ---"
echo "Command: git log -S \"calculateEmergencyVatExemption\" --oneline"
git log -S "calculateEmergencyVatExemption" --oneline
echo ""

echo "--- TASK 3: BRANCH DIVERGENCE AUDIT (SYMMETRIC DIFF) ---"
echo "Command: git log --left-right --graph --oneline main...feature/gst-optimization"
git log --left-right --graph --oneline main...feature/gst-optimization
echo ""

echo "--- TASK 4: BLAME WITH WHITESPACE & MOVEMENT IGNORED ---"
echo "Command: git blame -w -C -C -L 1,12 src/calculators/gst_engine.js"
git checkout feature/gst-optimization > /dev/null 2>&1
git blame -w -C -C -L 1,12 src/calculators/gst_engine.js
echo ""

echo "🎯 Lab setup complete. You can experiment further inside '$LAB_DIR'!"
