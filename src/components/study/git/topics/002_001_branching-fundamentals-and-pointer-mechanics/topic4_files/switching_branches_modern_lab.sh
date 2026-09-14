#!/usr/bin/env bash
# ==============================================================================
# LAB DRILL: SWITCHING BRANCHES (MODERN git switch VS LEGACY git checkout)
# Instructor: Sukanta Hui (Coder & AccoTax, Barrackpore)
# ==============================================================================

set -e
echo "=== Step 1: Setting up Repository for Switching Drills ==="
SANDBOX_DIR="switching_branches_sandbox"
rm -rf "$SANDBOX_DIR"
mkdir "$SANDBOX_DIR"
cd "$SANDBOX_DIR"

git init
git config user.name "Abhronila Das"
git config user.email "abhronila.barrackpore@example.com"

echo "=== Step 2: Creating Main Branch Baseline ==="
echo "AccoTax Billing Master v1" > app.js
git add app.js
git commit -m "feat: initial billing module"

echo "=== Step 3: Creating and Switching to feature-gst with git switch ==="
git branch feature-gst
echo "HEAD before switch:"
cat .git/HEAD

git switch feature-gst
echo "HEAD after switch:"
cat .git/HEAD

echo "=== Step 4: Making a commit on feature-gst ==="
echo "function calcGST(amt) { return amt * 0.18; }" >> app.js
git commit -am "feat: implement 18% GST calculation"

echo "=== Step 5: Toggling back and forth using 'git switch -' ==="
git switch -
echo "Back on main. app.js content:"
cat app.js

git switch -
echo "Back on feature-gst. app.js content:"
cat app.js

echo "=== Step 6: Testing dirty working tree protection ==="
git switch main
echo "// Temporary uncommitted experiment" >> app.js

echo "Attempting to switch to feature-gst with conflicting dirty file:"
if git switch feature-gst 2>&1; then
    echo "Switch succeeded without conflict"
else
    echo "Git safely blocked branch switch to prevent overwriting dirty uncommitted edits!"
fi

echo "Cleaning dirty changes with modern git restore:"
git restore app.js

echo "Now switching cleanly:"
git switch feature-gst
echo "=== Lab Completed Successfully! ==="
