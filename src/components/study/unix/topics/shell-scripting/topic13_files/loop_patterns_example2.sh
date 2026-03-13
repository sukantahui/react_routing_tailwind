#!/bin/bash
# Loop with continue and break for error handling
LOG_DIR="/var/log/applications"

echo "Analyzing application logs..."

for log_file in "$LOG_DIR"/*.log; do
    # Skip if not a regular file
    [ -f "$log_file" ] || continue
    
    # Skip empty files
    [ -s "$log_file" ] || {
        echo "Skipping empty file: $log_file"
        continue
    }
    
    # Check for critical errors
    if grep -q "CRITICAL" "$log_file"; then
        echo "CRITICAL ERROR found in $log_file"
        echo "Stopping analysis due to critical error!"
        break
    fi
    
    # Count warnings and errors
    warnings=$(grep -c "WARNING" "$log_file")
    errors=$(grep -c "ERROR" "$log_file")
    
    echo "File: $(basename "$log_file")"
    echo "  Warnings: $warnings, Errors: $errors"
done

echo "Log analysis complete (stopped early if critical error found)."