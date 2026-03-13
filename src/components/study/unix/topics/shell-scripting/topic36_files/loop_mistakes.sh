#!/bin/bash
# loop_mistakes.sh – Classic errors – DO NOT USE
# This script demonstrates what NOT to do

# 1. Parsing ls – breaks on spaces, newlines, special chars
for file in $(ls *.txt); do
    echo "Processing: $file"  # Spaces split into separate files!
done

# 2. Unquoted variable – word splitting and glob expansion
for file in *.txt; do
    wc -l $file   # Fails if filename contains spaces or * 
done

# 3. Using find output directly in for loop
for file in $(find . -name "*.sh"); do
    chmod +x $file   # Filenames with spaces cause errors
done

# 4. No guard for empty glob – when no .pdf files exist
for pdf in *.pdf; do
    rm "$pdf"   # Deletes file literally named '*.pdf' if no match!
done

# 5. Filename starts with dash – interpreted as option
for file in *; do
    rm $file   # If file is "-rf", this becomes `rm -rf`
done