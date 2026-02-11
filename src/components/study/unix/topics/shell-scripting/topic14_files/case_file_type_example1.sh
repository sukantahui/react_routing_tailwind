#!/bin/bash
# File type handler for Shyamnagar data center
process_file() {
    local file="$1"
    
    case "$file" in
        *.csv)
            echo "Processing CSV file: $file"
            # Validate CSV format
            if head -1 "$file" | grep -q ","; then
                record_count=$(wc -l < "$file")
                echo "  Records: $((record_count - 1))"  # Subtract header
            else
                echo "  Warning: May not be valid CSV"
            fi
            ;;
        *.json)
            echo "Processing JSON file: $file"
            # Validate JSON
            if python3 -m json.tool "$file" > /dev/null 2>&1; then
                echo "  Valid JSON format"
            else
                echo "  Error: Invalid JSON"
            fi
            ;;
        *.log)
            echo "Processing log file: $file"
            # Count error lines
            error_count=$(grep -c -i "error\|fail\|critical" "$file")
            warning_count=$(grep -c -i "warning" "$file")
            echo "  Errors: $error_count, Warnings: $warning_count"
            ;;
        *.sql)
            echo "Processing SQL file: $file"
            # Check for dangerous operations
            if grep -q -i "drop table\|delete from" "$file"; then
                echo "  WARNING: Contains dangerous operations!"
            fi
            ;;
        *.sh)
            echo "Processing shell script: $file"
            # Check syntax
            if bash -n "$file"; then
                echo "  Syntax: OK"
            else
                echo "  Syntax: ERROR"
            fi
            ;;
        *.gz|*.bz2|*.xz)
            echo "Processing compressed file: $file"
            # Check if we can decompress
            if [[ "$file" == *.gz ]]; then
                if gzip -t "$file"; then
                    echo "  Compression: Valid gzip"
                else
                    echo "  Compression: Corrupted"
                fi
            fi
            ;;
        *)
            echo "Unknown file type: $file"
            echo "  Skipping processing..."
            ;;
    esac
}

# Main execution
for file in "$@"; do
    if [ -f "$file" ]; then
        process_file "$file"
        echo "---"
    else
        echo "File not found: $file"
    fi
done