#!/bin/bash
# Wait for file to be created with timeout
TARGET_FILE="/tmp/export_complete.flag"
TIMEOUT=300  # 5 minutes
START_TIME=$(date +%s)

echo "Waiting for export completion signal..."
echo "Timeout: $TIMEOUT seconds"

until [ -f "$TARGET_FILE" ]; do
    CURRENT_TIME=$(date +%s)
    ELAPSED=$((CURRENT_TIME - START_TIME))
    
    if (( ELAPSED > TIMEOUT )); then
        echo "Error: Timeout waiting for export completion"
        exit 1
    fi
    
    # Show progress every 30 seconds
    if (( ELAPSED % 30 == 0 )); then
        echo "Still waiting... ($ELAPSED seconds elapsed)"
    fi
    
    sleep 1
done

echo "Export complete! Processing results..."
# Process the exported data