#!/bin/bash
# login_flow.sh - Test script to understand bash startup file execution
# Run this script to see which startup files get loaded in different scenarios

echo "=== Testing Bash Startup File Execution ==="
echo ""

# Create test startup files
create_test_files() {
    echo "Creating test startup files..."
    
    # Create .bashrc test
    cat > /tmp/test_bashrc << 'EOF'
echo "[.bashrc] Loaded at $(date)"
export TEST_BASHRC="loaded"
EOF
    
    # Create .bash_profile test
    cat > /tmp/test_bash_profile << 'EOF'
echo "[.bash_profile] Loaded at $(date)"
export TEST_BASH_PROFILE="loaded"
if [ -f /tmp/test_bashrc ]; then
    source /tmp/test_bashrc
fi
EOF
    
    # Create .profile test
    cat > /tmp/test_profile << 'EOF'
echo "[.profile] Loaded at $(date)"
export TEST_PROFILE="loaded"
EOF
}

cleanup_test_files() {
    echo "Cleaning up test files..."
    rm -f /tmp/test_bashrc /tmp/test_bash_profile /tmp/test_profile
}

run_test() {
    local description="$1"
    local command="$2"
    
    echo ""
    echo "--- $description ---"
    echo "Command: $command"
    echo "Output:"
    
    # Set test files as our startup files
    export BASHRC_TEST=/tmp/test_bashrc
    export BASH_PROFILE_TEST=/tmp/test_bash_profile
    export PROFILE_TEST=/tmp/test_profile
    
    eval "$command"
    
    echo "Environment variables set:"
    env | grep TEST_ | sort || echo "No TEST_ variables found"
}

# Main execution
create_test_files

echo ""
echo "1. Login Shell Test (simulates SSH login)"
run_test "Login Shell" "bash --login -c 'echo \"Shell type: login\" && env | grep -E \"(TEST_|BASH)\"'"

echo ""
echo "2. Non-Login Interactive Shell Test (simulates new terminal)"
run_test "Non-Login Shell" "bash -i -c 'echo \"Shell type: non-login interactive\" && env | grep -E \"(TEST_|BASH)\"' <<< 'exit'"

echo ""
echo "3. Non-Interactive Shell Test (simulates script execution)"
run_test "Non-Interactive Shell" "bash -c 'echo \"Shell type: non-interactive\" && env | grep -E \"(TEST_|BASH)\"'"

echo ""
echo "4. With BASH_ENV set"
export BASH_ENV=/tmp/test_bashrc
run_test "With BASH_ENV" "bash -c 'echo \"BASH_ENV test\" && echo \"TEST_BASHRC=\$TEST_BASHRC\"'"
unset BASH_ENV

echo ""
echo "5. Direct sourcing test"
echo "Sourcing .bash_profile directly:"
source /tmp/test_bash_profile
echo "TEST_BASH_PROFILE=$TEST_BASH_PROFILE"
echo "TEST_BASHRC=$TEST_BASHRC"

cleanup_test_files

echo ""
echo "=== Summary ==="
echo "• Login shells: Read /etc/profile, then ~/.bash_profile or ~/.profile"
echo "• Non-login interactive shells: Read ~/.bashrc only"
echo "• Non-interactive shells: Read BASH_ENV if set, otherwise nothing"
echo ""
echo "Best Practice: Put environment variables in .bash_profile/.profile"
echo "               Put aliases and functions in .bashrc"
echo "               Source .bashrc from .bash_profile"