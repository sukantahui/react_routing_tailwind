#!/usr/bin/env bash
# ==============================================================================
# Git Lab 001_003_07: Inspecting Specific Commits with git show
# Instructor: Sukanta Hui (Coder & AccoTax, Barrackpore)
# Cohort: Debangshu, Swadeep, Sachin, Mahima, Susmita, Abhronila, Tuhina
# ==============================================================================

set -e

echo "--------------------------------------------------------"
echo "Initializing Git Show Inspection Sandbox..."
echo "--------------------------------------------------------"

LAB_DIR="git_show_sandbox"
rm -rf "$LAB_DIR"
mkdir -p "$LAB_DIR"
cd "$LAB_DIR"

git init -b main

git config user.name "Sukanta Hui"
git config user.email "sukanta@barrackpore-devs.org"

# Commit 1
echo "{\"appName\": \"AccoTax\", \"version\": \"1.0.0\"}" > app_config.json
git add app_config.json
git commit -m "feat(core): initial app configuration"

# Tag release
git tag -a v1.0.0 -m "Release v1.0.0 Milestone"

# Commit 2
echo "{\"appName\": \"AccoTax\", \"version\": \"1.1.0\", \"gstEnabled\": true}" > app_config.json
git add app_config.json
git commit -m "feat(tax): enable GST processing in app configuration"

LATEST_SHA=$(git rev-parse --short HEAD)
GENESIS_SHA=$(git rev-parse --short HEAD~1)

echo ""
echo "=== 1. Inspecting HEAD with git show ==="
git show HEAD

echo ""
echo "=== 2. Inspecting Tag Object v1.0.0 ==="
git show v1.0.0

echo ""
echo "=== 3. Summary Statistics for Specific Commit ($LATEST_SHA) ==="
git show --stat "$LATEST_SHA"

echo ""
echo "=== 4. Viewing Historical File Content Directly from Commit ($GENESIS_SHA) ==="
echo "Content of app_config.json at $GENESIS_SHA:"
git show "$GENESIS_SHA:app_config.json"

echo ""
echo "--------------------------------------------------------"
echo "Lab completed successfully!"
echo "--------------------------------------------------------"
