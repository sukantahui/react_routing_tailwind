#!/bin/bash
# corrected_demo.sh – Professional rewrite of mistakes_demo.sh
set -euo pipefail
IFS=$'\n\t'

# 1. Quoted variable – space handled correctly
dir="/tmp/my folder"
mkdir -p "$dir" || { echo "Failed to create $dir" >&2; exit 1; }

# 2. Correct numeric comparison
count=5
if [[ $count -gt 3 ]]; then
    echo "count > 3"
fi

# 3. Use glob directly – no parsing ls
for file in *.txt; do
    # Check if file exists (when no match, glob returns literal '*.txt')
    [[ -f "$file" ]] || continue
    echo "Processing $file"
done

# 4. Command substitution with $() and error check
if output=$(grep root /etc/passwd); then
    echo "Found: $output"
else
    echo "root not found" >&2
fi

# 5. Ensure directory exists before operating
cd /nonexistent 2>/dev/null || { echo "Directory missing" >&2; exit 1; }
rm -rf *

echo "Done"