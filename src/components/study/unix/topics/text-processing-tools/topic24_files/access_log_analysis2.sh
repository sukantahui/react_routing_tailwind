#!/bin/bash
# Topic 24: Basic Server Access Log Analysis - Part 2
# Page Popularity Analysis

echo "=== Page Popularity Analysis ==="
echo ""

# 1. Most requested pages (URLs)
echo "1. TOP 10 MOST REQUESTED PAGES:"
echo "   Count | URL"
echo "   -----------------------------"
awk '{print $7}' access.log | sort | uniq -c | sort -rn | head -10 | \
  awk '{printf "   %-6s| %s\n", $1, $2}'
echo ""

# 2. Most common HTTP methods
echo "2. HTTP METHODS DISTRIBUTION:"
awk -F'"' '{print $2}' access.log | awk '{print $1}' | sort | uniq -c | sort -rn | \
  awk '{printf "   %-4s: %-6s requests\n", $2, $1}'
echo ""

# 3. File extensions requested
echo "3. FILE EXTENSION ANALYSIS:"
awk '{print $7}' access.log | grep -o '\.[a-zA-Z0-9]*$' | sort | uniq -c | sort -rn | \
  awk '{printf "   %-6s %-10s\n", $1, $2}'
echo ""

# 4. Top referrers (if using combined log format)
echo "4. TOP REFERRERS:"
awk -F'"' '{print $4}' access.log | sort | uniq -c | sort -rn | head -5 | \
  awk '{printf "   %-6s %s\n", $1, $2}'
echo ""

# 5. User agents analysis (simplified)
echo "5. BROWSER/CLIENT ANALYSIS:"
awk -F'"' '{print $6}' access.log | cut -d' ' -f1 | sort | uniq -c | sort -rn | head -5 | \
  awk '{printf "   %-6s %s\n", $1, $2}'