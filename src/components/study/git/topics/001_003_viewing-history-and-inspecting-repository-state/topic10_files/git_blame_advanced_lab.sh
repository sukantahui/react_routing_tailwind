#!/usr/bin/env bash
# ==============================================================================
# Git Lab 001_003_10: Advanced git blame Filtering (-w and -L)
# Instructor: Sukanta Hui (Coder & AccoTax, Barrackpore)
# Cohort: Debangshu, Swadeep, Sachin, Mahima, Susmita, Abhronila, Tuhina
# ==============================================================================

set -e

echo "--------------------------------------------------------"
echo "Initializing Advanced Git Blame Sandbox..."
echo "--------------------------------------------------------"

LAB_DIR="git_blame_advanced_sandbox"
rm -rf "$LAB_DIR"
mkdir -p "$LAB_DIR"
cd "$LAB_DIR"

git init -b main

# Commit 1 (Author: Susmita - Real business logic)
GIT_AUTHOR_NAME="Susmita Database" \
GIT_AUTHOR_EMAIL="susmita@barrackpore-devs.org" \
GIT_AUTHOR_DATE="2026-09-08 11:00:00 +0530" \
cat << 'EOF' > tax_service.js
// Header documentation
function calculateSubtotal(items) {
  return items.reduce((acc, item) => acc + item.price, 0);
}

function calculateGST(subtotal) {
  const rate = 0.18;
  return subtotal * rate;
}

module.exports = { calculateSubtotal, calculateGST };
EOF
git add tax_service.js
git commit -m "feat(tax): implement calculateSubtotal and calculateGST functions"

# Commit 2 (Author: Swadeep - Linter/Prettier re-indentation pass)
GIT_AUTHOR_NAME="Swadeep SeniorDev" \
GIT_AUTHOR_EMAIL="swadeep@barrackpore-devs.org" \
GIT_AUTHOR_DATE="2026-09-14 10:00:00 +0530" \
cat << 'EOF' > tax_service.js
// Header documentation
function calculateSubtotal(items) {
    return items.reduce((acc, item) => acc + item.price, 0);
}

function calculateGST(subtotal) {
    const rate = 0.18;
    return subtotal * rate;
}

module.exports = { calculateSubtotal, calculateGST };
EOF
git add tax_service.js
git commit -m "style(format): re-indent codebase with 4 spaces instead of 2"
LINTER_COMMIT=$(git rev-parse HEAD)

echo ""
echo "=== 1. Standard Blame (Polluted by Swadeep's 4-space reformatting commit) ==="
git blame tax_service.js

echo ""
echo "=== 2. Blame with -w (Ignores whitespace, reveals Susmita as true author!) ==="
git blame -w tax_service.js

echo ""
echo "=== 3. Restricting Line Range: Blaming only calculateGST (-L 6,10) ==="
git blame -w -L 6,10 tax_service.js

echo ""
echo "=== 4. Ignoring Specific Reformatting Commit via --ignore-rev ==="
git blame --ignore-rev "$LINTER_COMMIT" -L 6,10 tax_service.js

echo ""
echo "--------------------------------------------------------"
echo "Lab completed successfully!"
echo "--------------------------------------------------------"
