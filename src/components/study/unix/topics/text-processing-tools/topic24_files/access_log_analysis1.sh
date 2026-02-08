#!/bin/bash
# Topic 24: Basic Server Access Log Analysis - Part 1
# Traffic Volume Analysis

echo "=== Basic Traffic Analysis ==="
echo ""

# 1. Total number of requests
echo "1. TOTAL REQUESTS:"
wc -l access.log | awk '{print "   Total lines (requests):", $1}'
echo ""

# 2. Requests per hour (peak traffic analysis)
echo "2. REQUESTS PER HOUR (Peak Traffic):"
echo "   Time  |  Count"
echo "   --------------"
awk -F: '{print $2":00"}' access.log | sort | uniq -c | sort -rn | head -10 | \
  awk '{printf "   %-7s|  %-6s\n", $2, $1}'
echo ""

# 3. Unique IP addresses (visitors)
echo "3. UNIQUE VISITORS:"
awk '{print $1}' access.log | sort -u | wc -l | \
  awk '{print "   Unique IP addresses:", $1}'
echo ""

# 4. Busiest hour summary
echo "4. BUSIEST HOUR SUMMARY:"
awk -F: '{print $2":00"}' access.log | sort | uniq -c | sort -rn | head -1 | \
  awk '{print "   Peak hour:", $2, "with", $1, "requests"}'
echo ""

# 5. Daily request trend
echo "5. DAILY REQUEST TREND:"
echo "   Date       |  Requests"
echo "   --------------------"
awk -F'[' '{print $2}' access.log | cut -d: -f1 | sort | uniq -c | \
  awk '{printf "   %-10s|  %-6s\n", $2, $1}'