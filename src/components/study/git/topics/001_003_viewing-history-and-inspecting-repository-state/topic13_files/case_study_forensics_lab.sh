#!/usr/bin/env bash
# ==============================================================================
# Git Lab 001_003_13: Classroom Case Study - Production Bug Diagnosis
# Instructor: Sukanta Hui (Coder & AccoTax, Barrackpore)
# Cohort: Debangshu, Swadeep, Sachin, Mahima, Susmita, Abhronila, Tuhina
# ==============================================================================

set -e

echo "--------------------------------------------------------"
echo "Initializing Production Incident Forensics Lab..."
echo "--------------------------------------------------------"

LAB_DIR="case_study_discount_bug_sandbox"
rm -rf "$LAB_DIR"
mkdir -p "$LAB_DIR"
cd "$LAB_DIR"

git init -b main

mkdir -p src/billing

# Commit 1: Genesis commit with safety cap (Author: Susmita)
GIT_AUTHOR_NAME="Susmita Database" \
GIT_AUTHOR_EMAIL="susmita@barrackpore-devs.org" \
GIT_AUTHOR_DATE="2026-09-01 10:00:00 +0530" \
cat << 'EOF' > src/billing/discount_engine.js
const MAX_DISCOUNT_CAP = 1000; // In INR

function calculateDiscount(subtotal, tier) {
  let rate = tier === 'VIP' ? 0.10 : 0.05;
  let discount = subtotal * rate;
  return Math.min(discount, MAX_DISCOUNT_CAP);
}

module.exports = { calculateDiscount, MAX_DISCOUNT_CAP };
EOF
git add src/billing/discount_engine.js
git commit -m "feat(billing): initial discount engine with 1000 INR safety cap"

# Commit 2: Refactor that accidentally removed safety cap (Author: Swadeep)
GIT_AUTHOR_NAME="Swadeep SeniorDev" \
GIT_AUTHOR_EMAIL="swadeep@barrackpore-devs.org" \
GIT_AUTHOR_DATE="2026-09-08 14:00:00 +0530" \
cat << 'EOF' > src/billing/discount_engine.js
function calculateDiscount(subtotal, tier) {
  let rate = tier === 'VIP' ? 0.10 : 0.05;
  return subtotal * rate;
}

module.exports = { calculateDiscount };
EOF
git add src/billing/discount_engine.js
git commit -m "refactor(billing): simplify discount return expression"

# Commit 3: Temporary testing debug commit accidentally leaked! (Author: Debangshu)
GIT_AUTHOR_NAME="Debangshu Technical" \
GIT_AUTHOR_EMAIL="debangshu@barrackpore-devs.org" \
GIT_AUTHOR_DATE="2026-09-12 16:30:00 +0530" \
cat << 'EOF' > src/billing/discount_engine.js
function calculateDiscount(subtotal, tier) {
  let rate = tier === 'VIP' ? 0.50 : 0.05; // TEMP DEBUG TEST 50%
  return subtotal * rate;
}

module.exports = { calculateDiscount };
EOF
git add src/billing/discount_engine.js
git commit -m "test(promo): temp 50% discount test for festive flash sale"

echo ""
echo "=== Step 1: Diagnosing Current Faulty Line with git blame ==="
git blame -w -L 2,4 src/billing/discount_engine.js

echo ""
echo "=== Step 2: Investigating Commit Rationale with git show ==="
FAULTY_COMMIT=$(git blame -L 2,2 src/billing/discount_engine.js | awk '{print $1}')
echo "Faulty Commit Hash: $FAULTY_COMMIT"
git show "$FAULTY_COMMIT"

echo ""
echo "=== Step 3: Finding when MAX_DISCOUNT_CAP was removed with Pickaxe (-S) ==="
git log -S "MAX_DISCOUNT_CAP" -p

echo ""
echo "=== Step 4: Restoring and Verifying Hotfix ==="
cat << 'EOF' > src/billing/discount_engine.js
const MAX_DISCOUNT_CAP = 1000; // In INR

function calculateDiscount(subtotal, tier) {
  let rate = tier === 'VIP' ? 0.10 : 0.05;
  let discount = subtotal * rate;
  return Math.min(discount, MAX_DISCOUNT_CAP);
}

module.exports = { calculateDiscount, MAX_DISCOUNT_CAP };
EOF

git add src/billing/discount_engine.js
git commit -m "fix(billing): restore 10% VIP rate and MAX_DISCOUNT_CAP safety ceiling"
git tag -a v1.1.1 -m "Production hotfix v1.1.1"

echo ""
echo "=== Step 5: Verifying Hotfix Commit Delta ==="
git show --stat HEAD

echo ""
echo "--------------------------------------------------------"
echo "Case study simulation complete! Production bug resolved."
echo "--------------------------------------------------------"
