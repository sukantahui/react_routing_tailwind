#!/bin/bash
# PATH Examples - Viewing and Modifying PATH

echo "=== Understanding PATH Variable ==="
echo ""

# 1. View current PATH
echo "1. Current PATH variable:"
echo "$PATH"
echo ""

# 2. Show PATH in readable format
echo "2. PATH directories (one per line):"
echo "$PATH" | tr ':' '\n' | nl
echo ""

# 3. Check if a directory is in PATH
check_in_path() {
    local dir_to_check="$1"
    if echo "$PATH" | tr ':' '\n' | grep -q "^$dir_to_check$"; then
        echo "✓ $dir_to_check is in PATH"
    else
        echo "✗ $dir_to_check is NOT in PATH"
    fi
}

echo "3. Checking common directories:"
check_in_path "/usr/local/bin"
check_in_path "/usr/bin"
check_in_path "/bin"
check_in_path "$HOME/bin"
echo ""

# 4. Add directory to PATH temporarily
echo "4. Adding ~/scripts to PATH (temporary):"
export PATH="$PATH:$HOME/scripts"
echo "New PATH: $PATH"
echo ""

# 5. Add directory to PATH (prepend - higher priority)
echo "5. Adding /opt/myapp/bin to beginning of PATH:"
export PATH="/opt/myapp/bin:$PATH"
echo "New PATH: $PATH"
echo ""

# 6. Remove duplicate entries from PATH
echo "6. Cleaning duplicate PATH entries:"
clean_path=$(echo "$PATH" | awk -v RS=: '!a[$0]++' | paste -sd:)
export PATH="$clean_path"
echo "Cleaned PATH: $PATH"
echo ""

# 7. Check which executable will be run
echo "7. Checking command locations:"
commands_to_check=("ls" "python3" "bash" "git" "docker")
for cmd in "${commands_to_check[@]}"; do
    location=$(which "$cmd" 2>/dev/null || echo "Not found")
    echo "  $cmd -> $location"
done
echo ""

# 8. Create user bin directory if it doesn't exist
echo "8. Setting up personal bin directory:"
if [ ! -d "$HOME/bin" ]; then
    echo "Creating $HOME/bin directory..."
    mkdir -p "$HOME/bin"
    echo "Add to .bashrc: export PATH=\"\$PATH:\$HOME/bin\""
else
    echo "$HOME/bin already exists"
fi
echo ""

echo "=== PATH Management Tips ==="
echo "• Use 'export PATH=\$PATH:/new/path' to append"
echo "• Use 'export PATH=/new/path:\$PATH' to prepend"
echo "• Never include '.' in PATH for security"
echo "• Check with 'which command' before troubleshooting"