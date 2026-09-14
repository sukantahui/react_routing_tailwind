#!/usr/bin/env bash
# ==============================================================================
# Topic 12 Terminal Lab: Database Migration Recovery Simulation
# Educator: Sukanta Hui (Coder & AccoTax, Barrackpore)
# ==============================================================================

set -e

SANDBOX_DIR="/tmp/git_migration_recovery_lab_$$"
mkdir -p "$SANDBOX_DIR"
cd "$SANDBOX_DIR"

echo "==> Initializing enterprise project repository..."
git init -b main
git config user.name "Abhronila & Tuhina"
git config user.email "team@barrackpore-accotax.in"

echo "==> Setting up clean database migrations..."
mkdir -p db/migrations
echo "CREATE TABLE users (id INT PRIMARY KEY, name VARCHAR(100));" > db/migrations/001_users.sql
echo "CREATE TABLE tax_rates (id INT PRIMARY KEY, rate DECIMAL(5,2));" > db/migrations/002_tax_rates.sql
echo "CREATE TABLE invoices (id INT PRIMARY KEY, amount DECIMAL(10,2));" > db/migrations/003_invoices.sql
echo "CREATE TABLE payments (id INT PRIMARY KEY, invoice_id INT);" > db/migrations/004_payments.sql
git add db/
git commit -m "feat(db): baseline schema migration scripts"

echo "==> DISASTER SIMULATION: Corrupting migration scripts during debugging..."
echo "-- BROKEN SYNTAX INSERT INTO users VALUES (NULL);" >> db/migrations/001_users.sql
echo "-- BROKEN SYNTAX DROP TABLE tax_rates;" >> db/migrations/002_tax_rates.sql
echo "-- UNCOMMITTED EDIT in invoices" >> db/migrations/003_invoices.sql
echo "-- UNCOMMITTED EDIT in payments" >> db/migrations/004_payments.sql

echo "==> Accidental partial staging of 001 and 002..."
git add db/migrations/001_users.sql db/migrations/002_tax_rates.sql

echo "==> Creating untracked dump files..."
echo "junk dump" > temp_dump.sql
echo "scratch notes" > scratch.txt

echo "==> Current complex repository state:"
git status

echo "==> RECOVERY STEP 1: Unstaging the staged migrations..."
git restore --staged db/migrations/001_users.sql db/migrations/002_tax_rates.sql

echo "==> RECOVERY STEP 2: Restoring all working tree migrations to HEAD..."
git restore db/migrations/

echo "==> RECOVERY STEP 3: Previewing untracked dumps..."
git clean -nd

echo "==> RECOVERY STEP 4: Force cleaning untracked dumps..."
git clean -fd

echo "==> Verifying final repository status (Must be 100% clean!):"
git status

rm -rf "$SANDBOX_DIR"
echo "✔ Classroom migration troubleshooting lab completed flawlessly!"
