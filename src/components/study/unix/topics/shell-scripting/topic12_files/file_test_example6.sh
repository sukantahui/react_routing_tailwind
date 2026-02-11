#!/bin/bash
# Handle symbolic links properly
LINK_PATH="/tmp/mylink"

if [ -L "$LINK_PATH" ]; then
    echo "$LINK_PATH is a symbolic link"
    REAL_PATH=$(readlink -f "$LINK_PATH")
    echo "Points to: $REAL_PATH"
    
    # Check if the target exists
    if [ -e "$LINK_PATH" ]; then
        echo "Link target exists"
        process_file "$REAL_PATH"
    else
        echo "Warning: Link target does not exist (broken link)"
    fi
elif [ -f "$LINK_PATH" ]; then
    echo "$LINK_PATH is a regular file"
    process_file "$LINK_PATH"
else
    echo "$LINK_PATH is not a file or link"
fi