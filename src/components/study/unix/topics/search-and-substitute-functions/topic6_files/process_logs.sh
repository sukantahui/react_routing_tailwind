#!/bin/bash
# process_logs.sh - Realistic log processing
cat > application.log <<EOF
2025-01-15 10:00:01 INFO  Starting service
2025-01-15 10:00:05 ERROR Failed to connect to DB
2025-01-15 10:01:00 ERROR Timeout while querying
2025-01-15 10:02:30 WARN  Retry attempt 1
2025-01-15 10:03:00 ERROR Connection refused
2025-01-15 10:05:00 INFO  Service stopped
EOF

echo "=== Extract ERROR lines, replace 'ERROR' with 'CRITICAL', add alert prefix ==="
grep "ERROR" application.log | \
    sed 's/ERROR/CRITICAL/g' | \
    sed 's/^/ALERT: /'

echo -e "\n=== Save result to new file ==="
grep "ERROR" application.log | sed 's/ERROR/CRITICAL/g' > critical_events.log
echo "Written to critical_events.log"
cat critical_events.log