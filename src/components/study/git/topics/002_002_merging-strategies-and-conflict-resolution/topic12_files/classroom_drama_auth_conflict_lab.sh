#!/usr/bin/env bash
# ==============================================================================
# BASH LAB: CLASSROOM DRAMA - AUTH CONTROLLER CONFLICT SIMULATION & RESOLUTION
# MODULE: 002_002_merging-strategies-and-conflict-resolution (Topic 12)
# INSTRUCTOR: Sukanta Hui (Coder & AccoTax, Barrackpore)
# ==============================================================================

set -euo pipefail

LAB_DIR="$HOME/git_classroom_drama_lab"
echo "=== Step 1: Initializing Sandbox Repository at $LAB_DIR ==="
rm -rf "$LAB_DIR"
mkdir -p "$LAB_DIR"
cd "$LAB_DIR"

git init -b main
git config user.name "Sukanta Hui"
git config user.email "sukanta@coderaccotax.in"

echo "=== Step 2: Creating Base AuthController.js ==="
mkdir -p src/controllers
cat << 'EOF' > src/controllers/AuthController.js
// Coder & AccoTax Auth Controller - Barrackpore
// Initial baseline implementation

function loginUser(req, res) {
    const { username, password } = req.body;
    if (username === "admin" && password === "secret") {
        return res.json({ status: "success", authType: "cookie-session" });
    }
    return res.status(401).json({ error: "Invalid credentials" });
}

module.exports = { loginUser };
EOF

git add src/controllers/AuthController.js
git commit -m "feat: initial basic cookie authentication controller"

echo "=== Step 3: Sachin Works on JWT Authentication (feature/jwt-auth) ==="
git switch -c feature/jwt-auth

cat << 'EOF' > src/controllers/AuthController.js
// Coder & AccoTax Auth Controller - Barrackpore
// Sachin's JWT Stateless Auth Implementation

function loginUser(req, res) {
    const { username, password } = req.body;
    if (username === "admin" && password === "secret") {
        const token = "jwt_token_header_payload_signature_1hr";
        return res.json({
            status: "success",
            authType: "jwt-stateless",
            token,
            consultationFeeBalance: 1200
        });
    }
    return res.status(401).json({ error: "Invalid credentials" });
}

module.exports = { loginUser };
EOF

git commit -am "feat(auth): implement stateless JWT token authentication with 1-hour expiry"

echo "=== Step 4: Susmita Works on MFA OTP Security (feature/mfa-otp) from Base ==="
git switch main
git switch -c feature/mfa-otp

cat << 'EOF' > src/controllers/AuthController.js
// Coder & AccoTax Auth Controller - Barrackpore
// Susmita's MFA OTP Implementation

function loginUser(req, res) {
    const { username, password, otp } = req.body;
    if (username === "admin" && password === "secret") {
        if (otp !== "123456") {
            return res.status(403).json({ error: "Invalid MFA OTP code" });
        }
        return res.json({
            status: "success",
            authType: "mfa-otp-verified",
            isMfaVerified: true,
            sessionDuration: 3600
        });
    }
    return res.status(401).json({ error: "Invalid credentials" });
}

module.exports = { loginUser };
EOF

git commit -am "feat(auth): add mandatory 6-digit SMS OTP multi-factor authentication"

echo "=== Step 5: Sachin Merges his feature/jwt-auth into main First ==="
git switch main
git merge feature/jwt-auth -m "merge: integrate Sachin's JWT authentication engine into main"

echo "main commit graph now:"
git log --oneline -n 3

echo ""
echo "=== Step 6: Susmita Attempts to Merge feature/mfa-otp into main (Triggering Conflict!) ==="
set +e
git merge feature/mfa-otp
MERGE_STATUS=$?
set -e

if [ $MERGE_STATUS -ne 0 ]; then
    echo ""
    echo "===================================================================="
    echo ">>> DRAMA IN THE LAB: Sachin & Susmita's changes clashed on line 7! <<<"
    echo "===================================================================="
    git status
    echo ""
    echo "Viewing conflict markers in src/controllers/AuthController.js:"
    cat src/controllers/AuthController.js
fi

echo ""
echo "=== Step 7: Sukanta Sir's Guided Synthesis (Combining JWT + MFA OTP) ==="
cat << 'EOF' > src/controllers/AuthController.js
// Coder & AccoTax Auth Controller - Barrackpore
// Unified Implementation: MFA Verified Stateless JWT Authentication

function loginUser(req, res) {
    const { username, password, otp } = req.body;
    
    // Step 1: Verify primary credentials
    if (username !== "admin" || password !== "secret") {
        return res.status(401).json({ error: "Invalid credentials" });
    }
    
    // Step 2: Verify Multi-Factor OTP (Susmita's requirement)
    if (otp !== "123456") {
        return res.status(403).json({ error: "Invalid MFA OTP code" });
    }
    
    // Step 3: Issue Stateless JWT Token (Sachin's requirement)
    const token = "jwt_token_mfa_verified_signature_1hr";
    return res.json({
        status: "success",
        authType: "mfa-jwt-stateless",
        isMfaVerified: true,
        token,
        consultationFeeBalance: 1200,
        sessionDuration: 3600
    });
}

module.exports = { loginUser };
EOF

echo "Staging resolved AuthController.js..."
git add src/controllers/AuthController.js

echo "Finalizing merge commit..."
git commit -m "merge: resolve AuthController conflict by uniting MFA OTP security with stateless JWT tokens"

echo ""
echo "=== Step 8: Verifying Unified DAG History ==="
git log --graph --oneline --all

echo "=== Lab Complete: Classroom conflict simulated and resolved masterfully! ==="
