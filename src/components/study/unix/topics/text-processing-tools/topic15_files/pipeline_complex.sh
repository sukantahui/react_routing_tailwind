#!/bin/bash
# Complex multi-stage production pipeline

echo "Production Log Processing Pipeline"
echo "=================================="

# Simulate processing of server logs to generate a security report
cat << 'EOF' | \
# Stage 1: Extract failed login attempts
grep -i "failed.*login\|authentication.*failed" | \
# Stage 2: Remove timestamps and redundant info
sed 's/^[0-9:-]* //; s/\[.*\] //' | \
# Stage 3: Extract IP addresses
grep -oE '[0-9]+\.[0-9]+\.[0-9]+\.[0-9]+' | \
# Stage 4: Count occurrences
sort | \
uniq -c | \
# Stage 5: Sort by count (descending)
sort -rn | \
# Stage 6: Format output
awk '{printf("IP: %-15s - Failed attempts: %3d\n", $2, $1)}' | \
# Stage 7: Add header and summary
(echo "SECURITY REPORT - Failed Login Attempts"; echo "====================================="; cat; echo -e "\n--- End of Report ---")
2024-01-15 10:30:45 [INFO] Login successful for user: swadeep from 192.168.1.100
2024-01-15 10:31:22 [ERROR] Failed login attempt from 203.0.113.5
2024-01-15 10:32:15 [ERROR] Authentication failed for user: admin from 192.168.1.50
2024-01-15 10:33:01 [INFO] Login successful for user: tuhina from 192.168.1.101
2024-01-15 10:34:18 [ERROR] Failed login attempt from 203.0.113.5
2024-01-15 10:35:42 [ERROR] Authentication failed for user: root from 198.51.100.23
2024-01-15 10:36:09 [ERROR] Failed login attempt from 203.0.113.5
2024-01-15 10:37:33 [ERROR] Authentication failed for user: admin from 192.168.1.50
2024-01-15 10:38:56 [ERROR] Failed login attempt from 203.0.113.5
2024-01-15 10:39:12 [INFO] Login successful for user: abhronila from 192.168.1.102
2024-01-15 10:40:45 [ERROR] Authentication failed for user: root from 198.51.100.23
2024-01-15 10:41:22 [ERROR] Failed login attempt from 203.0.113.5
EOF

echo -e "\nThis 7-stage pipeline:"
echo "1. Filters for failed login/authentication events"
echo "2. Cleans timestamps and brackets"
echo "3. Extracts IP addresses"
echo "4-5. Counts and sorts by frequency"
echo "6. Formats output nicely"
echo "7. Adds report header and footer"