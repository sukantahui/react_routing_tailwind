#!/bin/bash
# Topic 24: Error Pattern Detection
# Monitoring 4xx and 5xx Status Codes

echo "=== Error Pattern Analysis ==="
echo ""

# 1. Total error count
echo "1. ERROR SUMMARY:"
echo "   Type  | Count | Percentage"
echo "   ---------------------------"
total=$(wc -l < access.log)
errors_4xx=$(awk '$9 ~ /^4[0-9][0-9]$/ {count++} END {print count}' access.log)
errors_5xx=$(awk '$9 ~ /^5[0-9][0-9]$/ {count++} END {print count}' access.log)
all_errors=$((errors_4xx + errors_5xx))

printf "   4xx   | %-6s| %.1f%%\n" "$errors_4xx" $(echo "scale=1; $errors_4xx * 100 / $total" | bc)
printf "   5xx   | %-6s| %.1f%%\n" "$errors_5xx" $(echo "scale=1; $errors_5xx * 100 / $total" | bc)
printf "   Total | %-6s| %.1f%%\n" "$all_errors" $(echo "scale=1; $all_errors * 100 / $total" | bc)
echo ""

# 2. Most common error pages (404s)
echo "2. TOP 404 ERRORS (Page Not Found):"
echo "   Count | URL"
echo "   -----------------------------"
awk '$9 == 404 {print $7}' access.log | sort | uniq -c | sort -rn | head -10 | \
  awk '{printf "   %-6s| %s\n", $1, $2}'
echo ""

# 3. Error codes distribution
echo "3. ERROR CODES DISTRIBUTION:"
awk '$9 >= 400 && $9 < 600 {print $9}' access.log | sort | uniq -c | sort -rn | \
  awk '{printf "   %-3s: %-6s occurrences\n", $2, $1}'
echo ""

# 4. IPs causing most errors
echo "4. IPS WITH MOST ERRORS:"
echo "   Count | IP Address"
echo "   --------------------"
awk '$9 >= 400 && $9 < 600 {print $1}' access.log | sort | uniq -c | sort -rn | head -10 | \
  awk '{printf "   %-6s| %s\n", $1, $2}'
echo ""

# 5. Error trends by hour
echo "5. ERROR TREND BY HOUR:"
echo "   Hour  | 4xx | 5xx"
echo "   -----------------"
for hour in {00..23}; do
    count_4xx=$(awk -v hour=$hour -F: '$2 == hour && $9 ~ /^4[0-9][0-9]$/ {count++} END {print count+0}' access.log)
    count_5xx=$(awk -v hour=$hour -F: '$2 == hour && $9 ~ /^5[0-9][0-9]$/ {count++} END {print count+0}' access.log)
    if [ $count_4xx -gt 0 ] || [ $count_5xx -gt 0 ]; then
        printf "   %-5s | %-4s | %-4s\n" "${hour}:00" "$count_4xx" "$count_5xx"
    fi
done