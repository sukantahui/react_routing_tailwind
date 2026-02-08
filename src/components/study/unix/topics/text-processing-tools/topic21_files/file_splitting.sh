#!/bin/bash
# Large File Splitting Strategy
# Techniques for handling files too large to process as a whole

echo "=== Large File Splitting Strategies ==="
echo ""

echo "Creating simulated large file structure..."
mkdir -p /tmp/large_file_demo

# Create a 100MB test file (compressed representation)
echo "Note: Creating smaller file for demonstration. Techniques scale to TB-sized files."
dd if=/dev/urandom bs=1M count=10 2>/dev/null | tr -dc 'a-zA-Z0-9\n' | fold -w 100 | head -10000 > /tmp/large_file_demo/bigfile.txt

echo "File created: /tmp/large_file_demo/bigfile.txt"
echo "Size: $(du -h /tmp/large_file_demo/bigfile.txt | cut -f1)"
echo "Lines: $(wc -l < /tmp/large_file_demo/bigfile.txt)"
echo ""

echo "=== When to Split Files ==="
echo ""
echo "✓ File size > available RAM"
echo "✓ Need parallel processing"
echo "✓ Different processing for different sections"
echo "✓ Incremental processing needed"
echo "✓ Backup/archiving purposes"
echo ""

echo "=== Splitting Techniques ==="
echo ""

echo "1. Split by lines:"
echo "   split -l 1000 bigfile.txt chunk_    # 1000 lines per chunk"
echo "   Result: chunk_aa, chunk_ab, chunk_ac, etc."
echo ""

echo "2. Split by bytes:"
echo "   split -b 10M bigfile.txt bytechunk_ # 10MB per chunk"
echo "   Result: bytechunk_aa, bytechunk_ab, etc."
echo ""

echo "3. Split by number of chunks:"
echo "   split -n l/4 bigfile.txt quad_      # 4 equal line chunks"
echo "   Result: quad_aa, quad_ab, quad_ac, quad_ad"
echo ""

echo "4. Split by pattern:"
echo "   csplit bigfile.txt '/^PATTERN/' '{*}'  # Split at pattern"
echo ""

echo "=== Processing Split Files ==="
echo ""

echo "Method 1: Sequential processing"
cat > /tmp/process_sequential.sh << 'EOF'
#!/bin/bash
for chunk in /tmp/large_file_demo/chunk_*; do
    echo "Processing $chunk"
    grep -c "pattern" "$chunk"
done
EOF

echo "chmod +x /tmp/process_sequential.sh"
echo "/tmp/process_sequential.sh"
echo ""

echo "Method 2: Parallel processing"
cat > /tmp/process_parallel.sh << 'EOF'
#!/bin/bash
# Process all chunks in parallel
for chunk in /tmp/large_file_demo/chunk_*; do
    (echo "Processing $chunk"; grep -c "pattern" "$chunk" > "${chunk}.result") &
done

# Wait for all jobs
wait

# Combine results
total=0
for result in /tmp/large_file_demo/chunk_*.result; do
    count=$(cat "$result" 2>/dev/null || echo 0)
    total=$((total + count))
done
echo "Total matches: $total"
EOF

echo "chmod +x /tmp/process_parallel.sh"
echo "/tmp/process_parallel.sh"
echo ""

echo "Method 3: Using GNU Parallel"
echo "parallel 'grep -c pattern {}' ::: /tmp/large_file_demo/chunk_* | awk '{total += \$1} END {print total}'"
echo ""

echo "=== Advanced Splitting Strategies ==="
echo ""

echo "1. Split by date range (for log files):"
cat > /tmp/split_by_date.sh << 'EOF'
#!/bin/bash
# Assuming each line starts with timestamp: 2023-12-01 10:30:45
awk '
{
    split($1, date, "-")
    year = date[1]
    month = date[2]
    
    # Write to year-month file
    output_file = sprintf("/tmp/logs_%s-%s.txt", year, month)
    print $0 >> output_file
}
' /tmp/large_file_demo/bigfile.txt
EOF

echo "chmod +x /tmp/split_by_date.sh"
echo "/tmp/split_by_date.sh"
echo ""

echo "2. Split by key/hash (for balanced processing):"
cat > /tmp/split_by_hash.sh << 'EOF'
#!/bin/bash
# Split records by hash of first field for balanced distribution
awk -F, '
{
    # Simple hash function
    hash = 0
    for(i=1; i<=length($1); i++) {
        hash = (hash * 31 + substr($1, i, 1)) % 4
    }
    
    # Write to corresponding chunk
    print $0 >> sprintf("/tmp/chunk_%d.txt", hash)
}
' /tmp/large_file_demo/bigfile.txt
EOF

echo "chmod +x /tmp/split_by_hash.sh"
echo "/tmp/split_by_hash.sh"
echo ""

echo "3. Split while preserving header:"
cat > /tmp/split_with_header.sh << 'EOF'
#!/bin/bash
FILE="/tmp/large_file_demo/bigfile.txt"
HEADER=$(head -1 "$FILE")
TOTAL_LINES=$(wc -l < "$FILE")
LINES_PER_CHUNK=1000

# Calculate number of chunks
NUM_CHUNKS=$(( (TOTAL_LINES + LINES_PER_CHUNK - 2) / (LINES_PER_CHUNK - 1) ))

for ((i=1; i<=NUM_CHUNKS; i++)); do
    START=$(( (i-1) * (LINES_PER_CHUNK - 1) + 2 ))
    END=$(( i * (LINES_PER_CHUNK - 1) + 1 ))
    
    # Create chunk with header
    echo "$HEADER" > "/tmp/chunk_with_header_$i.txt"
    sed -n "${START},${END}p" "$FILE" >> "/tmp/chunk_with_header_$i.txt"
done
EOF

echo "chmod +x /tmp/split_with_header.sh"
echo "/tmp/split_with_header.sh"
echo ""

echo "=== Recombining Results ==="
echo ""

echo "1. Simple concatenation:"
echo "   cat /tmp/chunk_*.txt > /tmp/recombined.txt"
echo ""

echo "2. Concatenation with sort:"
echo "   sort /tmp/chunk_*.txt > /tmp/sorted_combined.txt"
echo ""

echo "3. Merge sorted chunks (more efficient):"
echo "   sort -m /tmp/chunk_*.txt > /tmp/merged_sorted.txt"
echo ""

echo "4. Database merge:"
echo "   cat /tmp/chunk_*.sql | sqlite3 database.db"
echo ""

echo "=== Performance Considerations ==="
echo ""
echo "Split Size Recommendations:"
echo "  RAM < 4GB:     Split into 100MB chunks"
echo "  RAM 4-16GB:    Split into 500MB-1GB chunks"
echo "  RAM > 16GB:    Split into 2-4GB chunks"
echo ""
echo "I/O Considerations:"
echo "  ✓ Split on SSD for faster I/O"
echo "  ✓ Process chunks in /dev/shm if possible"
echo "  ✓ Balance chunk count vs overhead"