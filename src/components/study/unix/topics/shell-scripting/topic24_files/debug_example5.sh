#!/bin/bash
# debug_example5.sh - Custom debug function with levels
# Shows professional debugging approach

# Debug levels
DEBUG_LEVEL=${DEBUG_LEVEL:-0}  # 0=off, 1=error, 2=warning, 3=info, 4=debug

# Custom debug function
debug() {
    local level="$1"
    local message="$2"
    
    if [ "$DEBUG_LEVEL" -ge "$level" ]; then
        case "$level" in
            1) prefix="[ERROR] " ;;
            2) prefix="[WARN]  " ;;
            3) prefix="[INFO]  " ;;
            4) prefix="[DEBUG] " ;;
            *) prefix="" ;;
        esac
        
        # Print with timestamp and script name
        echo "$(date '+%Y-%m-%d %H:%M:%S') ${prefix}${BASH_SOURCE[0]##*/}:${BASH_LINENO[0]} - $message" >&2
    fi
}

# Main processing function
process_data() {
    local input_file="$1"
    local output_file="$2"
    
    debug 3 "Starting to process $input_file"
    
    # Check if input file exists
    if [ ! -f "$input_file" ]; then
        debug 1 "Input file not found: $input_file"
        return 1
    fi
    
    # Count lines in input file
    line_count=$(wc -l < "$input_file")
    debug 4 "File has $line_count lines"
    
    # Process each line
    local processed=0
    while IFS= read -r line; do
        # Skip empty lines
        if [ -z "$line" ]; then
            debug 4 "Skipping empty line"
            continue
        fi
        
        # Process the line (example: convert to uppercase)
        echo "$line" | tr '[:lower:]' '[:upper:]' >> "$output_file"
        processed=$((processed + 1))
        
        debug 4 "Processed line: $line"
    done < "$input_file"
    
    debug 3 "Processed $processed lines from $input_file"
    return 0
}

# Main script
debug 3 "Script started with DEBUG_LEVEL=$DEBUG_LEVEL"

# Create test data
TEST_INPUT="/tmp/test_input.txt"
TEST_OUTPUT="/tmp/test_output.txt"

cat > "$TEST_INPUT" << EOF
Hello from Barrackpore
Greetings from Shyamnagar
Welcome from Ichapur
EOF

debug 4 "Created test input file: $TEST_INPUT"

# Process the data
if process_data "$TEST_INPUT" "$TEST_OUTPUT"; then
    debug 3 "Data processing completed successfully"
    echo "Output file contents:"
    cat "$TEST_OUTPUT"
else
    debug 1 "Data processing failed"
    exit 1
fi

# Cleanup
rm -f "$TEST_INPUT" "$TEST_OUTPUT"
debug 3 "Cleanup completed"

debug 3 "Script finished"