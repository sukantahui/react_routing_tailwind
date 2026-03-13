#!/usr/bin/env bash
# Complete script lifecycle example
# Purpose: Demonstrate script structure

# Function definition
greet_user() {
    local username="$1"
    echo "Welcome, ${username}!"
}

# Main script logic
main() {
    echo "Script started at: $(date)"
    echo "Script name: $0"
    echo "Process ID: $$"
    
    # Call function
    greet_user "Swadeep"
    
    # Perform operation
    echo "Creating backup directory..."
    mkdir -p /tmp/backup
    echo "Directory created successfully"
    
    echo "Script completed at: $(date)"
    exit 0
}

# Call main function
main "$@"