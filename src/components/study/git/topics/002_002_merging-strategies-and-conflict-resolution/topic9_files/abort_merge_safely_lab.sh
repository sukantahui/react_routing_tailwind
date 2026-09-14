#!/usr/bin/env bash
# ==============================================================================
# BASH LAB: ABORTING A MERGE SAFELY WITH git merge --abort
# MODULE: 002_002_merging-strategies-and-conflict-resolution (Topic 9)
# INSTRUCTOR: Sukanta Hui (Coder & AccoTax, Barrackpore)
# ==============================================================================

set -euo pipefail

LAB_DIR="$HOME/git_abort_merge_lab"
echo "=== Step 1: Initializing Sandbox Repository at $LAB_DIR ==="
rm -rf "$LAB_DIR"
mkdir -p "$LAB_DIR"
cd "$LAB_DIR"

git init -b main
git config user.name "Sukanta Hui"
git config user.email "sukanta@coderaccotax.in"

echo "=== Step 2: Creating Stable Tax Engine ==="
cat << 'EOF' > taxEngine.js
// Coder & AccoTax Stable Core - Barrackpore
const GST_DEFAULT = 0.18;
function calculateTax(amount) {
    return amount * GST_DEFAULT;
}
module.exports = { calculateTax };
EOF

git add taxEngine.js
git commit -m "feat: stable base tax engine with 18% GST"

echo "=== Step 3: Divergent Feature Branch: feature/experimental ==="
git switch -c feature/experimental
cat << 'EOF' > taxEngine.js
// Coder & AccoTax Experimental - Barrackpore
const GST_DEFAULT = 0.40; // Experimental 40% Super Luxury Tax
function calculateTax(amount) {
    return amount * GST_DEFAULT;
}
module.exports = { calculateTax };
EOF
git commit -am "feat(tax): set experimental 40% rate"

echo "=== Step 4: Updating main branch ==="
git switch main
cat << 'EOF' > taxEngine.js
// Coder & AccoTax Main - Barrackpore
const GST_DEFAULT = 0.12; // Production 12% reduced rate
function calculateTax(amount) {
    return amount * GST_DEFAULT;
}
module.exports = { calculateTax };
EOF
git commit -am "feat(tax): set production 12% rate"

echo "=== Step 5: Triggering Merge Conflict ==="
set +e
git merge feature/experimental
set -e

echo ""
echo "--- Active Merge State ---"
git status
echo "Presence of MERGE_HEAD in .git:"
ls -la .git/MERGE_HEAD

echo ""
echo "=== Step 6: Executing Safe Abort: git merge --abort ==="
git merge --abort

echo ""
echo "--- Post-Abort Repository Status ---"
git status

echo ""
echo "Verifying that .git/MERGE_HEAD is completely gone:"
if [ ! -f .git/MERGE_HEAD ]; then
    echo "SUCCESS: .git/MERGE_HEAD removed cleanly by Git!"
fi

echo ""
echo "Verifying clean taxEngine.js file on main (should be 12% production rate):"
cat taxEngine.js

echo ""
echo "=== Lab Complete: git merge --abort verified with complete rollback safety! ==="
