#!/bin/bash
# zip_scripting.sh - Using zip in automation scripts

echo "=== Scripting with zip ==="

# Function: create timestamped backup
backup_with_date() {
    local dir=$1
    local backup_name="backup_$(date +%Y%m%d_%H%M%S).zip"
    if [ -d "$dir" ]; then
        zip -r "$backup_name" "$dir" -x "*.tmp" "*.log"
        echo "Created backup: $backup_name"
    else
        echo "Error: $dir not found"
    fi
}

# Function: zip files older than N days
archive_old_files() {
    local days=$1
    local archive="old_files_${days}days.zip"
    find . -type f -mtime +$days -print | zip -@ "$archive"
    echo "Archived files older than $days days into $archive"
}

# Create test environment
echo "Setting up test environment..."
mkdir -p webapp/{css,js,images}
echo "body { margin: 0; }" > webapp/css/style.css
echo "alert('Hello');" > webapp/js/app.js
echo "dummy image data" > webapp/images/logo.png
echo "temporary" > webapp/temp.log
touch -t 202503010000 webapp/oldfile.txt  # simulate old file

echo -e "\n1. Timestamped backup of webapp:"
backup_with_date webapp

echo -e "\n2. Archive files older than 1 day (simulated):"
archive_old_files 1

echo -e "\n3. Create archive of all images in directory:"
find webapp -name "*.png" | zip images.zip -@
unzip -l images.zip

echo -e "\n4. Zip with exclusion of certain patterns:"
zip -r webapp_clean.zip webapp -x "*.log" "*temp*"
unzip -l webapp_clean.zip

echo -e "\n5. Split zip archive into parts (for email limits):"
dd if=/dev/zero of=large.dat bs=1M count=5 2>/dev/null
zip -s 1m split_archive.zip large.dat
ls -lh split_archive.z*

echo -e "\n6. Encrypt backup for sensitive data:"
echo "secret" > webapp/password.txt
zip -e -P "secure123" secure_backup.zip webapp/password.txt
unzip -t secure_backup.zip

# Cleanup
rm -rf webapp backup_*.zip old_files_*.zip images.zip webapp_clean.zip split_archive.* secure_backup.zip large.dat