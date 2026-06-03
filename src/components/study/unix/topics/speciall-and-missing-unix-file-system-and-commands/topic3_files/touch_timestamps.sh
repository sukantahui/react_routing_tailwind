#!/bin/bash
# touch_timestamps.sh - Setting specific timestamps

mkdir -p /tmp/touch_time_demo
cd /tmp/touch_time_demo

echo "=== Create a file with current time ==="
touch now.txt
stat now.txt | grep -E "Modify|Access"

echo -e "\n=== Set specific timestamp using -t (YYYYMMDDhhmm.ss) ==="
touch -t 202401011200.00 backdated.txt
stat backdated.txt | grep -E "Modify|Access"

echo -e "\n=== Set timestamp using -d with human-readable date ==="
touch -d "2024-06-15 14:30:00" human.txt
stat human.txt | grep Modify

echo -e "\n=== Relative dates with -d ==="
touch -d "2 days ago" two_days_ago.txt
touch -d "next Monday" next_mon.txt
touch -d "last Friday" last_fri.txt
ls -l --full-time two_days_ago.txt next_mon.txt last_fri.txt 2>/dev/null || ls -l

echo -e "\n=== Copy timestamps from reference file (-r) ==="
touch -r backdated.txt copy_of_backdated.txt
stat copy_of_backdated.txt | grep Modify

cd /tmp
rm -rf /tmp/touch_time_demo