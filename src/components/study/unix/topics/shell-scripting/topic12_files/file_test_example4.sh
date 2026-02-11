#!/bin/bash
# Complex validation: file exists AND is readable AND is not empty
DATA_FILE="/home/user/data.csv"

if [ -f "$DATA_FILE" ] && [ -r "$DATA_FILE" ] && [ -s "$DATA_FILE" ]; then
    echo "Data file is valid and ready for processing"
    process_data "$DATA_FILE"
else
    echo "Error: Data file validation failed"
    
    if [ ! -f "$DATA_FILE" ]; then
        echo "  - File does not exist"
    elif [ ! -r "$DATA_FILE" ]; then
        echo "  - File is not readable"
    elif [ ! -s "$DATA_FILE" ]; then
        echo "  - File is empty"
    fi
    
    exit 1
fi