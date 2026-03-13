#!/bin/bash
# Function-based error handling in Naihati projects

echo "=== Naihati Project Validation ==="

# Function with custom exit codes
validate_file() {
    local file="$1"
    
    if [ -z "$file" ]; then
        echo "ERROR: No file specified"
        return 1  # Missing parameter
    fi
    
    if [ ! -e "$file" ]; then
        echo "ERROR: File does not exist: $file"
        return 2  # File not found
    fi
    
    if [ ! -f "$file" ]; then
        echo "ERROR: Not a regular file: $file"
        return 3  # Not a file
    fi
    
    if [ ! -r "$file" ]; then
        echo "ERROR: File not readable: $file"
        return 4  # Permission denied
    fi
    
    if [ ! -s "$file" ]; then
        echo "ERROR: File is empty: $file"
        return 5  # Empty file
    fi
    
    echo "✓ File validation passed: $file"
    return 0  # Success
}

# Function to process validated file
process_file() {
    local file="$1"
    
    echo "Processing $file..."
    
    # Count lines
    local line_count=$(wc -l < "$file")
    echo "  Line count: $line_count"
    
    # Check for errors in content
    if grep -q "ERROR" "$file"; then
        echo "  WARNING: File contains ERROR markers"
        return 10  # Content warning
    fi
    
    # Process based on file type
    case "$file" in
        *.csv)
            echo "  Processing as CSV"
            # CSV processing logic
            return 0
            ;;
        *.json)
            echo "  Processing as JSON"
            # JSON processing logic
            return 0
            ;;
        *.txt)
            echo "  Processing as text"
            # Text processing logic
            return 0
            ;;
        *)
            echo "  WARNING: Unknown file type"
            return 20  # Unknown type
            ;;
    esac
}

# Main script
main() {
    local input_file="${1:-/etc/hosts}"
    
    echo "Validating file: $input_file"
    validate_file "$input_file"
    local validate_exit=$?
    
    if [ $validate_exit -ne 0 ]; then
        echo "File validation failed with code: $validate_exit"
        return $validate_exit
    fi
    
    echo "File validation successful, proceeding to processing..."
    process_file "$input_file"
    local process_exit=$?
    
    if [ $process_exit -eq 0 ]; then
        echo "✓ File processing completed successfully"
        return 0
    elif [ $process_exit -eq 10 ]; then
        echo "⚠ File processed with warnings"
        return 0  # Treat warnings as success for now
    else
        echo "✗ File processing failed with code: $process_exit"
        return $process_exit
    fi
}

# Execute main function and capture exit status
main "$1"
final_exit=$?

echo -e "\n=== Script Exit ==="
echo "Exit code: $final_exit"
exit $final_exit