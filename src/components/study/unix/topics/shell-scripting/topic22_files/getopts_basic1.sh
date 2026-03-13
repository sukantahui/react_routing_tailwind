#!/bin/bash
# Basic getopts example for Barrackpore College scripts

# Default values
INPUT_FILE=""
OUTPUT_FILE="output.txt"
VERBOSE=0

# Help function
usage() {
    echo "Usage: $0 [-f input_file] [-o output_file] [-v] [arguments...]"
    echo "Options:"
    echo "  -f FILE    Input file (required)"
    echo "  -o FILE    Output file (default: output.txt)"
    echo "  -v         Verbose mode"
    echo "  -h         Show this help message"
    echo ""
    echo "Example: $0 -f students.csv -o report.txt -v"
    exit 1
}

# Parse command line options
while getopts ":f:o:vh" opt; do
    case $opt in
        f)
            INPUT_FILE="$OPTARG"
            ;;
        o)
            OUTPUT_FILE="$OPTARG"
            ;;
        v)
            VERBOSE=1
            ;;
        h)
            usage
            ;;
        \?)
            echo "Invalid option: -$OPTARG" >&2
            usage
            ;;
        :)
            echo "Option -$OPTARG requires an argument." >&2
            usage
            ;;
    esac
done

# Shift processed options out
shift $((OPTIND - 1))

# Validate required options
if [ -z "$INPUT_FILE" ]; then
    echo "Error: Input file (-f) is required." >&2
    usage
fi

if [ ! -f "$INPUT_FILE" ]; then
    echo "Error: Input file '$INPUT_FILE' not found." >&2
    exit 1
fi

# Display settings if verbose
if [ $VERBOSE -eq 1 ]; then
    echo "=== Script Configuration ==="
    echo "Input file: $INPUT_FILE"
    echo "Output file: $OUTPUT_FILE"
    echo "Verbose mode: ON"
    echo "Additional arguments: $@"
    echo "============================"
fi

# Process remaining arguments (if any)
for arg in "$@"; do
    if [ $VERBOSE -eq 1 ]; then
        echo "Processing argument: $arg"
    fi
done

echo "Processing complete. Output saved to $OUTPUT_FILE"