#!/usr/bin/env bash
# ==============================================================================
# LAB SCRIPT: The Lifecycle of File Status in Git
# MODULE: 001_002_git-three-tree-architecture-and-basic-workflow (Topic 1)
# EDUCATOR: Sukanta Hui (Barrackpore - Coder & AccoTax)
# ==============================================================================

set -e

SANDBOX_DIR="./sandbox_file_lifecycle_lab"
rm -rf "$SANDBOX_DIR"
mkdir -p "$SANDBOX_DIR"
cd "$SANDBOX_DIR"

echo "=== GIT FILE LIFECYCLE STATE TRANSITIONS LAB ==="
git init

echo ""
echo "--- STATE 1: UNTRACKED ('??') ---"
echo "console.log('App Started');" > app.js
git status -s

echo ""
echo "--- STATE 2: STAGED NEW FILE ('A ') ---"
git add app.js
git status -s

echo ""
echo "--- STATE 3: UNMODIFIED (Clean after commit) ---"
git commit -m "feat: initial app.js commit"
git status -s

echo ""
echo "--- STATE 4: MODIFIED UNSTAGED (' M') ---"
echo "const port = 3000;" >> app.js
git status -s

echo ""
echo "--- STATE 5: MODIFIED STAGED ('M ') ---"
git add app.js
git status -s

echo ""
echo "--- STATE 6: DUAL STATE ('MM') ---"
echo "console.log('Port configured');" >> app.js
git status -s

echo ""
echo "Inspecting diffs for dual-state file:"
echo "1. Staged diff (git diff --staged):"
git diff --staged
echo "2. Unstaged diff (git diff):"
git diff

echo ""
echo "--- STATE 7: COMMITTING AND RETURNING TO UNMODIFIED ---"
git add app.js
git commit -m "feat(app): configure port and startup logging"
git status -s

echo ""
echo "=== CLEANING UP SANDBOX ==="
cd ..
rm -rf "$SANDBOX_DIR"
echo "Lab completed successfully!"
