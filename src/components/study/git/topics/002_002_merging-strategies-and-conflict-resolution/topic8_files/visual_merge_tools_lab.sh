#!/usr/bin/env bash
# ==============================================================================
# BASH LAB: CONFIGURING AND USING GRAPHICAL MERGE TOOLS (git mergetool)
# MODULE: 002_002_merging-strategies-and-conflict-resolution (Topic 8)
# INSTRUCTOR: Sukanta Hui (Coder & AccoTax, Barrackpore)
# ==============================================================================

set -euo pipefail

LAB_DIR="$HOME/git_mergetool_config_lab"
echo "=== Step 1: Initializing Sandbox Repository at $LAB_DIR ==="
rm -rf "$LAB_DIR"
mkdir -p "$LAB_DIR"
cd "$LAB_DIR"

git init -b main
git config user.name "Sukanta Hui"
git config user.email "sukanta@coderaccotax.in"

echo "=== Step 2: Configuring VS Code as the Official Visual Merge Tool ==="
git config merge.tool vscode
git config mergetool.vscode.cmd 'code --wait --merge "$LOCAL" "$REMOTE" "$BASE" "$MERGED"'
git config mergetool.prompt false
git config mergetool.keepBackup false

echo "Current Git Mergetool Configuration:"
git config --get-regexp merge.*

echo ""
echo "=== Step 3: Creating Base Client Rate Card ==="
cat << 'EOF' > rateCard.json
{
  "currency": "INR",
  "organization": "Coder & AccoTax Barrackpore",
  "gstSlab": 18,
  "consultingHour": 1500
}
EOF

git add rateCard.json
git commit -m "feat: base corporate rate card with 1500 INR hourly rate"

echo "=== Step 4: Creating Divergent Branch: feature/premium ==="
git switch -c feature/premium
cat << 'EOF' > rateCard.json
{
  "currency": "INR",
  "organization": "Coder & AccoTax Barrackpore",
  "gstSlab": 28,
  "consultingHour": 3500
}
EOF
git commit -am "feat(rates): update luxury consulting hour to 3500 INR and GST to 28%"

echo "=== Step 5: Creating Divergent Changes on main (Standard Adjustment) ==="
git switch main
cat << 'EOF' > rateCard.json
{
  "currency": "INR",
  "organization": "Coder & AccoTax Barrackpore",
  "gstSlab": 18,
  "consultingHour": 2000
}
EOF
git commit -am "feat(rates): update standard consulting hour to 2000 INR"

echo "=== Step 6: Triggering Merge Conflict ==="
set +e
git merge feature/premium
set -e

echo ""
echo "=== Step 7: Inspecting Mergetool Status ==="
echo "Files ready for visual merge tool:"
git diff --name-only --diff-filter=U

echo ""
echo "Note: In a GUI terminal with VS Code installed, running 'git mergetool' opens the 3-Way Merge Editor."
echo "Simulating automated resolution of the \$MERGED file..."

cat << 'EOF' > rateCard.json
{
  "currency": "INR",
  "organization": "Coder & AccoTax Barrackpore",
  "gstSlab": 18,
  "consultingHour": 2000,
  "premiumConsultingHour": 3500
}
EOF

git add rateCard.json
git commit -m "merge: resolve rate card conflict with dual standard and premium pricing"

echo ""
echo "=== Step 8: Verifying Git Log Graph ==="
git log --graph --oneline --all

echo "=== Lab Complete: Mergetool configuration and workflow simulated successfully! ==="
