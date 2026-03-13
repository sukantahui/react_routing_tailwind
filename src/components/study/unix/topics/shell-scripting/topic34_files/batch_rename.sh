#!/bin/bash
# batch_rename.sh – Rename files using sed pattern
# Usage: ./batch_rename.sh 's/old/new/' [--dry-run]
# Example: ./batch_rename.sh 's/ /_/g'   # replace spaces with underscores

set -euo pipefail

PATTERN="${1:-}"
DRY_RUN=0

if [[ -z "$PATTERN" ]]; then
    echo "Usage: $0 's/old/new/' [--dry-run]" >&2
    exit 1
fi

shift
[[ "${1:-}" == "--dry-run" ]] && DRY_RUN=1

for file in *; do
    # Skip if not a regular file (or you can remove this check)
    [[ -f "$file" ]] || continue
    
    newname=$(echo "$file" | sed "$PATTERN")
    
    if [[ "$file" != "$newname" ]]; then
        if [[ -e "$newname" ]]; then
            echo "⚠️  Skipping: $newname already exists" >&2
            continue
        fi
        
        if [[ $DRY_RUN -eq 1 ]]; then
            echo "[DRY RUN] mv '$file' '$newname'"
        else
            mv "$file" "$newname"
            echo "Renamed: '$file' -> '$newname'"
        fi
    fi
done

exit 0