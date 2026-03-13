#!/bin/bash
# System monitoring pipeline in Barrackpore

echo "=== Barrackpore System Monitoring ==="

# 1. Basic pipe: Count processes
echo "1. Counting running processes:"
ps aux | wc -l
echo "Total processes running"

# 2. Pipe with filter: Find specific processes
echo -e "\n2. Finding Java processes:"
ps aux | grep java | grep -v grep
echo "Java processes above"

# 3. Pipe with formatting: Disk usage
echo -e "\n3. Disk usage (sorted by usage %):"
df -h | sort -k5 -hr | head -5
echo "Top 5 disks by usage"

# 4. Pipe with multiple commands
echo -e "\n4. Memory usage summary:"
free -m | awk 'NR==2{printf "Used: %sMB (%.1f%%)\n", $3, $3/$2*100}'
echo "Memory utilization"

# 5. Real-time monitoring with pipe
echo -e "\n5. Top 5 CPU consuming processes:"
ps aux --sort=-%cpu | head -6 | tail -5 | awk '{printf "%-10s %-6s %s\n", $11, $3, $1}'
echo "Format: Command %CPU User"

# 6. Network connections count by state
echo -e "\n6. Network connections by state:"
netstat -an | grep tcp | awk '{print $6}' | sort | uniq -c | sort -rn
echo "TCP connection states"

# 7. User login monitoring
echo -e "\n7. Current logged in users:"
who | awk '{print $1}' | sort | uniq -c | sort -rn
echo "Users with login count"

# 8. System load average
echo -e "\n8. System load average:"
uptime | awk -F'load average:' '{print $2}' | awk '{printf "1m: %s, 5m: %s, 15m: %s\n", $1, $2, $3}'
echo "Load averages"