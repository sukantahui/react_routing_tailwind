#!/bin/bash
# Log analysis pipeline for Shyamnagar servers

echo "=== Shyamnagar Server Log Analysis ==="
LOG_FILE="/var/log/shyamnagar/server.log"

# Create sample log data if file doesn't exist
if [ ! -f "$LOG_FILE" ]; then
    echo "Creating sample log data..."
    cat > "$LOG_FILE" << 'EOF'
2024-01-15 08:30:45 INFO Application started successfully
2024-01-15 08:31:10 WARN High memory usage detected: 85%
2024-01-15 08:32:05 ERROR Database connection failed
2024-01-15 08:33:22 INFO User login: swadeep
2024-01-15 08:34:18 ERROR File not found: /data/config.json
2024-01-15 08:35:42 INFO Backup completed
2024-01-15 08:36:15 WARN Slow query detected: 4.2s
2024-01-15 08:37:30 ERROR Permission denied: /var/log/app.log
2024-01-15 08:38:55 INFO Cache cleared
2024-01-15 08:39:10 WARN Disk space low: 15% free
EOF
fi

echo "Analyzing log file: $LOG_FILE"
echo "================================="

# 1. Count log entries by level
echo -e "\n1. Log level distribution:"
grep -E "(INFO|WARN|ERROR)" "$LOG_FILE" | \
    awk '{print $3}' | \
    sort | \
    uniq -c | \
    sort -rn | \
    awk '{printf "%-6s: %3d entries\n", $2, $1}'

# 2. Extract error messages only
echo -e "\n2. Error messages:"
grep "ERROR" "$LOG_FILE" | \
    sed 's/.*ERROR //' | \
    sort

# 3. Extract timestamps of warnings
echo -e "\n3. Warning timestamps:"
grep "WARN" "$LOG_FILE" | \
    awk '{print $1, $2}' | \
    while read timestamp; do
        echo "Warning at: $timestamp"
    done

# 4. Count events per minute
echo -e "\n4. Events per minute:"
awk '{print $1, $2}' "$LOG_FILE" | \
    awk -F: '{print $1":"$2}' | \
    sort | \
    uniq -c | \
    sort -n | \
    awk '{printf "%s:00 - %d events\n", $2, $1}'

# 5. Extract usernames from log entries
echo -e "\n5. User activities detected:"
grep -o "login: [a-zA-Z]*" "$LOG_FILE" | \
    awk '{print $2}' | \
    sort | \
    uniq -c | \
    while read count user; do
        echo "User $user: $count login(s)"
    done

# 6. Find resource-related warnings
echo -e "\n6. Resource warnings:"
grep -i "memory\|disk\|cpu" "$LOG_FILE" | \
    sed 's/.*WARN //' | \
    sort

# 7. Calculate error rate
echo -e "\n7. Error statistics:"
total_lines=$(wc -l < "$LOG_FILE")
error_lines=$(grep -c "ERROR" "$LOG_FILE")
if [ $total_lines -gt 0 ]; then
    error_rate=$((error_lines * 100 / total_lines))
    echo "Total entries: $total_lines"
    echo "Errors: $error_lines"
    echo "Error rate: ${error_rate}%"
else
    echo "No log entries found"
fi

# 8. Create summary report
echo -e "\n8. Summary report:"
{
    echo "=== Shyamnagar Log Analysis Report ==="
    echo "Generated: $(date)"
    echo "Log file: $LOG_FILE"
    echo "Analysis period: $(head -1 "$LOG_FILE" | awk '{print $1}')"
    echo "----------------------------------------"
    grep -c "INFO" "$LOG_FILE" | awk '{print "INFO events: "$1}'
    grep -c "WARN" "$LOG_FILE" | awk '{print "WARN events: "$1}'
    grep -c "ERROR" "$LOG_FILE" | awk '{print "ERROR events: "$1}'
    echo "----------------------------------------"
    echo "Most recent error:"
    grep "ERROR" "$LOG_FILE" | tail -1 | sed 's/.*ERROR //'
} | tee /tmp/log_analysis_report.txt

echo -e "\nReport saved to: /tmp/log_analysis_report.txt"