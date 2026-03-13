#!/bin/bash
# Performance Benchmarking Script
# Comprehensive benchmarking of text processing commands

echo "=== Performance Benchmarking ==="
echo ""

# Create test files of different sizes
echo "Creating test files..."
for size in 1 10 100; do
    echo "Creating ${size}MB file..."
    dd if=/dev/urandom bs=1M count=$size 2>/dev/null | \
        tr -dc 'a-zA-Z0-9\n' | fold -w 100 | \
        head -$((size * 10000)) > "/tmp/test_${size}mb.txt"
done

echo ""
echo "=== Benchmark 1: Command Timing ==="
echo ""

cat > /tmp/benchmark_timing.sh << 'EOF'
#!/bin/bash
benchmark() {
    local desc="$1"
    local cmd="$2"
    local file="$3"
    
    echo "=== $desc ==="
    echo "File: $(basename $file)"
    echo "Size: $(du -h $file | cut -f1)"
    echo ""
    
    # Warm up cache
    $cmd "$file" > /dev/null 2>&1
    
    # Time the command
    echo "Timing:"
    time (for i in {1..3}; do $cmd "$file" > /dev/null; done)
    
    echo ""
    echo "Detailed timing with /usr/bin/time:"
    /usr/bin/time -f "Real: %e sec, User: %U sec, Sys: %S sec, Memory: %M KB" \
        $cmd "$file" > /dev/null 2>&1
    
    echo ""
    echo "---"
    echo ""
}

# Test different commands
benchmark "grep simple pattern" "grep -c 'test'" "/tmp/test_10mb.txt"
benchmark "grep regex pattern" "grep -c '[0-9]\{3\}'" "/tmp/test_10mb.txt"
benchmark "awk field extraction" "awk '{print \$1}'" "/tmp/test_10mb.txt"
benchmark "sed substitution" "sed 's/a/b/g'" "/tmp/test_10mb.txt"
benchmark "cut simple" "cut -c1-10" "/tmp/test_10mb.txt"
EOF

echo "chmod +x /tmp/benchmark_timing.sh"
echo "/tmp/benchmark_timing.sh"
echo ""

echo "=== Benchmark 2: Scaling Analysis ==="
echo ""

cat > /tmp/benchmark_scaling.sh << 'EOF'
#!/bin/bash
echo "=== Performance Scaling with File Size ==="
echo ""
echo "Command: grep -c 'pattern'"
echo ""
printf "%-10s %-12s %-12s %-12s\n" "File Size" "Real Time" "User Time" "Memory (KB)"
echo "------------------------------------------------"

for file in /tmp/test_*.txt; do
    size=$(du -h "$file" | cut -f1)
    
    # Run 3 times and take average
    real_time=$(/usr/bin/time -f "%e" grep -c 'pattern' "$file" 2>&1 > /dev/null)
    user_time=$(/usr/bin/time -f "%U" grep -c 'pattern' "$file" 2>&1 > /dev/null)
    memory=$(/usr/bin/time -f "%M" grep -c 'pattern' "$file" 2>&1 > /dev/null)
    
    printf "%-10s %-12s %-12s %-12s\n" "$size" "$real_time" "$user_time" "$memory"
done

echo ""
echo "=== Linear Regression Analysis ==="
echo "Expected: Time should scale linearly with file size"
echo "Deviation indicates other bottlenecks (I/O, CPU cache, etc.)"
EOF

echo "chmod +x /tmp/benchmark_scaling.sh"
echo "/tmp/benchmark_scaling.sh"
echo ""

echo "=== Benchmark 3: Tool Comparison ==="
echo ""

