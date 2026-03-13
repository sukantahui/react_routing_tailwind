#!/bin/bash
# Process all PNG images in directory (Barrackpore project)
IMAGE_DIR="/home/students/barrackpore_project/images"

echo "Starting image conversion for Barrackpore project..."
count=0

for image in "$IMAGE_DIR"/*.png; do
    if [ -f "$image" ]; then
        # Extract filename without extension
        filename=$(basename "$image" .png)
        
        # Convert PNG to JPEG
        convert "$image" "$IMAGE_DIR/$filename.jpg"
        
        echo "Converted: $filename.png → $filename.jpg"
        count=$((count + 1))
    fi
done

echo "Conversion complete! Processed $count images."