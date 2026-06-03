#!/bin/bash
# touch_dt_formats.sh - Demonstrate various date formats for -d

mkdir -p /tmp/touch_format_demo
cd /tmp/touch_format_demo

echo "=== Relative dates ==="
touch -d "2 days ago" two_days_ago.txt
touch -d "+3 hours" three_hours_later.txt
touch -d "-10 minutes" ten_minutes_ago.txt
ls -l --full-time two_days_ago.txt three_hours_later.txt ten_minutes_ago.txt

echo -e "\n=== Weekday names ==="
touch -d "last Sunday" last_sun.txt
touch -d "next Friday 15:00" next_fri_3pm.txt
ls -l --full-time last_sun.txt next_fri_3pm.txt

echo -e "\n=== Timezone support ==="
touch -d "2024-12-31 12:00 UTC" utc_noon.txt
touch -d "2024-12-31 07:00 EST" est_7am.txt
ls -l --full-time utc_noon.txt est_7am.txt

echo -e "\n=== Date with time only (assumes today) ==="
touch -d "23:59:59" almost_midnight.txt
ls -l --full-time almost_midnight.txt

cd /tmp
rm -rf /tmp/touch_format_demo