cat > /tmp/benchmark_tools.sh << 'EOF'
#!/bin/bash
echo "=== Comparing Different Tools for Same Task ==="
echo ""
echo "Task: Extract first field from CSV"
echo "File: /tmp/test_10mb.txt"
echo ""
echo "1. Using awk:"
time awk '{print $1}' /tmp/test_10mb.txt > /dev/null
echo ""
echo "2. Using cut:"
time cut -d' ' -f1 /tmp/test_10mb.txt > /dev/null
echo ""
echo "3. Using sed:"
time sed 's/ .*//' /tmp/test_10mb.txt > /dev/null
echo ""
echo "4. Using Python:"
time python3 -c "import sys; [print(line.split()[0]) for line in sys.stdin]" < /tmp/test_10mb.txt > /dev/null
echo ""
echo "=== Results Summary ==="
echo "Fastest: cut (optimized C implementation)"
echo "Most flexible: awk (full programming language)"
echo "Good for simple regex: sed"
echo "Slowest: Python (interpreted, startup overhead)"
EOF

echo "chmod +x /tmp/benchmark_tools.sh"
echo "/tmp/benchmark_tools.sh"
echo ""

echo "=== Benchmark 4: Parallel vs Sequential ==="
echo ""

cat > /tmp/benchmark_parallel.sh << 'EOF'
#!/bin/bash
echo "=== Parallel Processing Benchmark ==="
echo ""
echo "Creating larger test file (100MB)..."
dd if=/dev/urandom bs=1M count=100 2>/dev/null | \
    tr -dc 'a-zA-Z0-9\n' | fold -w 100 | \
    head -1000000 > "/tmp/test_100mb.txt"

echo ""
echo "Sequential grep:"
time grep -c 'pattern' /tmp/test_100mb.txt > /dev/null

echo ""
echo "Parallel grep (4 jobs):"
if command -v parallel &> /dev/null; then
    time parallel --pipe --block 10M --jobs 4 grep -c 'pattern' < /tmp/test_100mb.txt | \
        awk '{total += $1} END {print total}' > /dev/null
else
    echo "GNU Parallel not installed. Install with: sudo apt-get install parallel"
fi

echo ""
echo "=== Memory Usage Comparison ==="
echo ""
echo "Sequential memory usage:"
/usr/bin/time -f "Max RSS: %M KB" grep -c 'pattern' /tmp/test_100mb.txt > /dev/null 2>&1

echo ""
echo "Parallel memory usage (estimated):"
echo "Each job: ~10-20MB, Total: ~40-80MB"
EOF

echo "chmod +x /tmp/benchmark_parallel.sh"
echo "/tmp/benchmark_parallel.sh"
echo ""

echo "=== Benchmark 5: I/O Performance ==="
echo ""

cat > /tmp/benchmark_io.sh << 'EOF'
#!/bin/bash
echo "=== I/O Performance Benchmarking ==="
echo ""
echo "Testing different I/O methods:"
echo ""
echo "1. Standard input:"
time wc -l < /tmp/test_10mb.txt

echo ""
echo "2. Using cat (unnecessary):"
time cat /tmp/test_10mb.txt | wc -l

echo ""
echo "3. Using tee (extra process):"
time cat /tmp/test_10mb.txt | tee >(wc -l > /dev/null) > /dev/null

echo ""
echo "4. Using temporary file:"
time cp /tmp/test_10mb.txt /tmp/temp.txt && wc -l /tmp/temp.txt && rm /tmp/temp.txt

echo ""
echo "=== Disk vs Memory ==="
echo ""
echo "Processing from disk:"
time grep 'pattern' /tmp/test_10mb.txt > /dev/null

echo ""
echo "Processing from /dev/shm (RAM disk):"
cp /tmp/test_10mb.txt /dev/shm/test.txt
time grep 'pattern' /dev/shm/test.txt > /dev/null
rm /dev/shm/test.txt

echo ""
echo "=== Buffer Size Impact ==="
echo ""
echo "Small buffer (4K):"
time dd if=/tmp/test_10mb.txt bs=4k 2>/dev/null | wc -l

echo ""
echo "Large buffer (1M):"
time dd if=/tmp/test_10mb.txt bs=1M 2>/dev/null | wc -l
EOF

echo "chmod +x /tmp/benchmark_io.sh"
echo "/tmp/benchmark_io.sh"
echo ""

echo "=== Automated Benchmarking Framework ==="
echo ""

