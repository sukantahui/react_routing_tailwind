#!/usr/bin/env bash
# ==============================================================================
# Git Lab 001_003_09: Line-by-Line Code Forensics with git blame
# Instructor: Sukanta Hui (Coder & AccoTax, Barrackpore)
# Cohort: Debangshu, Swadeep, Sachin, Mahima, Susmita, Abhronila, Tuhina
# ==============================================================================

set -e

echo "--------------------------------------------------------"
echo "Initializing Git Blame Forensics Lab..."
echo "--------------------------------------------------------"

LAB_DIR="git_blame_sandbox"
rm -rf "$LAB_DIR"
mkdir -p "$LAB_DIR"
cd "$LAB_DIR"

git init -b main

# Commit 1 (Author: Sukanta Hui)
GIT_AUTHOR_NAME="Sukanta Hui" \
GIT_AUTHOR_EMAIL="sukanta@barrackpore-devs.org" \
GIT_AUTHOR_DATE="2026-09-10 10:00:00 +0530" \
cat << 'EOF' > gst_engine.js
// Barrackpore FinTech GST Calculation Engine
function computeInvoiceGST(amount) {
  const baseRate = 0.18;
  return amount * baseRate;
}
module.exports = { computeInvoiceGST };
EOF
git add gst_engine.js
git commit -m "feat(tax): initialize computeInvoiceGST helper"

# Commit 2 (Author: Susmita)
GIT_AUTHOR_NAME="Susmita Database" \
GIT_AUTHOR_EMAIL="susmita@barrackpore-devs.org" \
GIT_AUTHOR_DATE="2026-09-12 14:30:00 +0530" \
cat << 'EOF' > gst_engine.js
// Barrackpore FinTech GST Calculation Engine
function computeInvoiceGST(amount, isService = true) {
  const baseRate = isService ? 0.18 : 0.12;
  return amount * baseRate;
}
module.exports = { computeInvoiceGST };
EOF
git add gst_engine.js
git commit -m "feat(tax): support 12% goods vs 18% services split"

# Commit 3 (Author: Swadeep)
GIT_AUTHOR_NAME="Swadeep SeniorDev" \
GIT_AUTHOR_EMAIL="swadeep@barrackpore-devs.org" \
GIT_AUTHOR_DATE="2026-09-14 16:00:00 +0530" \
cat << 'EOF' > gst_engine.js
// Barrackpore FinTech GST Calculation Engine
function computeInvoiceGST(amount, isService = true) {
  if (typeof amount !== 'number' || amount <= 0) return 0;
  const baseRate = isService ? 0.18 : 0.12;
  return Number((amount * baseRate).toFixed(2));
}
module.exports = { computeInvoiceGST };
EOF
git add gst_engine.js
git commit -m "fix(tax): add input validation and precision rounding"

echo ""
echo "=== 1. Standard git blame Output ==="
git blame gst_engine.js

echo ""
echo "=== 2. git blame with Email (-e) and Short Date (--date=short) ==="
git blame -e --date=short gst_engine.js

echo ""
echo "=== 3. git blame with Relative Date (--date=relative) ==="
git blame --date=relative gst_engine.js

echo ""
echo "--------------------------------------------------------"
echo "Lab completed successfully!"
echo "--------------------------------------------------------"
