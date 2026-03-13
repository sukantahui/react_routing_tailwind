#!/bin/sh
# csv_parser.sh – Simple CSV reader (POSIX sh)
# Usage: ./csv_parser.sh file.csv
# Reads CSV and prints each field in brackets

if [ $# -ne 1 ]; then
    echo "Usage: $0 file.csv" >&2
    exit 1
fi

FILE="$1"
[ -f "$FILE" ] || { echo "File not found: $FILE" >&2; exit 1; }

while IFS= read -r line; do
    # Skip empty lines
    [ -z "$line" ] && continue
    
    # Set IFS to comma temporarily
    OLDIFS="$IFS"
    IFS=','
    # Read fields into positional parameters
    set -- $line
    IFS="$OLDIFS"
    
    echo "--- Line ---"
    i=1
    for field; do
        echo "Field $i: [$field]"
        i=$((i + 1))
    done
done < "$FILE"

exit 0