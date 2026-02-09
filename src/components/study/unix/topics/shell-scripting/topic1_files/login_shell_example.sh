#!/bin/bash
# Test script to demonstrate login shell behavior

echo "=== Shell Environment Analysis ==="
echo ""

# Check if this is a login shell
if shopt -q login_shell; then
    echo "✓ This is a LOGIN shell"
    echo "  Shell name: $0"
else
    echo "✗ This is a NON-LOGIN shell"
    echo "  Shell name: $0"
fi

echo ""

# Check if interactive
if [[ $- == *i* ]]; then
    echo "✓ This is an INTERACTIVE shell"
    echo "  Prompt (PS1): '$PS1'"
else
    echo "✗ This is a NON-INTERACTIVE shell"
    echo "  Prompt (PS1): '$PS1'"
fi

echo ""

# Show which startup files would be read
echo "=== Startup Files Analysis ==="
echo "Based on shell type, these files would be read:"
echo ""

if shopt -q login_shell; then
    echo "Login shells read (in order):"
    echo "  1. /etc/profile"
    echo "  2. ~/.bash_profile"
    echo "  3. ~/.bash_login (if .bash_profile doesn't exist)"
    echo "  4. ~/.profile (if neither of above exist)"
    echo ""
    echo "They do NOT read:"
    echo "  • ~/.bashrc (unless explicitly sourced)"
else
    echo "Non-login shells read:"
    echo "  1. ~/.bashrc"
    echo "  2. /etc/bash.bashrc (on some systems)"
    echo ""
    echo "They do NOT read:"
    echo "  • ~/.bash_profile"
    echo "  • ~/.profile"
fi

echo ""
echo "=== Environment Variables ==="
echo "PATH: $PATH"
echo "HOME: $HOME"
echo "USER: $USER"
echo "SHELL: $SHELL"