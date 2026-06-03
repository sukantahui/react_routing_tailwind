#!/bin/bash
# cal_options.sh - Explore important options of cal
# Options covered: -3, -y, -j, -m

echo "=== cal command options demo ==="
echo

echo "1. Previous, current, next month (-3)"
cal -3

echo -e "\n2. Full year (-y)"
cal -y

echo -e "\n3. Julian dates (day-of-year) (-j)"
cal -j

echo -e "\n4. Monday as first day of week (-m)"
cal -m

echo -e "\n5. Combine options: show previous/next month in Julian format"
cal -j -3

echo -e "\n💡 Pro tip: Use 'cal -3' in your .bashrc for a weekly context."