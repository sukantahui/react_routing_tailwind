#!/usr/bin/env bash
# ==============================================================================
# Git Lab 001_003_06: Viewing Detailed Changes in Log (-p and --stat)
# Instructor: Sukanta Hui (Coder & AccoTax, Barrackpore)
# Cohort: Debangshu, Swadeep, Sachin, Mahima, Susmita, Abhronila, Tuhina
# ==============================================================================

set -e

echo "--------------------------------------------------------"
echo "Initializing Git Log Patch & Stat Lab..."
echo "--------------------------------------------------------"

LAB_DIR="git_patch_stat_sandbox"
rm -rf "$LAB_DIR"
mkdir -p "$LAB_DIR"
cd "$LAB_DIR"

git init -b main

git config user.name "Sukanta Hui"
git config user.email "sukanta@barrackpore-devs.org"

# Commit 1
cat << 'EOF' > invoice_service.js
// Invoice Service v1.0
class InvoiceService {
  constructor() {
    this.invoices = [];
  }
}
module.exports = InvoiceService;
EOF
git add invoice_service.js
git commit -m "feat(invoice): create initial InvoiceService class"

# Commit 2 (Multiple file changes)
cat << 'EOF' >> invoice_service.js

InvoiceService.prototype.createInvoice = function(amount, taxRate) {
  const tax = amount * (taxRate / 100);
  const total = amount + tax;
  return { amount, tax, total };
};
EOF

echo "# Barrackpore Billing System" > README.md
git add invoice_service.js README.md
git commit -m "feat(invoice): implement createInvoice calculation and add README"

# Commit 3 (Bugfix diff)
sed -i 's/const total = amount + tax;/const total = Number((amount + tax).toFixed(2));/' invoice_service.js
git add invoice_service.js
git commit -m "fix(invoice): fix floating point rounding on total invoice amount"

echo ""
echo "=== 1. Summary Statistics (--stat) for Recent Commits ==="
git log --stat -n 2

echo ""
echo "=== 2. Compact One-Line Header with File Stats ==="
git log --oneline --stat -n 2

echo ""
echo "=== 3. Tabular Machine-Readable Stats (--numstat) ==="
git log --numstat -n 2

echo ""
echo "=== 4. Full Inline Unified Diff Patch (-p) for Latest Bugfix ==="
git log -p -1

echo ""
echo "--------------------------------------------------------"
echo "Lab completed successfully!"
echo "--------------------------------------------------------"
