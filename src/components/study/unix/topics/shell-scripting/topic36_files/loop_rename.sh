#!/bin/bash
# loop_rename.sh – Batch rename files using sed pattern (with dry‑run)
# Usage: ./loop_rename.sh 's/old/new/' [--dry-run]

set -euo pipefail
IFS=$'\n\t'

PATTERN="${1:-}"
DRY_RUN=0

if [[ -z "$PATTERN" ]]; then
    echo "Usage: $0 's/old/new/' [--dry-run]" >&2
    exit 1
fi

[[ "${2:-}" == "--dry-run" ]] && DRY_RUN=1

for file in *; do
    [[ -f "$file" ]] || continue
    
    newname=$(echo "$file" | sed "$PATTERN")
    
    # Skip if name unchanged
    [[ "$file" == "$newname" ]] && continue
    
    # Avoid overwriting existing files
    if [[ -e "$newname" ]]; then
        echo "⚠️  Skipping: $newname already exists" >&2
        continue
    fi
    
    if [[ $DRY_RUN -eq 1 ]]; then
        echo "[DRY RUN] mv '$file' -> '$newname'"
    else
        mv "$file" "$newname"
        echo "Renamed: '$file' -> '$newname'"
    fi
done