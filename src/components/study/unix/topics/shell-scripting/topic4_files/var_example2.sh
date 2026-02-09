#!/bin/bash
# Environment Variable Examples

echo "=== Environment Variables (Exported Variables) ==="
echo ""

# 1. Creating and exporting environment variables
echo "1. Creating environment variables:"
export DATABASE_URL="postgresql://localhost:5432/mydb"
export APP_ENV="production"
export MAX_CONNECTIONS=100
echo "  DATABASE_URL='$DATABASE_URL'"
echo "  APP_ENV='$APP_ENV'"
echo "  MAX_CONNECTIONS=$MAX_CONNECTIONS"
echo ""

# 2. Showing all environment variables
echo "2. Current environment variables (partial list):"
echo "  Running: printenv | head -15"
printenv | head -15
echo ""

# 3. Exporting existing variables
echo "3. Exporting existing variables:"
TEMP_DIR="/tmp/myapp"
export TEMP_DIR
echo "  TEMP_DIR exported: $TEMP_DIR"
echo ""

# 4. One-line export and assignment
echo "4. Export and assign in one line:"
export API_KEY="secret-key-12345"
echo "  API_KEY exported: ${API_KEY:0:10}..."
echo ""

# 5. Testing inheritance in subshell
echo "5. Testing variable inheritance:"
export INHERITED_VAR="I am inherited"
NORMAL_VAR="I am NOT inherited"

echo "  In parent shell:"
echo "    INHERITED_VAR: $INHERITED_VAR"
echo "    NORMAL_VAR: $NORMAL_VAR"
echo ""

echo "  In subshell:"
(
    echo "    INHERITED_VAR: ${INHERITED_VAR:-Not found}"
    echo "    NORMAL_VAR: ${NORMAL_VAR:-Not found}"
)
echo ""

# 6. Using environment variables in child processes
echo "6. Passing to child processes:"
export CONFIG_PATH="/etc/myapp/config.yaml"

# Create a test Python script
cat > /tmp/test_env.py << 'EOF'
import os
print("Python sees CONFIG_PATH:", os.environ.get('CONFIG_PATH', 'Not found'))
print("Python sees NORMAL_VAR:", os.environ.get('NORMAL_VAR', 'Not found'))
EOF

echo "  Running Python script:"
python3 /tmp/test_env.py
echo ""

# 7. Common important environment variables
echo "7. Important system environment variables:"
echo "  USER: $USER"
echo "  HOME: $HOME"
echo "  SHELL: $SHELL"
echo "  PATH: $PATH"
echo "  PWD: $PWD"
echo "  LANG: $LANG"
echo ""

# 8. Removing environment variables
echo "8. Removing environment variables:"
export TO_BE_REMOVED="remove me"
echo "  Before: TO_BE_REMOVED='$TO_BE_REMOVED'"
unset TO_BE_REMOVED
echo "  After unset: TO_BE_REMOVED='${TO_BE_REMOVED:-unset}'"
echo ""

# 9. Making variables read-only
echo "9. Read-only environment variables:"
export READONLY_VAR="cannot change"
readonly READONLY_VAR
echo "  READONLY_VAR: $READONLY_VAR"
echo "  Trying to change (will error):"
READONLY_VAR="new value" 2>/dev/null || echo "  ✓ Failed as expected"
echo ""

# 10. Exporting functions
echo "10. Exporting shell functions:"
my_function() {
    echo "Hello from exported function"
}
export -f my_function

echo "  Testing in subshell:"
bash -c 'my_function' 2>/dev/null && echo "  ✓ Function executed in subshell"
echo ""

echo "=== When to Use Environment Variables ==="
echo "• Configuration for child processes"
echo "• Database connections, API keys"
echo "• Environment-specific settings (dev/staging/prod)"
echo "• Paths needed by external tools"
echo "• Shared configuration between scripts"