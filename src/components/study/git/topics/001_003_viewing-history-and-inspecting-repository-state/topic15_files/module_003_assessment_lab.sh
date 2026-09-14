#!/usr/bin/env bash
# ==============================================================================
# SCRIPT: module_003_assessment_lab.sh
# MODULE: 001_003 - Viewing History & Inspecting Repository State
# TOPIC 15: Module Self-Assessment & Short Questions
# INSTRUCTOR: Sukanta Hui (Coder & AccoTax, Barrackpore)
# ==============================================================================
set -euo pipefail

echo "======================================================================"
echo "🎯 MODULE 001_003 SELF-ASSESSMENT COMPANION LAB"
echo "======================================================================"

LAB_DIR="module_003_assessment_repo"
rm -rf "$LAB_DIR"
mkdir -p "$LAB_DIR"
cd "$LAB_DIR"

git init -b main

# Helper commit function
c() {
  local msg="$1"
  local author="$2"
  local email="$3"
  GIT_AUTHOR_NAME="$author" GIT_AUTHOR_EMAIL="$email" \
  GIT_COMMITTER_NAME="$author" GIT_COMMITTER_EMAIL="$email" \
  git commit -m "$msg"
}

# Create base files
echo "const config = { env: 'production', port: 8080 };" > server.js
echo "export function add(a, b) { return a + b; }" > math.js
git add .
c "feat(core): initial server setup and math library" "Debangshu Mukherjee" "debangshu@coderaccotax.in"

# Modify math.js
echo "export function subtract(a, b) { return a - b; }" >> math.js
git add math.js
c "feat(math): add subtraction utility" "Mahima Shaw" "mahima@coderaccotax.in"

# Branch feature-calc
git checkout -b feature-calc
echo "export function multiply(a, b) { return a * b; }" >> math.js
git add math.js
c "feat(calc): implement multiplication" "Swadeep Sen" "swadeep@coderaccotax.in"

# Switch back and add hotfix to main
git checkout main
echo "// Security Header v1" >> server.js
git add server.js
c "fix(sec): add security comment header" "Susmita Nandy" "susmita@coderaccotax.in"

echo ""
echo "✅ Test repository created with 2 branches and 4 commits."
echo "Running quick verification commands:"
echo ""
echo "1. Full Graph View:"
git log --graph --oneline --decorate --all
echo ""
echo "2. Author Shortlog:"
git shortlog -sn --no-merges
echo ""
echo "3. Symmetric Difference:"
git log --left-right --oneline main...feature-calc
echo ""
echo "🎉 You are now ready to tackle the Topic 15 Assessment Quiz!"
