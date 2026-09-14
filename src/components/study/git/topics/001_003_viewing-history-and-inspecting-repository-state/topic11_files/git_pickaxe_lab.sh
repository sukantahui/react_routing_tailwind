#!/usr/bin/env bash
# ==============================================================================
# Git Lab 001_003_11: The Pickaxe Operator (git log -S)
# Instructor: Sukanta Hui (Coder & AccoTax, Barrackpore)
# Cohort: Debangshu, Swadeep, Sachin, Mahima, Susmita, Abhronila, Tuhina
# ==============================================================================

set -e

echo "--------------------------------------------------------"
echo "Initializing Pickaxe Operator Sandbox..."
echo "--------------------------------------------------------"

LAB_DIR="git_pickaxe_sandbox"
rm -rf "$LAB_DIR"
mkdir -p "$LAB_DIR"
cd "$LAB_DIR"

git init -b main

# Commit 1: Genesis commit
cat << 'EOF' > app.js
console.log("App starting...");
EOF
git add app.js
git commit -m "feat(core): initial app setup"

# Commit 2: Added festive discount function (Author: Debangshu)
GIT_AUTHOR_NAME="Debangshu Technical" \
GIT_AUTHOR_EMAIL="debangshu@barrackpore-devs.org" \
GIT_AUTHOR_DATE="2026-09-05 10:00:00 +0530" \
cat << 'EOF' >> app.js

function calculateFestiveDiscount(total) {
  return total * 0.15; // 15% Puja Festival Discount
}
EOF
git add app.js
git commit -m "feat(promo): add 15% festive discount calculation helper"

# Commit 3: Modified other logic (Author: Susmita)
GIT_AUTHOR_NAME="Susmita Database" \
GIT_AUTHOR_EMAIL="susmita@barrackpore-devs.org" \
GIT_AUTHOR_DATE="2026-09-08 14:00:00 +0530" \
echo "const DB_URI = 'postgres://localhost:5432/barrackpore';" >> app.js
git add app.js
git commit -m "feat(db): add database connection string"

# Commit 4: Accidentally deleted the festive discount function during refactor! (Author: Swadeep)
GIT_AUTHOR_NAME="Swadeep SeniorDev" \
GIT_AUTHOR_EMAIL="swadeep@barrackpore-devs.org" \
GIT_AUTHOR_DATE="2026-09-12 16:30:00 +0530" \
cat << 'EOF' > app.js
console.log("App starting...");
const DB_URI = 'postgres://localhost:5432/barrackpore';
EOF
git add app.js
git commit -m "refactor(cleanup): streamline core app entrypoint"

echo ""
echo "=== 1. Searching for Deleted Function via 'git grep' (Fails because it is deleted on disk!) ==="
git grep "calculateFestiveDiscount" || echo "--> Result: NOT FOUND in active working tree!"

echo ""
echo "=== 2. Mining History via Pickaxe Operator (git log -S) ==="
git log -S "calculateFestiveDiscount" --oneline

echo ""
echo "=== 3. Showing Exact Add/Delete Diffs for the String ==="
git log -S "calculateFestiveDiscount" -p

echo ""
echo "=== 4. Extracting the Lost Function from the Pre-Deletion Snapshot ==="
DELETION_COMMIT=$(git log -S "calculateFestiveDiscount" -n 1 --format=%h)
echo "Deletion Commit: $DELETION_COMMIT"
echo "Code as it existed in parent ($DELETION_COMMIT~1):"
git show "$DELETION_COMMIT~1:app.js"

echo ""
echo "--------------------------------------------------------"
echo "Lab completed successfully!"
echo "--------------------------------------------------------"
