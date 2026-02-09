#!/bin/bash
# Positional Parameters Examples
# Topic 8: Reading User Input

echo "=== POSITIONAL PARAMETERS EXAMPLES ==="
echo

# Example 1: Basic positional parameters
echo "Example 1: Basic usage"
echo "Script name: $0"
echo "First argument: $1"
echo "Second argument: $2"
echo "Third argument: $3"
echo

# Example 2: Argument count
echo "Example 2: Argument count checking"
echo "Total arguments: $#"
echo "All arguments: $@"
echo

# Example 3: Looping through all arguments
echo "Example 3: Processing all arguments"
echo "Processing $# file(s):"
count=1
for file in "$@"; do
    echo "  $count. $file"
    count=$((count + 1))
done
echo

# Example 4: Using shift
echo "Example 4: Using shift to process arguments"
echo "Original arguments: $@"
echo "Processing first argument: $1"
shift  # Remove first argument
echo "After shift, remaining: $@"
echo "New first argument: $1"
echo

# Example 5: Default values
echo "Example 5: Default values for arguments"
input_file="${1:-input.txt}"
output_file="${2:-output.txt}"
echo "Input file: $input_file"
echo "Output file: $output_file"
echo

# Example 6: Argument validation
echo "Example 6: Argument validation"
if [ $# -lt 2 ]; then
    echo "Error: Insufficient arguments"
    echo "Usage: $0 source destination"
    echo "Example: $0 /home/tuhina /backup"
    exit 1
fi

source="$1"
destination="$2"

if [ ! -d "$source" ]; then
    echo "Error: Source directory '$source' not found"
    exit 1
fi

if [ ! -d "$destination" ]; then
    echo "Warning: Destination '$destination' doesn't exist, creating..."
    mkdir -p "$destination"
fi

echo "Backup from $source to $destination"
echo

# Example 7: Processing specific arguments
echo "Example 7: Named argument processing"
while [ $# -gt 0 ]; do
    case "$1" in
        -v|--verbose)
            verbose=1
            shift
            ;;
        -o|--output)
            output="$2"
            shift 2
            ;;
        *)
            # Assume it's a filename
            files+=("$1")
            shift
            ;;
    esac
done

echo "Verbose mode: ${verbose:-0}"
echo "Output file: ${output:-stdout}"
echo "Files to process: ${files[*]}"
echo

# Example 8: All special parameters
echo "Example 8: All special parameters"
echo "\$0 (script): $0"
echo "\$# (count): $#"
echo "\$@ (all): $@"
echo "\$* (all as one): $*"
echo "\$$ (PID): $$"
echo "\$? (exit code): $?"
echo

# Example 9: Practical file processing
echo "Example 9: Practical file processing example"
if [ $# -eq 0 ]; then
    echo "No files specified. Processing all .txt files in current directory..."
    files=(*.txt)
else
    files=("$@")
fi

echo "Processing ${#files[@]} file(s):"
for file in "${files[@]}"; do
    if [ -f "$file" ]; then
        lines=$(wc -l < "$file")
        words=$(wc -w < "$file")
        echo "  $file: $lines lines, $words words"
    else
        echo "  Warning: $file not found"
    fi
done