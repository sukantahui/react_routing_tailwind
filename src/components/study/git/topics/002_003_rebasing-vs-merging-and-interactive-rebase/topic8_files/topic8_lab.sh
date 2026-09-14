#!/usr/bin/env bash
# ==============================================================================
# Git Lab 002_003_08: Interactive Directives Sandbox (pick, reword, squash, fixup, drop, exec)
# Instructor: Sukanta Hui (Coder & AccoTax, Barrackpore)
# ==============================================================================

set -e

LAB_DIR="$HOME/git_directives_lab8"
rm -rf "$LAB_DIR"
mkdir -p "$LAB_DIR"
cd "$LAB_DIR"

echo "=== 1. Initialize Git Repo with Test Script ==="
git init
git config user.name "Sukanta Hui"
git config user.email "sukanta@accotax.in"

cat << 'EOF' > test.sh
#!/usr/bin/env bash
echo "Running AccoTax unit tests..."
grep -q "PASS" app.js || exit 1
echo "All tests passed!"
EOF
chmod +x test.sh

echo "PASS: Init" > app.js
git add app.js test.sh
git commit -m "feat: initial test setup"

echo "=== 2. Add multiple commits to test directives ==="
echo "PASS: Section 194C TDS" >> app.js
git add app.js
git commit -m "feat: tds module"

echo "PASS: fix syntax" >> app.js
git add app.js
git commit -m "fix typo in tds"

echo "TEMP BUGGY DEBUG" >> app.js
git add app.js
git commit -m "wip: bad commit to drop"

echo "PASS: finish tds" >> app.js
git add app.js
git commit -m "feat: complete tds feature"

echo ""
echo "=== 3. Git log before interactive rebase ==="
git log --oneline

echo ""
echo "=== 4. Executing simulated interactive rebase using sed ==="
# We will squash the fixup, drop the bad commit, and run test.sh via exec
export GIT_SEQUENCE_EDITOR="sed -i '
  s/^pick \(.*fix typo\)/fixup \1/
  s/^pick \(.*bad commit\)/drop \1/
  s/^pick \(.*complete tds\)/reword \1\nexec .\/test.sh/
'"
git rebase -i HEAD~4

echo ""
echo "=== 5. Git log after interactive rebase ==="
git log --oneline

echo "=== Lab 8 Completed: All directives tested successfully! ==="
