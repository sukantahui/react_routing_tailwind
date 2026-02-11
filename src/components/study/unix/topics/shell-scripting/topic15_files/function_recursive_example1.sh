#!/bin/bash
# Recursive directory traversal for file processing

# Recursive function to find and process files
find_and_process() {
    local dir="$1"
    local pattern="${2:-*}"  # Default pattern: all files
    
    # Safety check: prevent infinite recursion
    local depth=${3:-0}
    if (( depth > 20 )); then
        echo "Error: Maximum recursion depth reached" >&2
        return 1
    fi
    
    # Process current directory
    echo "Scanning directory: $dir (depth: $depth)"
    
    # Process files matching pattern
    for file in "$dir"/$pattern; do
        if [[ -f "$file" ]]; then
            process_file "$file"
        fi
    done
    
    # Recursively process subdirectories
    for subdir in "$dir"/*/; do
        if [[ -d "$subdir" ]]; then
            find_and_process "$subdir" "$pattern" $((depth + 1))
        fi
    done
}

# Function to process individual files
process_file() {
    local file="$1"
    local size=$(stat -c%s "$file" 2>/dev/null)
    
    if [[ -n "$size" ]]; then
        echo "  Processing: $(basename "$file") (${size} bytes)"
        # Actual file processing would go here
    fi
}

# Main execution
echo "Recursive file processing for project directory..."

# Start recursion from current directory
find_and_process "/home/projects/naihati" "*.txt"

echo "Processing complete!"