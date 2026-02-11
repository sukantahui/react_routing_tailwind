#!/bin/bash
# Processing pipeline with exit status tracking in Ichapur

echo "=== Ichapur Data Processing Pipeline ==="
DATA_FILE="/data/ichapur/sales.csv"
OUTPUT_FILE="/data/ichapur/processed/summary.txt"

# Enable pipefail to detect pipeline errors
set -o pipefail

echo "Processing data file: $DATA_FILE"

# Complex pipeline with multiple stages
cat "$DATA_FILE" \
    | grep -v "^#" \
    | awk -F, '{
        if(NF == 3) {
            product=$1
            quantity=$2
            price=$3
            total=quantity*price
            printf "%s,%.2f\n", product, total
        }
    }' \
    | sort -t, -k2 -nr \
    | head -10 > "$OUTPUT_FILE"

# Capture the pipeline exit status
pipeline_exit=$?

# Check individual pipe status if needed
if [ ${#PIPESTATUS[@]} -gt 0 ]; then
    echo -e "\nPipeline command statuses:"
    for i in "${!PIPESTATUS[@]}"; do
        echo "  Stage $((i+1)): ${PIPESTATUS[$i]}"
    done
fi

if [ $pipeline_exit -eq 0 ]; then
    echo "✓ Data processing completed successfully"
    echo "Top 10 products by revenue:"
    cat "$OUTPUT_FILE"
    exit 0
else
    echo "✗ Data processing failed with exit code: $pipeline_exit"
    
    # Try to identify which stage failed
    for i in "${!PIPESTATUS[@]}"; do
        if [ ${PIPESTATUS[$i]} -ne 0 ]; then
            case $i in
                0) echo "  Failed at: Reading input file" ;;
                1) echo "  Failed at: Filtering comments" ;;
                2) echo "  Failed at: Processing data (awk)" ;;
                3) echo "  Failed at: Sorting results" ;;
                4) echo "  Failed at: Limiting output" ;;
                *) echo "  Failed at: Unknown stage $i" ;;
            esac
        fi
    done
    
    exit $pipeline_exit
fi