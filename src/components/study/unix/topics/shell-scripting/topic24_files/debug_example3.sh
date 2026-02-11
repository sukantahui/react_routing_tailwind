#!/bin/bash
# debug_example3.sh - Combined set -ex
# Shows both trace and exit-on-error behavior

set -ex  # Enable both trace mode and exit on error

# Function to process user data
process_user() {
    local username="$1"
    local home_dir="/home/$username"
    
    echo "Processing user: $username"
    
    # Check if user home exists
    if [ ! -d "$home_dir" ]; then
        echo "Error: Home directory not found for $username"
        return 1
    fi
    
    # Count files in user's home
    file_count=$(find "$home_dir" -type f -name "*.txt" 2>/dev/null | wc -l)
    echo "Found $file_count text files"
    
    return 0
}

# Main script
echo "Starting user data processing..."

# Process multiple users
process_user "swadeep"
process_user "tuhina"

# This will fail and exit the script
process_user "nonexistentuser"

echo "Processing complete"  # This won't execute