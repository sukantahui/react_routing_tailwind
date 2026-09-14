#!/usr/bin/env bash
# ==============================================================================
# Git Lab 002_003_13: Hands-on Rebase & Linearization Sandbox
# Instructor: Sukanta Hui (Coder & AccoTax, Barrackpore)
# ==============================================================================

set -e

LAB_DIR="$HOME/git_master_rebase_lab13"
rm -rf "$LAB_DIR"
mkdir -p "$LAB_DIR"
cd "$LAB_DIR"

echo "=== Drill 1: Initializing Repository & Test Suite ==="
git init
git config user.name "Sukanta Hui"
git config user.email "sukanta@accotax.in"

cat << 'EOF' > test.sh
#!/usr/bin/env bash
echo "Running AccoTax compliance checks..."
grep -q "FAIL" app.js && exit 1 || true
echo "Tests Passed!"
EOF
chmod +x test.sh

echo "AccoTax Core v1.0" > app.js
git add app.js test.sh
git commit -m "feat: initial ledger core and test runner"

echo "=== Drill 2: Divergent Feature Branch Commits ==="
git switch -c feature/tax-audit

echo "PASS: Audit rule 1" >> app.js
git add app.js && git commit -m "feat: add audit rule 1"

echo "PASS: typo fix" >> app.js
git add app.js && git commit -m "fix typo in rule 1"

echo "console.log('TEMP DEBUG');" >> app.js
git add app.js && git commit -m "wip: debug print"

echo "PASS: Audit rule 2 (₹10 Lakh Threshold)" >> app.js
git add app.js && git commit -m "feat: add audit rule 2"

echo "=== Drill 3: Main Branch Moves Forward ==="
git switch main
echo "export const FY = '2026-27';" >> app.js
git add app.js
git commit -m "feat: configure FY 2026-27 constants"

echo ""
echo "=== History BEFORE Rebase (Divergent) ==="
git log --graph --oneline --all --decorate

echo ""
echo "=== Drill 4: Linearizing feature onto main ==="
git switch feature/tax-audit
git rebase main

echo ""
echo "=== Drill 5: Interactive Squash & Test with Exec ==="
# Fold typo, drop debug, and run test
export GIT_SEQUENCE_EDITOR="sed -i '
  s/^pick \(.*fix typo\)/fixup \1/
  s/^pick \(.*debug print\)/drop \1/
  s/^pick \(.*rule 2\)/reword \1\nexec .\/test.sh/
'"
git rebase -i main

echo ""
echo "=== Drill 6: Fast-Forward Merge into Main ==="
git switch main
git merge feature/tax-audit

echo ""
echo "=== Final Clean 100% Linear DAG ==="
git log --graph --oneline --decorate

echo "=== Lab 13 Completed: All drills verified with 100% test pass! ==="
