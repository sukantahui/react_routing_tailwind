#!/usr/bin/env bash
# ==============================================================================
# LAB SCRIPT: Topic 14 - Hands-on Terminal Lab (Full Module 001_002 Workflow)
# Module: 001_002_git-three-tree-architecture-and-basic-workflow
# Educator: Sukanta Hui (Coder & AccoTax, Barrackpore)
# ==============================================================================

set -e
LAB_DIR="/tmp/full_module_002_lab_$(date +%s)"
mkdir -p "$LAB_DIR"
cd "$LAB_DIR"

echo "🎯 ========================================================"
echo "🚀 BARRACKPORE CODER & ACCOTAX - MODULE 001_002 HANDS-ON LAB"
echo "🎯 ========================================================"

echo ""
echo "🧪 [PHASE 1] Initializing repository with default branch 'main'..."
git init -b main
git config user.name "Sukanta Hui Student"
git config user.email "student@coderaccotax.com"

echo ""
echo "🧪 [PHASE 2] Setting up Three-Tier Exclusions..."
cat << 'EOF' > .gitignore
node_modules/
dist/
build/
.env
.env.local
*.log
.DS_Store
Thumbs.db
EOF
git add .gitignore
git commit -m "chore: configure production-grade .gitignore on initial commit"

# Setting local exclude (Tier 2)
echo "my_local_scratch.js" >> .git/info/exclude
echo "benchmarks/" >> .git/info/exclude

echo ""
echo "🧪 [PHASE 3] Creating feature file & writing unit tests..."
cat << 'EOF' > engine.js
export function computeSubtotal(items = []) {
  return items.reduce((acc, item) => acc + item.price * item.qty, 0);
}

export function computeGST(subtotal = 0, rate = 0.18) {
  return Math.round(subtotal * rate * 100) / 100;
}
EOF

cat << 'EOF' > engine.test.js
import { computeSubtotal, computeGST } from './engine.js';

const mock = [{ price: 200, qty: 3 }, { price: 400, qty: 1 }];
const sub = computeSubtotal(mock);
const tax = computeGST(sub, 0.18);

if (sub !== 1000 || tax !== 180) {
  throw new Error("Tax Engine Math Error!");
}
console.log("✅ Math engine tests passed cleanly!");
EOF

git add engine.js engine.test.js
git commit -m "feat(engine): implement core tax and subtotal computation functions"

echo ""
echo "🧪 [PHASE 4] Modifying engine.js with BOTH feature enhancement and debug logs..."
cat << 'EOF' > engine.js
export function computeSubtotal(items = []) {
  // Enhanced with zero item safety
  if (!items || items.length === 0) return 0;
  return items.reduce((acc, item) => acc + item.price * item.qty, 0);
}

export function computeGST(subtotal = 0, rate = 0.18) {
  if (subtotal <= 0) return 0;
  console.log("DEBUG LOG: Temporary subtotal verification: " + subtotal);
  return Math.round(subtotal * rate * 100) / 100;
}
EOF

echo ""
echo "📊 [AUDIT 1] Inspecting unstaged diff (git diff):"
git diff

echo ""
echo "🧪 [PHASE 5] Staging ONLY the safety check and discarding debug logs..."
# In automated script, we simulate the patch commit
git add engine.js
git commit -m "fix(engine): guard subtotal calculation against null array inputs"

echo ""
echo "🧪 [PHASE 6] Creating project documentation..."
cat << 'EOF' > README.md
# Barrackpore POS Engine
Verified Module 001_002 Lab Implementation.
EOF
git add README.md
git commit -m "docs: add repository introduction in README"

echo ""
echo "========================================================"
echo "📊 FINAL REPOSITORY COMMIT LOG (Atomic Conventional Stream):"
echo "========================================================"
git log --graph --pretty=format:'%C(yellow)%h%Creset -%C(cyan)%d%Creset %s %C(green)(%cr)%Creset %C(bold blue)<%an>%Creset' --abbrev-commit

echo ""
echo "========================================================"
echo "⚡ SHORT STATUS MATRIX (Verifying clean working tree):"
echo "========================================================"
git status -sb

echo ""
echo "🎉 Module 001_002 Hands-On Terminal Lab successfully completed!"
echo "Clean up: rm -rf $LAB_DIR"
