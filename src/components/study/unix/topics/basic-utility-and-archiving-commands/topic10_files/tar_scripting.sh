#!/bin/bash
# tar_scripting.sh - Backup automation with tar

echo "=== Scripting with tar ==="

# Function to create timestamped backup
backup_with_date() {
    local source_dir=$1
    local target_dir=${2:-.}
    local timestamp=$(date +%Y%m%d_%H%M%S)
    local backup_name="${target_dir}/backup_${timestamp}.tar.gz"
    
    if [ -d "$source_dir" ]; then
        tar -czf "$backup_name" -C "$source_dir" . 2>/dev/null
        echo "Backup created: $backup_name"
    else
        echo "Error: source directory $source_dir not found"
        return 1
    fi
}

# Function to backup specific file types
backup_by_type() {
    local dir=$1
    local ext=$2
    local output=$3
    find "$dir" -name "*.$ext" -type f | tar -czf "$output" -T -
    echo "Backed up .$ext files to $output"
}

# Setup test environment
echo "Setting up test data..."
mkdir -p project/{src,docs,tmp}
echo "print('hello')" > project/src/main.py
echo "README" > project/docs/readme.txt
echo "temp data" > project/tmp/temp.log
touch project/tmp/ignore_me

echo -e "\n1. Timestamped full backup:"
backup_with_date project ./backups

echo -e "\n2. Selective backup by file type (.py):"
backup_by_type project py py_backup.tar.gz
tar -tzf py_backup.tar.gz

echo -e "\n3. Remote backup via SSH (simulate):"
echo "tar -czf - project | ssh user@host 'cat > remote_backup.tar.gz'"
echo "(Command would stream archive over SSH)"

echo -e "\n4. Backup with exclusion:"
tar -czf filtered.tar.gz --exclude="*.log" --exclude="tmp/*" project
tar -tzf filtered.tar.gz

echo -e "\n5. Measure backup speed (using pv):"
if command -v pv &>/dev/null; then
    tar -cf - project | pv -s $(du -sb project | awk '{print $1}') | gzip > measured.tar.gz
    echo "Backup completed with progress"
else
    echo "Install pv for progress monitoring"
fi

echo -e "\n6. Split archive into parts for email:"
dd if=/dev/zero of=large.dat bs=1M count=5 2>/dev/null
tar -czf - large.dat | split -b 1m - large_backup_part.
ls -lh large_backup_part.*

# Cleanup
rm -rf project backups py_backup.tar.gz filtered.tar.gz measured.tar.gz large.dat large_backup_part.*