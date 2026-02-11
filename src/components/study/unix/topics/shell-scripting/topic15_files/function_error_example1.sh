#!/bin/bash
# Comprehensive error handling in functions

# Function with strict error checking
process_data() {
    # Enable strict error checking within this function
    set -euo pipefail
    
    local input_file="$1"
    local output_file="$2"
    
    # Validate parameters
    if [[ -z "$input_file" || -z "$output_file" ]]; then
        echo "Error: Missing required parameters" >&2
        return 1
    fi
    
    # Check if input file exists and is readable
    if [[ ! -f "$input_file" ]]; then
        echo "Error: Input file not found: $input_file" >&2
        return 2
    fi
    
    if [[ ! -r "$input_file" ]]; then
        echo "Error: Input file not readable: $input_file" >&2
        return 3
    fi
    
    # Create output directory if needed
    local output_dir=$(dirname "$output_file")
    mkdir -p "$output_dir"
    
    # Process the data
    echo "Processing $input_file..."
    
    # Simulate processing (replace with actual logic)
    if ! grep -q "SUCCESS" "$input_file"; then
        echo "Error: Required pattern not found in input" >&2
        return 4
    fi
    
    # Write output
    sed 's/ERROR/WARNING/g' "$input_file" > "$output_file"
    
    # Verify output was created
    if [[ ! -f "$output_file" ]]; then
        echo "Error: Output file not created" >&2
        return 5
    fi
    
    echo "Successfully processed: $input_file → $output_file"
    return 0
}

# Wrapper function with error handling
safe_process() {
    local input="$1"
    local output="$2"
    
    echo "Attempting to process: $input"
    
    # Call the main function
    process_data "$input" "$output"
    local exit_status=$?
    
    # Handle different exit statuses
    case $exit_status in
        0)
            echo "✅ Processing completed successfully"
            ;;
        1)
            echo "❌ Error: Invalid parameters"
            ;;
        2)
            echo "❌ Error: Input file not found"
            ;;
        3)
            echo "❌ Error: Permission denied"
            ;;
        4)
            echo "❌ Error: Invalid data format"
            ;;
        5)
            echo "❌ Error: Output creation failed"
            ;;
        *)
            echo "❌ Error: Unknown error (exit code: $exit_status)"
            ;;
    esac
    
    return $exit_status
}

# Test the functions
echo "Testing error handling in functions..."

# Test 1: Successful processing
safe_process "/tmp/test_input.txt" "/tmp/processed/output.txt"

echo "---"

# Test 2: Missing input file
safe_process "/nonexistent/file.txt" "/tmp/output.txt"