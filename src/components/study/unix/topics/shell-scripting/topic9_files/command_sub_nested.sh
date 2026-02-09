# topic9_files/command_sub_nested.sh
#!/bin/bash
# Nested command substitution examples

# Simple nesting: count lines in output of another command
line_count=$(wc -l <<< "$(ls -la)")
echo "Detailed listing has $line_count lines"

# Complex nesting: process within process
echo "Current processes by user $(whoami):"
process_list=$(ps aux | grep "$(whoami)" | wc -l)
echo "You have $process_list processes running"

# Multiple levels of nesting (use sparingly!)
echo "Disk usage analysis:"
echo "Largest 5 directories:"
du -sh * 2>/dev/null | sort -hr | head -5 | while read size name; do
    echo "  $name: $size ($(find "$name" -type f 2>/dev/null | wc -l) files)"
done

# Nested substitution in arithmetic
folder_size_kb=$(du -sk "$(pwd)" | cut -f1)
folder_size_mb=$((folder_size_kb / 1024))
echo "Current folder size: ${folder_size_mb}MB"