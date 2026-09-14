#!/usr/bin/env bash
# ==============================================================================
# Git Lab 002_003_12: Classroom 12-to-2 Commit Transformation Sandbox
# Instructor: Sukanta Hui (Coder & AccoTax, Barrackpore)
# ==============================================================================

set -e

LAB_DIR="$HOME/git_12to2_transformation_lab12"
rm -rf "$LAB_DIR"
mkdir -p "$LAB_DIR"
cd "$LAB_DIR"

echo "=== 1. Initialize Repo ==="
git init
git config user.name "Debangshu (AccoTax)"
git config user.email "debangshu@accotax.in"

echo "AccoTax Core" > app.js
git add app.js
git commit -m "feat: initial commit"

echo "=== 2. Creating 12 Messy Commits ==="
git switch -c feature/invoice-pdf

echo "invoice form v1" > invoice.js
git add invoice.js && git commit -m "start invoice form"

echo "// fix typo" >> invoice.js
git add invoice.js && git commit -m "fixed typo in state"

echo "export function calcGST() { return 0.18; }" >> invoice.js
git add invoice.js && git commit -m "added gst calculation"

echo "// fixed gst rounding" >> invoice.js
git add invoice.js && git commit -m "fixed gst rounding bug"

echo "export function exportPDF() { return 'PDF'; }" > pdf.js
git add pdf.js && git commit -m "added pdf export library"

echo "// pdf layout" >> pdf.js
git add pdf.js && git commit -m "pdf layout looks ugly"

echo "// pdf margins" >> pdf.js
git add pdf.js && git commit -m "fixed pdf margins"

echo "console.log('DEBUG MSG');" >> pdf.js
git add pdf.js && git commit -m "console.log debug statements"

echo "// logo added" >> pdf.js
git add pdf.js && git commit -m "added company logo"

echo "// fixed test" >> invoice.js
git add invoice.js && git commit -m "fixed broken unit test"

echo "// cleaned code" >> invoice.js
git add invoice.js && git commit -m "clean up code"

echo "// final touches" >> pdf.js
git add pdf.js && git commit -m "final touches"

echo ""
echo "=== 3. Branch History BEFORE (12 Messy Commits) ==="
git log --oneline -n 12

echo ""
echo "=== 4. Saving backup branch pointer ==="
git branch backup-before-restructure

echo "=== 5. Performing Automated 12-to-2 Transformation Rebase ==="
cat << 'EOF' > /tmp/rebase_editor.sh
#!/usr/bin/env bash
cat << 'SCRIPT' > "$1"
pick a1b2c3d feat(invoice): implement invoice generation and GST calculation engine
fixup e4f5g6h fixed typo in state
fixup i7j8k9l added gst calculation
fixup m0n1o2p fixed gst rounding bug
fixup k8l9m0n fixed broken unit test
fixup o1p2q3r clean up code
pick q3r4s5t feat(pdf): add PDF export generator with Barrackpore regional header
fixup u6v7w8x pdf layout looks ugly
fixup y9z0a1b fixed pdf margins
drop c2d3e4f console.log debug statements
fixup g5h6i7j added company logo
fixup s4t5u6v final touches
SCRIPT
EOF
chmod +x /tmp/rebase_editor.sh

# Squash first 6 into invoice, remaining 6 into pdf
git reset --soft HEAD~12
git reset HEAD app.js

git add invoice.js
git commit -m "feat(invoice): implement invoice generation and GST calculation engine"

git add pdf.js
# remove debug statement
sed -i '/DEBUG MSG/d' pdf.js
git add pdf.js
git commit -m "feat(pdf): add PDF export generator with Barrackpore regional header"

echo ""
echo "=== 6. History AFTER (2 Clean Atomic Commits!) ==="
git log --oneline -n 3

echo "=== Lab 12 Completed: Pristine Pull Request Ready! ==="
