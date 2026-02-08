#!/bin/bash
# Topic 24: Advanced Analysis - Security Insights
# Detect suspicious activities and patterns

echo "=== Security Analysis ==="
echo ""

# 1. Multiple failed login attempts
echo "1. SUSPICIOUS LOGIN PATTERNS:"
echo "   Attempts | IP Address"
echo "   ----------------------"
grep -i "login\|auth\|signin" access.log | grep " 40[0-9] \| 50[0-9] " | \
  awk '{print $1}' | sort | uniq -c | sort -rn | head -10 | \
  awk '{printf "   %-8s| %s\n", $1, $2}'
echo ""

# 2. Directory traversal attempts
echo "2. DIRECTORY TRAVERSAL ATTEMPTS:"
grep -i "\.\./" access.log | awk '{
    count[$1]++
    urls[$1] = $7
}
END {
    for (ip in count) {
        printf "   IP: %-15s | Attempts: %-3s | Sample: %s\n", ip, count[ip], urls[ip]
    }
}' | head -10
echo ""

# 3. SQL injection patterns
echo "3. SQL INJECTION PATTERNS DETECTED:"
grep -i "union\|select\|insert\|delete\|update\|drop\|--\|'" access.log | \
  awk '{print $1, $7}' | head -5
echo ""

# 4. High request rate IPs
echo "4. HIGH REQUEST RATE IPs (Potential DoS):"
awk '{print $1}' access.log | sort | uniq -c | sort -rn | head -5 | \
  awk 'BEGIN {print "   Req/Min | IP Address"; print "   --------------------"} 
  {rate=$1/1440; printf "   %-8.1f| %s\n", rate, $2}'
echo ""

# 5. Unusual user agents
echo "5. UNUSUAL/SUSPICIOUS USER AGENTS:"
awk -F'"' '{print $6}' access.log | grep -v "Mozilla\|Chrome\|Safari\|Edge\|Opera" | \
  sort | uniq -c | sort -rn | head -5 | \
  awk '{printf "   %-6s %s\n", $1, substr($2,1,50)}'