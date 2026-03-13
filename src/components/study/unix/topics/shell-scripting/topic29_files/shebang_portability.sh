#!/bin/sh
# shebang_portability.sh – Detect which shell is running the script

echo "I was invoked as: $0"
echo "Current shell PID: $$"

# Linux-specific (but common) – show actual shell binary
if [ -e /proc/$$/exe ]; then
    shell_path=$(readlink /proc/$$/exe)
    echo "Shell binary: $shell_path"
fi

# Check if we're in bash by looking at $BASH
if [ -n "$BASH" ]; then
    echo "⚠️  This script is running under bash, despite #!/bin/sh"
else
    echo "✅ Running under a pure POSIX shell (not bash)"
fi