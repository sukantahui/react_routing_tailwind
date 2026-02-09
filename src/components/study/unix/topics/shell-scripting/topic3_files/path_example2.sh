#!/bin/bash
# Command Location Examples

echo "=== How Shell Locates Commands ==="
echo ""

# Create test directories and executables
setup_test() {
    echo "Setting up test environment..."
    mkdir -p /tmp/test_bin1 /tmp/test_bin2 /tmp/test_bin3
    
    # Create different versions of 'myapp'
    echo '#!/bin/bash
echo "Running myapp from /tmp/test_bin1 - Version 1.0"' > /tmp/test_bin1/myapp
    chmod +x /tmp/test_bin1/myapp
    
    echo '#!/bin/bash
echo "Running myapp from /tmp/test_bin2 - Version 2.0"' > /tmp/test_bin2/myapp
    chmod +x /tmp/test_bin2/myapp
    
    echo '#!/bin/bash
echo "Running myapp from /tmp/test_bin3 - Version 3.0"' > /tmp/test_bin3/myapp
    chmod +x /tmp/test_bin3/myapp
    
    # Create an alias
    echo '#!/bin/bash
echo "This is an actual script, not an alias"' > /tmp/test_bin1/myalias
    chmod +x /tmp/test_bin1/myalias
}

cleanup_test() {
    echo "Cleaning up test environment..."
    rm -rf /tmp/test_bin1 /tmp/test_bin2 /tmp/test_bin3
}

setup_test

echo ""
echo "1. Understanding 'which' command:"
echo "   which ls: $(which ls)"
echo "   which bash: $(which bash)"
echo "   which myapp: $(which myapp 2>/dev/null || echo 'Not found')"
echo ""

echo "2. Understanding 'type' command:"
echo "   type ls:"
type ls
echo ""
echo "   type cd:"
type cd
echo ""
echo "   type ll:"
type ll 2>/dev/null || echo "ll: not found"
echo ""

echo "3. PATH search order demonstration:"
echo "   Setting PATH with multiple myapp versions..."
OLD_PATH="$PATH"
export PATH="/tmp/test_bin1:/tmp/test_bin2:/tmp/test_bin3:$PATH"

echo "   PATH order:"
echo "$PATH" | tr ':' '\n' | grep test_bin | nl
echo ""

echo "   Running 'myapp':"
myapp
echo ""

echo "4. Changing PATH order changes which version runs:"
export PATH="/tmp/test_bin3:/tmp/test_bin2:/tmp/test_bin1:$PATH"
echo "   New PATH order (reversed):"
echo "$PATH" | tr ':' '\n' | grep test_bin | nl
echo ""

echo "   Running 'myapp' now:"
myapp
echo ""

echo "5. Command not found scenarios:"
echo "   Trying non-existent command:"
nonexistent_command 2>&1 | head -1
echo ""

echo "6. Shell builtins vs external commands:"
echo "   'cd' is a shell builtin:"
type cd
echo "   Location (should be empty for builtins): $(which cd 2>/dev/null || echo 'builtin')"
echo ""

echo "   'ls' is an external command:"
type ls
echo "   Location: $(which ls)"
echo ""

echo "7. Aliases vs commands:"
# Create an alias
alias myalias="echo 'This is an alias, not a script'"
echo "   Created alias: myalias"
echo "   type myalias:"
type myalias
echo "   which myalias: $(which myalias 2>/dev/null || echo 'alias')"
echo "   Running myalias:"
myalias
echo ""

echo "8. Function vs command:"
# Create a function
myfunction() {
    echo "This is a shell function"
}
echo "   Created function: myfunction"
echo "   type myfunction:"
type myfunction
echo ""

# Restore PATH
export PATH="$OLD_PATH"

cleanup_test

echo "=== Key Takeaways ==="
echo "• 'which' shows path to executable"
echo "• 'type' shows if command is builtin, alias, function, or external"
echo "• PATH order determines which version runs"
echo "• Builtins (cd, echo) don't use PATH"
echo "• Aliases and functions override external commands"