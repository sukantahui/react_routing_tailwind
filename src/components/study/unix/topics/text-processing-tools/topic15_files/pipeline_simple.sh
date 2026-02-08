#!/bin/bash
# Simple pipeline example: Filter → Transform → Count

echo "Basic Pipeline Example"
echo "======================"

# Simulate a log file
cat << 'EOF' | \
grep "ERROR" | \
sed 's/.*ERROR: //' | \
sort | \
uniq -c | \
sort -rn
2024-01-15 10:30:45 INFO: Application started
2024-01-15 10:31:22 ERROR: Database connection failed
2024-01-15 10:32:15 WARN: High memory usage
2024-01-15 10:33:01 ERROR: Database connection failed
2024-01-15 10:34:18 ERROR: File not found: /var/log/app.log
2024-01-15 10:35:42 INFO: Processing complete
2024-01-15 10:36:09 ERROR: File not found: /var/log/app.log
2024-01-15 10:37:33 ERROR: Permission denied: /tmp/data.csv
2024-01-15 10:38:56 ERROR: Database connection failed
EOF

echo -e "\nPipeline explanation:"
echo "1. grep 'ERROR'        - Filter lines containing ERROR"
echo "2. sed 's/.*ERROR: //' - Remove timestamp and 'ERROR: ' prefix"
echo "3. sort                - Sort error messages alphabetically"
echo "4. uniq -c             - Count occurrences of each unique error"
echo "5. sort -rn            - Sort by count (descending)"