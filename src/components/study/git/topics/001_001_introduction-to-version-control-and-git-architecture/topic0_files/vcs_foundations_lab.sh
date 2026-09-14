#!/usr/bin/env bash
# ==============================================================================
# LAB DEMO: Version Control Foundations & The Anti-Pattern of Manual Backups
# Module: 001_001_introduction-to-version-control-and-git-architecture (Topic 0)
# Educator: Sukanta Hui (Coder & AccoTax, Barrackpore)
# Profile: https://github.com/sukantahui | Org: https://github.com/codernaccotax
# ==============================================================================
# Target Shell: Git Bash (Windows) / bash (Linux) / zsh (macOS)
# ==============================================================================

set -e # Exit immediately if a command exits with a non-zero status

echo "======================================================================"
echo " STEP 1: Demonstrating the Fragility of Manual Folder Backups"
echo "======================================================================"

# Create a clean sandbox directory in the user's home or temp workspace
LAB_DIR="${HOME}/git_master_lab_topic0"
rm -rf "$LAB_DIR"
mkdir -p "$LAB_DIR/manual_approach"
cd "$LAB_DIR/manual_approach"

# Create simulated initial project files
cat << 'EOF' > server.js
// Initial Server Implementation by Sachin
const PORT = 5000;
console.log("Server starting on port " + PORT);
EOF

echo "[+] Created manual_approach/server.js (Version 1)"

# Simulate a manual backup copy
mkdir -p "../manual_backup_v1"
cp server.js "../manual_backup_v1/server.js"

# Simulate Mahima editing the file simultaneously
cat << 'EOF' > server.js
// Mahima updated the port to 8080 for production deployment
const PORT = 8080;
console.log("Production server live on port " + PORT);
EOF

# Simulate Sachin saving his older copy and overwriting Mahima's work
cat << 'EOF' > server.js
// Sachin's late save: Overwrites Mahima's production port change silently!
const PORT = 5000;
console.log("Server starting on port " + PORT);
EOF

echo "[!] Notice: Mahima's port 8080 update was silently lost without any warning!"

echo ""
echo "======================================================================"
echo " STEP 2: Transitioning to Git Version Control"
echo "======================================================================"

mkdir -p "$LAB_DIR/git_approach"
cd "$LAB_DIR/git_approach"

echo "[+] Initializing Git Repository..."
git init

echo "[+] Configuring Local Author Identity for this lab drill..."
git config user.name "Sukanta Hui Student"
git config user.email "student@codernaccotax.co.in"

echo "[+] Creating server.js under Git control..."
cat << 'EOF' > server.js
// Initial Server Implementation under Git Control
const PORT = 5000;
console.log("Server starting on port " + PORT);
EOF

echo ""
echo "======================================================================"
echo " STEP 3: Inspecting Repository State with git status"
echo "======================================================================"
git status -s

echo "[+] Staging and creating our first intentional checkpoint (Commit)..."
git add server.js
git commit -m "feat: initialize server configuration on port 5000"

echo ""
echo "======================================================================"
echo " STEP 4: Modifying and Tracking History"
echo "======================================================================"
cat << 'EOF' > server.js
// Updated to production port 8080 by Mahima
const PORT = 8080;
console.log("Production server live on port " + PORT);
EOF

echo "[+] Inspecting the precise line-by-line diff:"
git diff

echo "[+] Committing Mahima's update:"
git commit -am "feat: update server port to 8080 for production"

echo ""
echo "======================================================================"
echo " STEP 5: Verifying Immutable History Log"
echo "======================================================================"
git log --oneline --graph --decorate

echo ""
echo "======================================================================"
echo " LAB COMPLETE: You have witnessed the power of Version Control!"
echo " Repository Location: $LAB_DIR/git_approach"
echo "======================================================================"
