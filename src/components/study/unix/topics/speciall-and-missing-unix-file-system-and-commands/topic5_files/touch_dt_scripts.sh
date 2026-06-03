#!/bin/bash
# touch_dt_scripts.sh - Using touch -d/-t in scripts and loops

mkdir -p /tmp/touch_script_demo
cd /tmp/touch_script_demo

echo "=== Generate log files with specific dates based on a pattern ==="
for month in {1..12}; do
    # Format month with leading zero
    m=$(printf "%02d" $month)
    touch -t "2024${m}010000" "log_2024_${m}_first_day.log"
done
ls -l --full-time log_2024_*.log

echo -e "\n=== Set file timestamps to first day of each quarter using -d ==="
touch -d "2024-01-01 00:00" q1_start.txt
touch -d "2024-04-01 00:00" q2_start.txt
touch -d "2024-07-01 00:00" q3_start.txt
touch -d "2024-10-01 00:00" q4_start.txt
ls -l --full-time q*_start.txt

echo -e "\n=== Backup simulation: set timestamps to match a pattern ==="
# Create a file with current date
echo "backup data" > backup.tar.gz
# Simulate that this backup was created 5 days ago
touch -d "5 days ago" backup.tar.gz
ls -l --full-time backup.tar.gz

echo -e "\n=== Validate date string before use ==="
TEST_DATE="2025-12-31 23:59:59"
if date -d "$TEST_DATE" >/dev/null 2>&1; then
    touch -d "$TEST_DATE" validated.txt
    echo "Created validated.txt with date: $TEST_DATE"
else
    echo "Invalid date string: $TEST_DATE"
fi
ls -l --full-time validated.txt 2>/dev/null

cd /tmp
rm -rf /tmp/touch_script_demo