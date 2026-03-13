#!/bin/bash
# loop_robust.sh – Handle ANY filename (including newlines) with null delimiter
# Usage: ./loop_robust.sh [directory]

set -euo pipefail
IFS=$'\n\t'

SEARCH_DIR="${1:-.}"

# -print0 uses null character as separator
# read -d '' reads until null
find "$SEARCH_DIR" -type f -name "*.conf" -print0 | while IFS= read -r -d '' file; do
    echo "Processing: $file"
    # Your command here – still quote!
    head -1 "$file"
done