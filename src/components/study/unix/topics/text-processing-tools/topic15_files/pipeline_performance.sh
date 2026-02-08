#!/bin/bash
# Performance-optimized pipeline example

echo "Optimized Pipeline for Large Files"
echo "=================================="

echo "Processing strategy for large log files:"
echo "1. Use head to sample data during development"
echo "2. Filter with simple patterns first"
echo "3. Avoid unnecessary sorting until needed"
echo "4. Use efficient regex patterns"

echo -e "\nExample optimized pipeline:"
echo "------------------------------"

# Optimized pipeline that processes efficiently
cat << 'EOF' | \
# First, get only relevant lines (reduces data early)
grep "ERROR\|WARN" | \
# Extract just the message part (reduce data further)
cut -d' ' -f4- | \
# Simple transformation (faster than complex regex)
sed 's/^\[[^]]*\] //' | \
# Count occurrences
sort | \
uniq -c | \
# Final formatting
awk '{printf("%3d occurrences: %s\n", $1, $2)}'
[2024-01-15 10:30:45] INFO Application started
[2024-01-15 10:31:22] ERROR Database connection failed
[2024-01-15 10:32:15] WARN High memory usage: 85%
[2024-01-15 10:33:01] ERROR Database connection failed
[2024-01-15 10:34:18] ERROR File not found
[2024-01-15 10:35:42] INFO Processing complete
[2024-01-15 10:36:09] WARN Disk space low: 15% free
[2024-01-15 10:37:33] ERROR Permission denied
[2024-01-15 10:38:56] ERROR Database connection failed
EOF

echo -e "\nPerformance tips applied:"
echo "• grep filters first (reduces data early)"
echo "• cut extracts needed columns only"
echo "• Simple sed pattern (no backreferences)"
echo "• Sorting done only when necessary"
echo "• awk for final formatting (efficient)"