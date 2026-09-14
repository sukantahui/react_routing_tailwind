#!/usr/bin/env bash
# ==============================================================================
# Git Lab 002_003_04: Golden Rule of Rebasing Simulation
# Instructor: Sukanta Hui (Coder & AccoTax, Barrackpore)
# ==============================================================================

set -e

LAB_DIR="$HOME/git_golden_rule_lab4"
rm -rf "$LAB_DIR"
mkdir -p "$LAB_DIR"
cd "$LAB_DIR"

echo "=== 1. Setting up Remote Server (Bare Repo) ==="
mkdir central.git
cd central.git
git init --bare
cd ..

echo "=== 2. Alice Clones and Creates Shared Feature Branch ==="
git clone central.git alice
cd alice
git config user.name "Alice (AccoTax)"
git config user.email "alice@accotax.in"

echo "Initial ledger" > ledger.txt
git add ledger.txt
git commit -m "feat: initial commit"
git push origin main

git switch -c shared-feature
echo "Alice feature 1" > shared.txt
git add shared.txt
git commit -m "feat: Alice commit C"
git push -u origin shared-feature
cd ..

echo "=== 3. Bob Clones and Builds on Alice's Feature ==="
git clone central.git bob
cd bob
git config user.name "Bob (AccoTax)"
git config user.email "bob@accotax.in"
git switch shared-feature
echo "Bob feature 2" >> shared.txt
git add shared.txt
git commit -m "feat: Bob commit D on top of Alice"
cd ..

echo "=== 4. Alice Violates Golden Rule: Rebases and Force-Pushes ==="
cd alice
git switch shared-feature
git commit --amend -m "feat: Alice rewritten commit C' (BREAKS HASH)"
git push --force origin shared-feature
cd ..

echo "=== 5. Bob tries to Pull and Encounters Disaster ==="
cd bob
echo "--- Bob runs git pull ---"
git pull origin shared-feature || true

echo ""
echo "--- Notice duplicate/conflicted history in Bob's repo ---"
git log --graph --oneline --all

echo "=== Lab 4 Completed: Disaster reproduced! Always follow the Golden Rule! ==="
