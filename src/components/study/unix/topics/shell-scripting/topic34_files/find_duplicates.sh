#!/bin/bash
# find_duplicates.sh – Recursively find duplicate files by MD5 checksum
# Usage: ./find_duplicates.sh [directory]
# Example: ./find_duplicates.sh ~/Photos

set -euo pipefail
IFS=$'\n\t'

SEARCH_DIR="${1:-.}"

if [[ ! -d "$SEARCH_DIR" ]]; then
    echo "Error: '$SEARCH_DIR' is not a directory." >&2
    exit 1
fi

declare -A hash_map

find "$SEARCH_DIR" -type f -print0 | while IFS= read -r -d '' file; do
    # Compute MD5 hash
    hash=$(md5sum "$file" | awk '{print $1}')
    
    if [[ -n "${hash_map[$hash]:-}" ]]; then
        echo "Duplicate:"
        echo "  ${hash_map[$hash]}"
        echo "  $file"
        echo "---"
    else
        hash_map["$hash"]="$file"
    fi
done

exit 0