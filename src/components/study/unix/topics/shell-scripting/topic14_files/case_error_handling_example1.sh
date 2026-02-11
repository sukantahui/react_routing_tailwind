#!/bin/bash
# Comprehensive error handling with case statements
handle_error() {
    local error_code="$1"
    local context="$2"
    
    case "$error_code" in
        0)
            echo "Success: $context completed successfully."
            ;;
        1)
            echo "Error: General error in $context."
            ;;
        2)
            echo "Error: Misuse of shell builtins in $context."
            ;;
        126)
            echo "Error: Command invoked cannot execute in $context."
            ;;
        127)
            echo "Error: Command not found in $context."
            ;;
        128)
            echo "Error: Invalid argument to exit in $context."
            ;;
        130)
            echo "Error: Script terminated by Control-C in $context."
            ;;
        255)
            echo "Error: Exit status out of range in $context."
            ;;
        *)
            if (( error_code > 128 && error_code <= 148 )); then
                signal=$((error_code - 128))
                echo "Error: Terminated by signal $signal in $context."
            elif (( error_code > 148 )); then
                echo "Error: Unknown exit status $error_code in $context."
            else
                echo "Error: Exit code $error_code in $context."
            fi
            ;;
    esac
}

# Example usage
check_file() {
    local file="$1"
    
    if [ ! -e "$file" ]; then
        handle_error 1 "File existence check for '$file'"
        return 1
    fi
    
    if [ ! -r "$file" ]; then
        handle_error 126 "File read permission check for '$file'"
        return 126
    fi
    
    echo "File '$file' is accessible."
    return 0
}

# Test the error handling
echo "Testing error handling in Barrackpore system..."

# Test case 1: Non-existent file
check_file "/nonexistent/file.txt"
result=$?
handle_error $result "File check for non-existent file"

echo "---"

# Test case 2: Existing file
check_file "/etc/passwd"
result=$?
handle_error $result "File check for /etc/passwd"

echo "---"

# Test case 3: Command not found
nonexistent_command 2>/dev/null
result=$?
handle_error $result "Running nonexistent command"