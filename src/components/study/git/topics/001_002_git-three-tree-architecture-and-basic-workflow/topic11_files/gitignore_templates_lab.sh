#!/usr/bin/env bash
# ==============================================================================
# LAB SCRIPT: Topic 11 - Common .gitignore Templates (Node, Python, Java, IDEs)
# Module: 001_002_git-three-tree-architecture-and-basic-workflow
# Educator: Sukanta Hui (Coder & AccoTax, Barrackpore)
# ==============================================================================

set -e
LAB_DIR="/tmp/gitignore_templates_lab_$(date +%s)"
mkdir -p "$LAB_DIR"
cd "$LAB_DIR"

echo "🧪 [STEP 1] Initializing polyglot repository..."
git init -b main
git config user.name "Sukanta Hui Student"
git config user.email "student@coderaccotax.com"

echo "🧪 [STEP 2] Writing Production-Grade Multi-Language .gitignore..."
cat << 'EOF' > .gitignore
# --- Operating System Clutter ---
.DS_Store
Thumbs.db
desktop.ini

# --- IDEs & Editors ---
.idea/
*.iml
.vscode/*
!.vscode/settings.json
!.vscode/extensions.json
!.vscode/launch.json

# --- Node.js / TypeScript ---
node_modules/
dist/
build/
.next/
npm-debug.log*
yarn-debug.log*
.env
.env.local

# --- Python ---
__pycache__/
*.py[cod]
.venv/
env/
.pytest_cache/
*.sqlite3

# --- Java / Maven / Gradle ---
target/
*.class
*.jar
*.war
.gradle/
!gradle/wrapper/gradle-wrapper.jar
EOF

git add .gitignore
git commit -m "chore: configure polyglot .gitignore template"

echo "🧪 [STEP 3] Simulating massive build clutter generation..."
mkdir -p node_modules/express dist/bundle __pycache__ .venv/lib target/classes .idea .vscode
touch node_modules/express/index.js
touch dist/bundle/app.min.js
touch __pycache__/server.cpython-312.pyc
touch .venv/lib/python.exe
touch target/classes/Main.class
touch .idea/workspace.xml
touch .vscode/settings.json
touch .vscode/private_cache.json
touch .DS_Store Thumbs.db
touch src_file.js

echo "========================================================"
echo "📊 STATUS TEST (Notice all build clutter is ignored!):"
echo "========================================================"
git status -s

echo ""
echo "========================================================"
echo "🔍 VERIFYING IGNORED ARTIFACTS (git status -s --ignored):"
echo "========================================================"
git status -s --ignored

echo ""
echo "✅ Lab execution complete. Clean up: rm -rf $LAB_DIR"
