#!/bin/bash
# Log File Analysis and Validation
# Validating log file formats and detecting anomalies

echo "=== Log File Validation ==="
echo ""

# Create sample log file with various entries
cat > /tmp/server.log << 'EOF'
[2024-01-15 10:30:45] INFO: User login successful from 192.168.1.100
[2024-01-15 10:31:22] ERROR: Database connection failed
[2024-01-15 10:31:25] WARNING: High memory usage detected (85%)
[2024-01-15 10:32:10] INFO: Backup completed successfully
[INVALID TIMESTAMP] DEBUG: Starting process
[2024-01-15 10:33:00] ERROR: File not found: /var/www/data.txt
[2024-01-15 10:33:15] INFO: Scheduled task started
[2024-01-15 10:34:00] CRITICAL: Disk full on /dev/sda1
[2024-01-15 10:35:00] WARNING: CPU usage above threshold
[2024-01-15 10:36:00] INFO: User logout from 192.168.1.100
EOF

echo "Sample Log File:"
cat /tmp/server.log
echo ""

echo "=== Validating Log Entries ==="
echo ""

echo "1. Checking Timestamp Format:"
echo "   Expected: [YYYY-MM-DD HH:MM:SS]"
grep -v '^\[[0-9]\{4\}-[0-9]\{2\}-[0-9]\{2\} [0-9]\{2\}:[0-9]\{2\}:[0-9]\{2\}\]' /tmp/server.log
echo ""

echo "2. Validating Log Levels:"
echo "   Valid levels: INFO, WARNING, ERROR, CRITICAL, DEBUG"
awk '
/^\[[0-9]{4}-[0-9]{2}-[0-9]{2} [0-9]{2}:[0-9]{2}:[0-9]{2}\]/ {
    match($0, /\] ([A-Z]+):/, level)
    if (level[1] !~ /^(INFO|WARNING|ERROR|CRITICAL|DEBUG)$/) {
        print "Invalid log level at line " NR ": " level[1]
    }
}
' /tmp/server.log
echo ""

echo "3. Detecting Error and Critical Logs:"
grep -E '\] (ERROR|CRITICAL):' /tmp/server.log
echo ""

echo "4. Finding IP Addresses in Logs:"
grep -oE '[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}' /tmp/server.log | sort -u
echo ""

echo "5. Validating Log Structure:"
echo "   Line\tStatus\t\tMessage"
awk '
BEGIN {
    print "Line\tStatus\t\tMessage"
    print "----\t------\t\t-------"
}
{
    if ($0 ~ /^\[[0-9]{4}-[0-9]{2}-[0-9]{2} [0-9]{2}:[0-9]{2}:[0-9]{2}\] [A-Z]+: .+$/) {
        status = "VALID"
    } else if ($0 ~ /^\[[0-9]{4}-[0-9]{2}-[0-9]{2} [0-9]{2}:[0-9]{2}:[0-9]{2}\]/) {
        status = "INVALID_FORMAT"
    } else {
        status = "MALFORMED"
    }
    printf "%d\t%s\t%s\n", NR, status, substr($0, 1, 40) "..."
}
' /tmp/server.log
echo ""

echo "6. Log Analysis Summary:"
echo "Total log entries: $(wc -l < /tmp/server.log)"
echo "Valid entries: $(grep -c '^\[[0-9]\{4\}-[0-9]\{2\}-[0-9]\{2\} [0-9]\{2\}:[0-9]\{2\}:[0-9]\{2\}\] [A-Z]\+: .\+$' /tmp/server.log)"
echo "Error entries: $(grep -c 'ERROR' /tmp/server.log)"
echo "Warning entries: $(grep -c 'WARNING' /tmp/server.log)"
echo "Critical entries: $(grep -c 'CRITICAL' /tmp/server.log)"
echo ""

echo "7. Time-based Analysis:"
echo "   First log: $(grep -o '^\[[^]]*\]' /tmp/server.log | head -1)"
echo "   Last log: $(grep -o '^\[[^]]*\]' /tmp/server.log | tail -1)"
echo "   Duration: Approximately $(expr $(grep -o '^\[[^]]*\]' /tmp/server.log | tail -1 | grep -o '[0-9]\{2\}:[0-9]\{2\}:[0-9]\{2\}' | tr -d ':') - $(grep -o '^\[[^]]*\]' /tmp/server.log | head -1 | grep -o '[0-9]\{2\}:[0-9]\{2\}:[0-9]\{2\}' | tr -d ':') | sed 's/^/0./') minutes"