#!/bin/bash
# Basic Performance Tips for Large Files
# Essential optimizations every developer should know

echo "=== Basic Performance Optimizations ==="
echo ""

# Create a large sample file (100,000 lines)
echo "Creating sample data (100,000 lines)..."
seq 1 100000 | while read i; do
    echo "User$i,Department$(($i % 10)),$(($RANDOM % 1000)),$(date -d "$i days ago" +%Y-%m-%d)"
done > /tmp/large_data.csv

echo "File created: /tmp/large_data.csv"
echo "Size: $(du -h /tmp/large_data.csv | cut -f1)"
echo "Lines: $(wc -l < /tmp/large_data.csv)"
echo ""

echo "=== Performance Comparison ==="
echo ""

echo "1. Naive approach (multiple commands, intermediate files):"
echo "   grep 'Department5' /tmp/large_data.csv > /tmp/temp1.csv"
echo "   awk -F, '{print \$1,\$3}' /tmp/temp1.csv > /tmp/temp2.csv"
echo "   sort /tmp/temp2.csv > /tmp/result1.csv"
echo ""
echo "2. Optimized approach (single pipeline):"
echo "   grep 'Department5' /tmp/large_data.csv | awk -F, '{print \$1,\$3}' | sort"
echo ""

echo "=== Timing the approaches ==="
echo ""

echo "Running naive approach..."
time (grep 'Department5' /tmp/large_data.csv > /tmp/temp1.csv && \
      awk -F, '{print $1,$3}' /tmp/temp1.csv > /tmp/temp2.csv && \
      sort /tmp/temp2.csv > /tmp/result1.csv)
echo ""

echo "Running optimized approach..."
time (grep 'Department5' /tmp/large_data.csv | awk -F, '{print $1,$3}' | sort > /tmp/result2.csv)
echo ""

echo "=== Memory Usage Comparison ==="
echo ""

echo "Using /usr/bin/time to measure memory:"
echo ""
echo "Naive approach memory usage:"
/usr/bin/time -f "Max RSS: %M KB" grep 'Department5' /tmp/large_data.csv > /tmp/temp1.csv 2>&1
echo ""
echo "Pipeline memory usage:"
/usr/bin/time -f "Max RSS: %M KB" sh -c "grep 'Department5' /tmp/large_data.csv | awk -F, '{print \$1,\$3}' | sort > /dev/null" 2>&1
echo ""

echo "=== Additional Tips ==="
echo ""

echo "1. Use LC_ALL=C for sorting and pattern matching:"
echo "   Standard: time sort /tmp/large_data.csv > /dev/null"
echo "   Optimized: time LC_ALL=C sort /tmp/large_data.csv > /dev/null"
echo ""

echo "2. Early filtering reduces processing:"
echo "   Slow: cat /tmp/large_data.csv | awk -F, '\$3 > 500' | wc -l"
echo "   Fast: awk -F, '\$3 > 500' /tmp/large_data.csv | wc -l"
echo ""

echo "3. Use appropriate tools:"
echo "   For simple filtering: grep (fastest)"
echo "   For field extraction: cut (faster than awk for simple cases)"
echo "   For complex processing: awk (single pass)"
echo ""

echo "=== Performance Rules ==="
echo "1. Never read file multiple times if avoidable"
echo "2. Use pipes, not intermediate files"
echo "3. Filter as early as possible"
echo "4. Choose right tool for the job"