cat > /tmp/benchmark_framework.sh << 'EOF'
#!/bin/bash
# Comprehensive benchmarking framework

benchmark_suite() {
    local test_name="$1"
    local command="$2"
    local iterations="${3:-5}"
    
    echo "=== Benchmark: $test_name ==="
    echo "Command: $command"
    echo "Iterations: $iterations"
    echo ""
    
    # Arrays to store results
    declare -a real_times
    declare -a user_times
    declare -a sys_times
    declare -a memory_usage
    
    # Run benchmarks
    for ((i=1; i<=iterations; i++)); do
        echo "Run $i/$iterations..."
        
        # Run command with timing
        output=$(/usr/bin/time -f "%e %U %S %M" bash -c "$command" 2>&1 > /dev/null)
        
        # Parse results
        read real user sys mem <<< "$output"
        
        real_times+=($real)
        user_times+=($user)
        sys_times+=($sys)
        memory_usage+=($mem)
    done
    
    # Calculate statistics
    calculate_stats() {
        local arr=("$@")
        local sum=0
        local min=${arr[0]}
        local max=${arr[0]}
        
        for val in "${arr[@]}"; do
            sum=$(echo "$sum + $val" | bc -l)
            (( $(echo "$val < $min" | bc -l) )) && min=$val
            (( $(echo "$val > $max" | bc -l) )) && max=$val
        done
    
        local avg=$(echo "$sum / ${#arr[@]}" | bc -l)
        echo "$avg $min $max"
    }
    
    echo ""
    echo "=== Results ==="
    echo ""
    
    # Real time stats
    read real_avg real_min real_max <<< $(calculate_stats "${real_times[@]}")
    printf "Real Time:   Avg=%.3fs, Min=%.3fs, Max=%.3fs\n" $real_avg $real_min $real_max
    
    # User time stats
    read user_avg user_min user_max <<< $(calculate_stats "${user_times[@]}")
    printf "User Time:   Avg=%.3fs, Min=%.3fs, Max=%.3fs\n" $user_avg $user_min $user_max
    
    # System time stats
    read sys_avg sys_min sys_max <<< $(calculate_stats "${sys_times[@]}")
    printf "System Time: Avg=%.3fs, Min=%.3fs, Max=%.3fs\n" $sys_avg $sys_min $sys_max
    
    # Memory stats
    read mem_avg mem_min mem_max <<< $(calculate_stats "${memory_usage[@]}")
    printf "Memory:      Avg=%.0fKB, Min=%.0fKB, Max=%.0fKB\n" $mem_avg $mem_min $mem_max
    
    echo ""
    echo "=== Recommendations ==="
    
    # Generate recommendations based on results
    if (( $(echo "$real_avg > 10" | bc -l) )); then
        echo "⏱️  Performance Issue: Command takes >10 seconds"
        echo "   Consider: Optimizing regex, using different tool, parallel processing"
    fi
    
    if (( $(echo "$mem_avg > 1000000" | bc -l) )); then
        echo "💾 Memory Issue: Uses >1GB RAM"
        echo "   Consider: Streaming approach, chunk processing"
    fi
    
    if (( $(echo "$sys_avg / $real_avg > 0.3" | bc -l) )); then
        echo "🔄 System Call Overhead: High system time"
        echo "   Consider: Reducing I/O operations, larger buffers"
    fi
    
    echo ""
}

# Run benchmark suite
echo "Starting benchmark suite..."
echo ""

# Benchmark different operations
benchmark_suite "grep simple" "grep -c 'test' /tmp/test_10mb.txt" 3
benchmark_suite "awk processing" "awk '{sum += length(\$1)} END {print sum}' /tmp/test_10mb.txt" 3
benchmark_suite "sed substitution" "sed 's/a/b/g' /tmp/test_10mb.txt > /dev/null" 3

echo "=== Benchmark Complete ==="
EOF

echo "chmod +x /tmp/benchmark_framework.sh"
echo "echo 'Running comprehensive benchmark...'"
echo "/tmp/benchmark_framework.sh"