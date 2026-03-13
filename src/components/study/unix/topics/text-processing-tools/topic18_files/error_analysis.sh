#!/bin/bash
# Error analysis techniques

echo "Advanced Error Analysis"
echo "======================="

# Create comprehensive error log
cat > /tmp/app_errors.log << 'EOF'
2024-01-15 10:30:45 ERROR [Database] Connection failed: timeout after 30s
2024-01-15 10:31:22 WARN  [Cache] Memory usage at 85%
2024-01-15 10:32:15 ERROR [API] Invalid response from payment gateway
2024-01-15 10:33:01 INFO  [System] Backup completed successfully
2024-01-15 10:34:18 ERROR [Database] Deadlock detected on table 'orders'
2024-01-15 10:35:42 WARN  [Network] High latency detected: 450ms
2024-01-15 10:36:09 ERROR [API] Authentication failed for user: admin
2024-01-15 10:37:33 ERROR [Database] Connection failed: timeout after 30s
2024-01-15 10:38:56 INFO  [System] Scheduled maintenance started
2024-01-15 10:39:12 ERROR [API] Rate limit exceeded for IP: 203.0.113.5
2024-01-15 10:40:45 ERROR [Database] Connection failed: timeout after 30s
2024-01-15 10:41:22 WARN  [Disk] Storage at 92% capacity
2024-01-15 10:42:15 ERROR [API] Invalid response from payment gateway
EOF

echo "1. Error frequency by type:"
echo "---------------------------"
grep -i "error" /tmp/app_errors.log | awk '{print $4}' | sort | uniq -c | sort -rn

echo -e "\n2. Error timeline (last 10 errors):"
echo "-------------------------------------"
grep -i "error" /tmp/app_errors.log | tail -10

echo -e "\n3. Most common error messages:"
echo "--------------------------------"
grep -i "error" /tmp/app_errors.log | cut -d']' -f2- | sort | uniq -c | sort -rn

echo -e "\n4. Errors by hour:"
echo "-------------------"
grep -i "error" /tmp/app_errors.log | awk '{print $2}' | cut -d: -f1 | sort | uniq -c

echo -e "\n5. Find recurring errors (same error > 2 times):"
echo "--------------------------------------------------"
grep -i "error" /tmp/app_errors.log | cut -d']' -f2- | sort | uniq -c | awk '$1 > 2'

echo -e "\n6. Extract error details with context:"
echo "----------------------------------------"
grep -B1 -A1 "timeout" /tmp/app_errors.log

echo -e "\n7. Calculate error rate over time:"
echo "------------------------------------"
total_lines=$(wc -l < /tmp/app_errors.log)
error_count=$(grep -c -i "error" /tmp/app_errors.log)
warn_count=$(grep -c -i "warn" /tmp/app_errors.log)
echo "Total log entries: $total_lines"
echo "Errors: $error_count"
echo "Warnings: $warn_count"
echo "Error rate: $(( (error_count * 100) / total_lines ))%"

# Create authentication error log
cat > /tmp/auth_errors.log << 'EOF'
2024-01-15 10:30:45 Failed login for user: admin from IP: 192.168.1.1
2024-01-15 10:31:22 Failed login for user: admin from IP: 192.168.1.1
2024-01-15 10:32:15 Failed login for user: admin from IP: 192.168.1.1
2024-01-15 10:33:01 Failed login for user: admin from IP: 203.0.113.5
2024-01-15 10:34:18 Successful login for user: tuhina from IP: 192.168.1.105
2024-01-15 10:35:42 Failed login for user: root from IP: 192.168.1.1
2024-01-15 10:36:09 Account locked: admin from IP: 192.168.1.1
2024-01-15 10:37:33 Failed login for user: admin from IP: 203.0.113.5
EOF

echo -e "\n8. Security analysis - Failed login attempts:"
echo "----------------------------------------------"
echo "Top IPs with failed logins:"
grep "Failed login" /tmp/auth_errors.log | awk '{print $NF}' | sort | uniq -c | sort -rn
echo -e "\nTop usernames with failed logins:"
grep "Failed login" /tmp/auth_errors.log | awk -F"user: " '{print $2}' | awk '{print $1}' | sort | uniq -c | sort -rn

# Cleanup
rm -f /tmp/app_errors.log /tmp/auth_errors.log