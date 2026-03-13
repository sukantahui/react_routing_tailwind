#!/bin/bash
# Check file permissions before execution
SCRIPT_PATH="/usr/local/bin/myscript.sh"

if [ ! -f "$SCRIPT_PATH" ]; then
    echo "Error: Script not found at $SCRIPT_PATH"
    exit 1
fi

if [ ! -x "$SCRIPT_PATH" ]; then
    echo "Error: Script is not executable"
    echo "Attempting to make it executable..."
    chmod +x "$SCRIPT_PATH"
    
    # Verify the change worked
    if [ -x "$SCRIPT_PATH" ]; then
        echo "Script is now executable"
    else
        echo "Failed to make script executable"
        exit 1
    fi
fi

# Now safe to execute
"$SCRIPT_PATH" "$@"