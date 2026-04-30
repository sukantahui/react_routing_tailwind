#!/bin/bash
# touch_dt_basics.sh - Basic usage of -d and -t

mkdir -p /tmp/touch_dt_demo
cd /tmp/touch_dt_demo

echo "=== Create a reference file with current time ==="
touch current.txt
stat current.txt | grep -E "Modify|Access"

echo -e "\n=== Using -d with human-readable date ==="
touch -d "2024-12-25 10:30:00" xmas_morning.txt
ls -l --full-time xmas_morning.txt

echo -e "\n=== Using -t with numeric format (YYYYMMDDhhmm.ss) ==="
touch -t 202501011200.00 newyear2025.txt
ls -l --full-time newyear2025.txt

echo -e "\n=== Set only modification time with -m ==="
touch -m -d "yesterday 23:59" yesterday_mtime.txt
ls -l --full-time yesterday_mtime.txt

echo -e "\n=== Set only access time with -a ==="
touch -a -t 202001010000.00 old_access.txt
stat old_access.txt | grep Access

cd /tmp
rm -rf /tmp/touch_dt_demo