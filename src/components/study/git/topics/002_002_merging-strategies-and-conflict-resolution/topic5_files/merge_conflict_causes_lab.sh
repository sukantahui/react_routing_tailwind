#!/usr/bin/env bash
# ==============================================================================
# BASH LAB: WHAT CAUSES MERGE CONFLICTS? CONCURRENT DIVERGENT MODIFICATIONS
# MODULE: 002_002_merging-strategies-and-conflict-resolution (Topic 5)
# INSTRUCTOR: Sukanta Hui (Coder & AccoTax, Barrackpore)
# ==============================================================================

set -euo pipefail

LAB_DIR="$HOME/git_conflict_causes_lab"
echo "=== Step 1: Initializing Sandbox Repository at $LAB_DIR ==="
rm -rf "$LAB_DIR"
mkdir -p "$LAB_DIR"
cd "$LAB_DIR"

git init -b main
git config user.name "Sukanta Hui"
git config user.email "sukanta@coderaccotax.in"

echo "=== Step 2: Creating Common Base Commit (Base GST & Server Config) ==="
cat << 'EOF' > server.js
const express = require('express');
const app = express();

// Base Configuration
const PORT = 3000;
const GST_DEFAULT_RATE = 0.18; // Default Indian GST 18%

app.get('/api/gst', (req, res) => {
    const amount = Number(req.query.amount) || 1000;
    const tax = amount * GST_DEFAULT_RATE;
    res.json({ amount, tax, total: amount + tax });
});

app.listen(PORT, () => {
    console.log(`Server active on port ${PORT}`);
});
EOF

git add server.js
git commit -m "feat: initial server configuration with standard GST calculation"

echo "=== Step 3: Branching into feature/luxury-tax (Susmita's Branch) ==="
git switch -c feature/luxury-tax

# Susmita changes GST rate to 28% for luxury items and PORT to 8080 on line 6 and 7
cat << 'EOF' > server.js
const express = require('express');
const app = express();

// Base Configuration
const PORT = 8080;
const GST_DEFAULT_RATE = 0.28; // Updated Luxury Slab 28%

app.get('/api/gst', (req, res) => {
    const amount = Number(req.query.amount) || 1000;
    const tax = amount * GST_DEFAULT_RATE;
    res.json({ amount, tax, total: amount + tax });
});

app.listen(PORT, () => {
    console.log(`Server active on port ${PORT}`);
});
EOF

git commit -am "feat(tax): update default GST rate to 28% for luxury items"

echo "=== Step 4: Switching back to main and creating divergent commit (Sachin's Work) ==="
git switch main

# Sachin modifies the same lines (PORT to 5000 and GST rate to 12% reduced rate)
cat << 'EOF' > server.js
const express = require('express');
const app = express();

// Base Configuration
const PORT = 5000;
const GST_DEFAULT_RATE = 0.12; // Reduced Essential Slab 12%

app.get('/api/gst', (req, res) => {
    const amount = Number(req.query.amount) || 1000;
    const tax = amount * GST_DEFAULT_RATE;
    res.json({ amount, tax, total: amount + tax });
});

app.listen(PORT, () => {
    console.log(`Server active on port ${PORT}`);
});
EOF

git commit -am "feat(config): switch server PORT to 5000 and GST slab to 12%"

echo "=== Step 5: Visualizing Divergent Branch Graph ==="
git log --graph --oneline --all

echo "=== Step 6: Triggering Merge Conflict ==="
echo "Attempting: git merge feature/luxury-tax..."
set +e
git merge feature/luxury-tax
MERGE_STATUS=$?
set -e

if [ $MERGE_STATUS -ne 0 ]; then
    echo ""
    echo "========================================================"
    echo ">>> Git halted safely! CONFLICT (content) DETECTED! <<<"
    echo "========================================================"
    echo "Status output:"
    git status
    echo ""
    echo "Inspecting raw file content with conflict markers:"
    cat server.js
fi

echo ""
echo "=== Step 7: Inspecting Index Stages (Stages 1, 2, and 3) ==="
git ls-files -u

echo ""
echo "=== Lab Completed: Merge conflict simulated successfully! ==="
