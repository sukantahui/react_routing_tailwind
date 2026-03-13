#!/bin/bash
# loop_find.sh – Recursive file processing using find + while read
# Usage: ./loop_find.sh [directory]

set -euo pipefail
IFS=$'\n\t'

SEARCH_DIR="${1:-.}"

# Use -print to output one filename per line
# IFS= and -r prevent word splitting and backslash interpretation
find "$SEARCH_DIR" -type f -name "*.log" -print | while IFS= read -r file; do
    echo "Processing: $file"
    # Your command here
    tail -n 5 "$file"
done