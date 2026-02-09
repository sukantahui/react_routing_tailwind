#!/bin/bash
# Interactive shell features demonstration
# Run this in an interactive terminal session

echo "=== Interactive Shell Features ==="
echo ""

# 1. Job Control Example
echo "1. Starting a background job:"
sleep 5 &
echo "  Job started in background (PID: $!)"
echo ""

# 2. History Expansion
echo "2. History feature available"
echo "  Try: !! (repeats last command)"
echo "  Try: !vim (runs last vim command)"
echo ""

# 3. Command Line Editing
echo "3. Line editing features:"
echo "  Ctrl+A: Move to beginning of line"
echo "  Ctrl+E: Move to end of line"
echo "  Ctrl+U: Clear line"
echo ""

# 4. Prompt Customization
echo "4. Prompt variable PS1 is set:"
echo "  PS1='$PS1'"
echo ""

# 5. Readline capabilities
echo "5. Tab completion works"
echo "  Type 'ls /usr/b' then press Tab"
echo ""

jobs
echo ""
echo "Note: These features only work in interactive shells!"