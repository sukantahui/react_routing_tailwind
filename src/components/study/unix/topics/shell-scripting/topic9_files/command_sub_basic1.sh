# topic9_files/command_sub_basic1.sh
#!/bin/bash
# Basic command substitution - variable assignment

# Get current date in YYYY-MM-DD format
current_date=$(date +%Y-%m-%d)
echo "Today is: $current_date"

# Get system hostname
system_name=$(hostname)
echo "You are logged into: $system_name"

# Count number of files in current directory
file_count=$(ls -1 | wc -l)
echo "This directory has $file_count files"