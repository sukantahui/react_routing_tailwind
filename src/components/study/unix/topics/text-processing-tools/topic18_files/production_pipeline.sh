#!/bin/bash
# Production log analysis pipeline

echo "Production Log Analysis Pipeline"
echo "================================"

# Create realistic multi-source log data
cat > /tmp/production_access.log << 'EOF'
192.168.1.105 - tuhina [15/Jan/2024:10:30:45 +0530] "GET /dashboard HTTP/1.1" 200 5432 "-" "Mozilla/5.0" 0.045
203.0.113.42 - - [15/Jan/2024:10:31:22 +0530] "GET /api/users HTTP/1.1" 200 2345 "-" "python-requests/2.28" 1.234
192.168.1.105 - tuhina [15/Jan/2024:10:32:15 +0530] "POST /api/order HTTP/1.1" 201 3456 "-" "Mozilla/5.0" 0.567
198.51.100.23 - swadeep [15/Jan/2024:10:33:01 +0530] "GET /products HTTP/1.1" 200 4567 "-" "Mozilla/5.0" 0.089
192.168.1.220 - - [15/Jan/2024:10:34:18 +0530] "GET /admin HTTP/1.1" 403 234 "-" "curl/7.68" 0.023
203.0.113.42 - - [15/Jan/2024:10:35:42 +0530] "GET /api/products HTTP/1.1" 200 12345 "-" "python-requests/2.28" 0.456
192.168.1.105 - tuhina [15/Jan/2024:10:36:09 +0530] "GET /profile HTTP/1.1" 200 3456 "-" "Mozilla/5.0" 0.034
203.0.113.42 - - [15/Jan/2024:10:37:33 +0530] "POST /api/auth HTTP/1.1" 401 123 "-" "python-requests/2.28" 0.125
192.168.1.105 - tuhina [15/Jan/2024:10:38:56 +0530] "GET /logout HTTP/1.1" 302 234 "-" "Mozilla/5.0" 0.045
198.51.100.23 - swadeep [15/Jan/2024:10:39:12 +0530] "GET /cart HTTP/1.1" 200 3456 "-" "Mozilla/5.0" 0.067
192.168.1.220 - - [15/Jan/2024:10:40:45 +0530] "GET /wp-login.php HTTP/1.1" 404 456 "-" "curl/7.68" 0.032
192.168.1.105 - abhronila [15/Jan/2024:10:41:22 +0530] "GET /dashboard HTTP/1.1" 200 5432 "-" "Mozilla/5.0" 0.041
203.0.113.42 - - [15/Jan/2024:10:42:15 +0530] "GET /api/orders?limit=1000 HTTP/1.1" 200 23456 "-" "python-requests/2.28" 2.345
EOF

echo "PRODUCTION LOG ANALYSIS REPORT"
echo "=============================="
echo "Generated: $(date)"
echo "Log file: /tmp/production_access.log"
echo ""

