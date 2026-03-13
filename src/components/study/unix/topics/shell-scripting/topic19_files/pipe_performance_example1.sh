#!/bin/bash
# Optimizing pipeline performance for large datasets

echo "=== Pipeline Performance Optimization ==="

# Generate a large dataset
echo "Generating test data (100000 lines)..."
seq 1 100000 > /tmp/large_data.txt
echo "Additional data..." >> /tmp/large_data.txt
echo "More lines..." >> /tmp/large_data.txt
echo "Done. File size: $(wc -l < /tmp/large_data.txt) lines"

echo -e "\n1. Testing different pipeline patterns:"
echo "------------------------------------------"

# Pattern 1: Simple but inefficient
echo -e "\na) Inefficient pattern (multiple greps):"
time {
    grep "1" /tmp/large_data.txt | \
    grep "2" | \
    grep "3" | \
    grep "4" | \
    grep "5" > /tmp/result1.txt
}
echo "Results: $(wc -l < /tmp/result1.txt) lines"

# Pattern 2: Single grep with regex
echo -e "\nb) Efficient pattern (single grep with regex):"
time {
    grep "1.*2.*3.*4.*5" /tmp/large_data.txt > /tmp/result2.txt
}
echo "Results: $(wc -l < /tmp/result2.txt) lines"

# Pattern 3: Using awk instead of multiple pipes
echo -e "\nc) Using awk (single process):"
time {
    awk '/1/ && /2/ && /3/ && /4/ && /5/' /tmp/large_data.txt > /tmp/result3.txt
}
echo "Results: $(wc -l < /tmp/result3.txt) lines"

echo -e "\n2. Stream processing vs buffering:"
echo "--------------------------------------"

# Create a data generator function
generate_data() {
    for i in {1..50000}; do
        echo "Line $i: $(date +%s%N) $(shuf -i 100-999 -n 1)"
        # Small delay to simulate streaming
        sleep 0.0001
    done
}

echo -e "\na) Stream processing (process as data arrives):"
time {
    generate_data | \
    awk '{print $1, $2, $3}' | \
    grep "Line 1" | \
    head -100 > /tmp/stream_results.txt
}

echo -e "\nb) Buffered processing (collect all then process):"
time {
    generate_data > /tmp/buffer.txt
    cat /tmp/buffer.txt | \
    awk '{print $1, $2, $3}' | \
    grep "Line 1" | \
    head -100 > /tmp/buffer_results.txt
}

echo -e "\n3. Parallel processing with xargs:"
echo "--------------------------------------"

# Create files for processing
mkdir -p /tmp/parallel_test
for i in {1..100}; do
    seq 1 1000 > "/tmp/parallel_test/file_$i.txt"
done

echo -e "\na) Sequential processing:"
time {
    find /tmp/parallel_test -name "*.txt" -exec wc -l {} \; | \
    awk '{sum += $1} END {print "Total lines:", sum}'
}

echo -e "\nb) Parallel processing (4 jobs):"
time {
    find /tmp/parallel_test -name "*.txt" -print0 | \
    xargs -0 -P4 -n1 wc -l | \
    awk '{sum += $1} END {print "Total lines:", sum}'
}

echo -e "\n4. Memory usage considerations:"
echo "-----------------------------------"

# Large sort example
echo "Creating large unsorted file..."
seq 1000000 | shuf > /tmp/large_unsorted.txt

echo -e "\na) Sorting with pipe (may use temp files):"
time {
    sort /tmp/large_unsorted.txt > /tmp/sorted1.txt
}

echo -e "\nb) Using sort with memory limit:"
time {
    sort -S 100M /tmp/large_unsorted.txt > /tmp/sorted2.txt
}

echo -e "\n5. Pipeline optimization tips:"
echo "----------------------------------"
cat << 'EOF'
Performance optimization strategies:
1. Filter early: Remove unwanted data as soon as possible
2. Use fewer processes: Combine operations in awk/sed
3. Avoid unnecessary sorts: sort breaks streaming
4. Use appropriate buffer sizes
5. Consider parallel processing for independent tasks
6. Profile with 'time' command to identify bottlenecks
7. Use efficient regex patterns
8. Consider temporary files for very large datasets
EOF

# Cleanup
rm -rf /tmp/large_data.txt /tmp/result*.txt /tmp/stream_results.txt \
       /tmp/buffer.txt /tmp/buffer_results.txt /tmp/parallel_test \
       /tmp/large_unsorted.txt /tmp/sorted*.txt