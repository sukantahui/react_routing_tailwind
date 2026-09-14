#!/usr/bin/env bash
# ==============================================================================
# LAB SCRIPT: Topic 8 - Conventional Commits Specification
# Module: 001_002_git-three-tree-architecture-and-basic-workflow
# Educator: Sukanta Hui (Coder & AccoTax, Barrackpore)
# ==============================================================================

set -e
LAB_DIR="/tmp/conventional_commits_lab_$(date +%s)"
mkdir -p "$LAB_DIR"
cd "$LAB_DIR"

echo "🧪 [STEP 1] Initializing lab repository..."
git init -b main
git config user.name "Sukanta Hui Student"
git config user.email "student@coderaccotax.com"

echo "🧪 [STEP 2] Creating Conventional Commits sequence..."

# 1. feat
echo "const app = true;" > index.js
git add index.js
git commit -m "feat(core): initialize application bootstrap architecture"

# 2. docs
echo "# Barrackpore Accounting POS" > README.md
git add README.md
git commit -m "docs: add repository introduction and setup guide in README"

# 3. test
echo "test('app init', () => {});" > index.test.js
git add index.test.js
git commit -m "test(core): add unit tests for application bootstrap"

# 4. fix
echo "const app = { version: '1.0.1' };" > index.js
git add index.js
git commit -m "fix(core): resolve null pointer exception during app startup"

# 5. style
echo "// formatted according to Prettier standard" >> index.js
git add index.js
git commit -m "style: apply consistent code indentation"

# 6. perf
echo "const memoizedCache = new Map();" >> index.js
git add index.js
git commit -m "perf(core): memoize configuration loader to eliminate redundant disk reads"

# 7. ci
mkdir -p .github/workflows
echo "name: CI" > .github/workflows/ci.yml
git add .github/workflows/ci.yml
git commit -m "ci: configure automated GitHub Actions test pipeline"

# 8. Breaking Change
echo "export const v2_API = true;" >> index.js
git add index.js
git commit -m "feat(api)!: migrate endpoint signatures to v2 REST format" \
  -m "BREAKING CHANGE: All v1 endpoints are deprecated and removed."

echo "========================================================"
echo "📊 CONVENTIONAL COMMITS LOG STREAM:"
echo "========================================================"
git log --oneline --decorate

echo ""
echo "========================================================"
echo "📑 FILTERING BY TYPE (e.g. ONLY FEATURES):"
echo "========================================================"
git log --grep="^feat" --oneline

echo ""
echo "✅ Lab execution complete. Clean up: rm -rf $LAB_DIR"