# Complete analysis pipeline
{
    echo "1. EXECUTIVE SUMMARY"
    echo "-------------------"
    total_requests=$(wc -l < /tmp/production_access.log)
    successful_requests=$(awk '$9 == 200 || $9 == 201 {count++} END {print count}' /tmp/production_access.log)
    error_requests=$(awk '$9 ~ /^[45][0-9]{2}$/ {count++} END {print count}' /tmp/production_access.log)
    
    echo "Total requests: $total_requests"
    echo "Successful (2xx): $successful_requests"
    echo "Errors (4xx/5xx): $error_requests"
    echo "Success rate: $(( (successful_requests * 100) / total_requests ))%"
    echo "Error rate: $(( (error_requests * 100) / total_requests ))%"
    
    echo -e "\n2. TRAFFIC ANALYSIS"
    echo "-------------------"
    echo "Requests per hour:"
    awk '{print $4}' /tmp/production_access.log | cut -d: -f1,2 | sort | uniq -c
    
    echo -e "\nTop 5 IP addresses:"
    awk '{print $1}' /tmp/production_access.log | sort | uniq -c | sort -rn | head -5
    
    echo -e "\nAuthenticated vs Anonymous:"
    awk '{if ($3 != "-") auth++; else anon++} END {print "Authenticated:", auth; print "Anonymous:", anon}' /tmp/production_access.log
    
    echo -e "\n3. PERFORMANCE METRICS"
    echo "----------------------"
    echo "Response time statistics (seconds):"
    awk '{print $NF}' /tmp/production_access.log | sort -n | awk '
        NR == 1 {min = $1}
        {sum += $1; sumsq += $1*$1}
        NR == 1 || $1 < min {min = $1}
        NR == 1 || $1 > max {max = $1}
        END {
            print "  Min:", sprintf("%.3f", min);
            print "  Max:", sprintf("%.3f", max);
            print "  Avg:", sprintf("%.3f", sum/NR);
            print "  95th percentile:", sprintf("%.3f", int(NR*0.95) == NR*0.95 ? a[int(NR*0.95)] : a[int(NR*0.95)+1])
        }' a="$(awk '{print $NF}' /tmp/production_access.log | sort -n)"
    
    echo -e "\nSlow endpoints (> 1s):"
    awk '$NF > 1 {print $7, sprintf("%.3fs", $NF)}' /tmp/production_access.log | sort -k2 -nr
    
    echo -e "\n4. ERROR ANALYSIS"
    echo "-----------------"
    echo "HTTP status code distribution:"
    awk '{print $9}' /tmp/production_access.log | sort | uniq -c | sort -rn
    
    echo -e "\nError details (4xx/5xx):"
    awk '$9 ~ /^[45][0-9]{2}$/ {print $1, $7, $9, $NF "s"}' /tmp/production_access.log
    
    echo -e "\n5. SECURITY MONITORING"
    echo "----------------------"
    echo "Suspicious activity detected:"
    grep -i -E "(admin|login\\.php|wp-|cgi-bin|\.\\./)" /tmp/production_access.log | \
        awk '{print "  [" $4 "] " $1 " -> " $7 " (" $9 ")"}'
    
    echo -e "\nFailed authentication attempts:"
    awk '$9 == 401 {print $1, $7}' /tmp/production_access.log | sort | uniq -c | sort -rn
    
    echo -e "\n6. API USAGE"
    echo "------------"
    echo "API requests vs Web requests:"
    awk '{if ($7 ~ /^\/api\//) api++; else web++} END {print "API:", api; print "Web:", web}' /tmp/production_access.log
    
    echo -e "\nTop API endpoints:"
    awk '$7 ~ /^\/api\// {print $7}' /tmp/production_access.log | sort | uniq -c | sort -rn
    
    echo -e "\n7. USER ACTIVITY"
    echo "---------------"
    echo "Active users (by username):"
    awk '$3 != "-" {print $3}' /tmp/production_access.log | sort | uniq -c | sort -rn
    
    echo -e "\nUser session analysis:"
    awk '$3 != "-" {user=$3; ip=$1; count[user]++; ips[user]=ip} 
         END {for (u in count) print u " (" ips[u] "): " count[u] " requests"}' /tmp/production_access.log | sort -k3 -nr
    
    echo -e "\n8. DATA TRANSFER"
    echo "---------------"
    total_bytes=$(awk '{sum += $(NF-1)} END {print sum}' /tmp/production_access.log)
    avg_bytes=$(awk '{sum += $(NF-1)} END {print sum/NR}' /tmp/production_access.log)
    echo "Total bytes transferred: $total_bytes"
    echo "Average response size: $(printf "%.0f" $avg_bytes) bytes"
    
    echo -e "\nLargest responses:"
    awk '{print $7, $(NF-1) " bytes"}' /tmp/production_access.log | sort -k2 -nr | head -5
    
    echo -e "\n--- END OF REPORT ---"
    
} | tee /tmp/log_analysis_report.txt

echo -e "\nReport saved to: /tmp/log_analysis_report.txt"
echo "Top 10 lines of report:"
head -10 /tmp/log_analysis_report.txt

# Create monitoring script
cat > /tmp/monitor_logs.sh << 'EOF'
#!/bin/bash
# Real-time log monitoring script

LOG_FILE="/tmp/production_access.log"
ALERT_FILE="/tmp/security_alerts.txt"
ERROR_THRESHOLD=5  # Alert if more than 5 errors in 1 minute
SLOW_THRESHOLD=2   # Alert if response time > 2 seconds

echo "Starting real-time log monitoring..."
echo "Monitoring: $LOG_FILE"
echo "Alert file: $ALERT_FILE"
echo ""

tail -f "$LOG_FILE" | while read line; do
    timestamp=$(echo "$line" | awk '{print $4}' | tr -d '[]')
    ip=$(echo "$line" | awk '{print $1}')
    status=$(echo "$line" | awk '{print $9}')
    response_time=$(echo "$line" | awk '{print $NF}')
    endpoint=$(echo "$line" | awk '{print $7}')
    
    # Check for errors
    if [[ "$status" =~ ^[45][0-9]{2}$ ]]; then
        echo "[$(date)] ERROR: $ip -> $endpoint ($status)" | tee -a "$ALERT_FILE"
    fi
    
    # Check for slow responses
    if (( $(echo "$response_time > $SLOW_THRESHOLD" | bc -l) )); then
        echo "[$(date)] SLOW: $endpoint took ${response_time}s" | tee -a "$ALERT_FILE"
    fi
    
    # Check for suspicious patterns
    if [[ "$endpoint" =~ (admin|login\\.php|wp-|\\.\\./) ]]; then
        echo "[$(date)] SUSPICIOUS: $ip accessed $endpoint" | tee -a "$ALERT_FILE"
    fi
done
EOF

chmod +x /tmp/monitor_logs.sh

echo -e "\nReal-time monitoring script created: /tmp/monitor_logs.sh"
echo "To use: ./tmp/monitor_logs.sh"

# Cleanup
rm -f /tmp/production_access.log