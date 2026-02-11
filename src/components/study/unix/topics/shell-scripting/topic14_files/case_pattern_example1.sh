#!/bin/bash
# Pattern matching examples for file processing
read -p "Enter filename or pattern: " filename

case "$filename" in
    *.txt)
        echo "Text file detected. Opening with text editor..."
        # Process text file
        ;;
    *.jpg|*.jpeg|*.png|*.gif)
        echo "Image file detected. Opening with image viewer..."
        # Process image file
        ;;
    *.pdf)
        echo "PDF document detected. Opening with PDF reader..."
        # Process PDF
        ;;
    *.tar.gz|*.tgz)
        echo "Compressed archive detected. Extracting..."
        # Extract archive
        ;;
    [0-9]*)
        echo "Filename starts with a digit. Special processing..."
        # Handle numeric prefixed files
        ;;
    .*)
        echo "Hidden file detected. Special handling required..."
        # Handle hidden files
        ;;
    *)
        echo "Unknown file type. Using default processor..."
        # Default processing
        ;;
esac