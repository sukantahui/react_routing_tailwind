#!/bin/bash
# loop_glob.sh – Safe glob loop for non‑recursive file processing
# Usage: ./loop_glob.sh

set -euo pipefail
IFS=$'\n\t'

# Process all .txt files in current directory
for file in *.txt; do
    # Guard: if no .txt files, glob returns literal '*.txt'
    [[ -f "$file" ]] || continue
    
    echo "Processing: $file"
    # Your command here – always quote!
    wc -l "$file"
done