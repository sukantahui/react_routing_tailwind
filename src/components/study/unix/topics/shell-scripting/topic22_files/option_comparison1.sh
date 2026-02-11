#!/bin/bash
# Comparison of different option parsing methods

echo "=== Method Comparison: Parsing '-f file.txt -v' ==="
echo

# Method 1: Manual parsing (not recommended)
echo "1. MANUAL PARSING (Error-prone):"
cat << 'EOF'
while [ $# -gt 0 ]; do
    case $1 in
        -f)
            if [ -z "$2" ]; then
                echo "Error: -f requires argument"
                exit 1
            fi
            FILE="$2"
            shift 2
            ;;
        -v)
            VERBOSE=1
            shift
            ;;
        *)
            echo "Unknown option: $1"
            exit 1
            ;;
    esac
done
EOF
echo "Issues: No support for -vf, messy error handling"
echo

# Method 2: getopts (recommended for short options)
echo "2. GETOPTS (Built-in, Portable):"
cat << 'EOF'
while getopts ":f:v" opt; do
    case $opt in
        f) FILE="$OPTARG" ;;
        v) VERBOSE=1 ;;
        ?) echo "Invalid option" >&2; exit 1 ;;
        :) echo "Option requires argument" >&2; exit 1 ;;
    esac
done
shift $((OPTIND - 1))
EOF
echo "Pros: Portable, handles -vf, good error handling"
echo "Cons: No long option support"
echo

# Method 3: getopt (external, more features)
echo "3. GETOPT (External, More Features):"
cat << 'EOF'
TEMP=$(getopt -o f:v --long file:,verbose -n "$0" -- "$@")
eval set -- "$TEMP"

while true; do
    case "$1" in
        -f|--file)
            FILE="$2"
            shift 2
            ;;
        -v|--verbose)
            VERBOSE=1
            shift
            ;;
        --)
            shift
            break
            ;;
        *)
            echo "Internal error!"
            exit 1
            ;;
    esac
done
EOF
echo "Pros: Long option support, more Unix-like"
echo "Cons: Not always available, external dependency"
echo

# Method 4: Modern approach with shift
echo "4. MODERN MANUAL (Simple cases only):"
cat << 'EOF'
while [[ $# -gt 0 ]]; do
    case $1 in
        -f|--file)
            FILE="$2"
            shift 2
            ;;
        -v|--verbose)
            VERBOSE=1
            shift
            ;;
        -*)
            echo "Unknown option: $1"
            exit 1
            ;;
        *)
            # Non-option argument
            break
            ;;
    esac
done
EOF
echo "Use: Simple scripts, when getopts is overkill"
echo

echo "=== RECOMMENDATION ==="
echo "• Use getopts for portable scripts with short options"
echo "• Use getopt if you need long options and can rely on it"
echo "• Use manual parsing only for trivial cases"