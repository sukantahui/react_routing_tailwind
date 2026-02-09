#!/bin/bash
# Script Execution Methods

echo "=== Different Ways to Execute Shell Scripts ==="
echo ""

# Create test scripts
create_test_scripts() {
    echo "Creating test scripts..."
    
    # Script 1: Simple hello world
    cat > /tmp/hello.sh << 'EOF'
#!/bin/bash
# hello.sh - Simple test script
echo "Hello from $(hostname) at $(date)"
echo "Script name: $0"
echo "Running from directory: $(pwd)"
echo "User: $(whoami)"
EOF
    chmod +x /tmp/hello.sh
    
    # Script 2: With parameters
    cat > /tmp/greet.sh << 'EOF'
#!/bin/bash
# greet.sh - Script with parameters
if [ $# -eq 0 ]; then
    echo "Hello anonymous!"
else
    echo "Hello $1!"
fi
echo "Number of arguments: $#"
echo "All arguments: $@"
EOF
    chmod +x /tmp/greet.sh
    
    # Script 3: That modifies environment
    cat > /tmp/setenv.sh << 'EOF'
#!/bin/bash
# setenv.sh - Script that modifies environment
export MY_VAR="Script set this variable"
echo "MY_VAR set to: $MY_VAR"
change_dir() {
    cd /tmp
    echo "Changed to: $(pwd)"
}
change_dir
EOF
    chmod +x /tmp/setenv.sh
}

cleanup_scripts() {
    rm -f /tmp/hello.sh /tmp/greet.sh /tmp/setenv.sh
}

create_test_scripts

echo "1. Method 1: Direct execution (requires executable bit)"
echo "   Command: ./hello.sh"
echo "   Result:"
/tmp/hello.sh
echo ""

echo "2. Method 2: Using bash interpreter"
echo "   Command: bash /tmp/hello.sh"
echo "   Result:"
bash /tmp/hello.sh
echo ""

echo "3. Method 3: Using sh interpreter"
echo "   Command: sh /tmp/hello.sh"
echo "   Result:"
sh /tmp/hello.sh
echo ""

echo "4. Method 4: Sourcing the script (runs in current shell)"
echo "   Command: source /tmp/setenv.sh"
echo "   Before sourcing: MY_VAR=${MY_VAR:-not set}"
source /tmp/setenv.sh
echo "   After sourcing: MY_VAR=$MY_VAR"
echo "   Current directory: $(pwd)"
echo ""

# Reset directory
cd ~

echo "5. Method 5: Dot command (same as source)"
echo "   Command: . /tmp/setenv.sh"
echo "   Before: MY_VAR=${MY_VAR:-not set}"
. /tmp/setenv.sh
echo "   After: MY_VAR=$MY_VAR"
echo ""

# Reset variable
unset MY_VAR

echo "6. Method 6: Execution without ./ (requires PATH)"
echo "   Without PATH: hello.sh"
hello.sh 2>&1 | head -1
echo ""
echo "   Adding to PATH temporarily:"
OLD_PATH="$PATH"
export PATH="/tmp:$PATH"
echo "   hello.sh (now works):"
hello.sh
export PATH="$OLD_PATH"
echo ""

echo "7. Method 7: Absolute path"
echo "   Command: /tmp/hello.sh"
echo "   Result:"
/tmp/hello.sh
echo ""

echo "8. Method 8: With command substitution"
echo "   Command: result=\$(/tmp/greet.sh Swadeep)"
result=$(/tmp/greet.sh Swadeep)
echo "   Result captured in variable:"
echo "$result"
echo ""

echo "9. Method 9: With parameters"
echo "   Command: /tmp/greet.sh Tuhina Abhronila Debangshu"
/tmp/greet.sh Tuhina Abhronila Debangshu
echo ""

echo "10. Method 10: Piping input to script"
echo "    Creating script that reads stdin..."
cat > /tmp/read_input.sh << 'EOF'
#!/bin/bash
# read_input.sh - Reads from stdin
echo "Script received input:"
while IFS= read -r line; do
    echo "  Line: $line"
done
EOF
chmod +x /tmp/read_input.sh

echo "    Command: echo -e 'Line 1\nLine 2' | /tmp/read_input.sh"
echo -e "Line 1\nLine 2" | /tmp/read_input.sh
echo ""

echo "=== Comparison Table ==="
echo "+-------------------+---------------------+---------------------------+"
echo "| Method            | Runs in             | Environment Changes       |"
echo "+-------------------+---------------------+---------------------------+"
echo "| ./script.sh       | New shell           | Lost after script ends    |"
echo "| bash script.sh    | New shell           | Lost after script ends    |"
echo "| source script.sh  | Current shell       | Persists                  |"
echo "| . script.sh       | Current shell       | Persists                  |"
echo "| script.sh (PATH)  | New shell           | Lost after script ends    |"
echo "+-------------------+---------------------+---------------------------+"

cleanup_scripts

echo ""
echo "=== Key Differences ==="
echo "• ./script.sh: Requires executable permission, runs in subshell"
echo "• source script.sh: No permission needed, runs in current shell"
echo "• script.sh: Requires directory in PATH, runs in subshell"
echo "• bash script.sh: Explicit interpreter, runs in subshell"
echo ""
echo "Use 'source' when you want to:"
echo "  - Modify current shell environment"
echo "  - Define functions/aliases for current session"
echo "  - Run configuration scripts"
echo ""
echo "Use './' or bash when you want to:"
echo "  - Run independent scripts"
echo "  - Avoid modifying current environment"
echo "  - Run scripts with different interpreters"