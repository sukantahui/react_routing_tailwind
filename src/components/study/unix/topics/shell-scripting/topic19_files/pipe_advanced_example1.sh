#!/bin/bash
# Advanced pipeline patterns for production analytics

echo "=== Advanced Pipeline Patterns ==="

echo "1. Process Substitution for Multiple Inputs:"
echo "--------------------------------------------"

# Compare two directories
echo "Comparing /tmp and /var/tmp:"
diff <(ls -la /tmp | head -10) <(ls -la /var/tmp | head -10) || true

# Combine outputs from multiple commands
echo -e "\nCombined system info:"
paste <(uptime) <(date) <(whoami)

echo -e "\n2. Named Pipes (FIFO) for Complex Workflows:"
echo "------------------------------------------------"

# Create named pipe
PIPE_PATH="/tmp/my_pipe"
rm -f "$PIPE_PATH"
mkfifo "$PIPE_PATH"

# Producer: Generate data
(
    echo "Starting data generation..."
    for i in {1..5}; do
        echo "Data packet $i: $(date +%s%N)"
        sleep 0.5
    done
    echo "END"
) > "$PIPE_PATH" &

# Consumer: Process data
(
    echo "Starting data processing..."
    while read line; do
        if [ "$line" = "END" ]; then
            break
        fi
        echo "Processed: $line" | sed 's/Data/Processed data/'
    done
) < "$PIPE_PATH"

wait
rm -f "$PIPE_PATH"

echo -e "\n3. Tee for Multi-directional Pipelines:"
echo "-------------------------------------------"

# Pipeline that splits, processes, and recombines
echo "Processing with tee splitting:"
{
    echo "=== Multi-path Processing ==="
    seq 1 10
} | tee \
    >(awk '{sum += $1} END {print "Sum:", sum}' > /tmp/sum.txt) \
    >(awk '{prod = !prod ? $1 : prod * $1} END {print "Product:", prod}' > /tmp/prod.txt) \
    >(awk '{print "Square:", $1 * $1}' > /tmp/squares.txt) \
    > /tmp/original.txt

echo "Results:"
echo "Original: $(cat /tmp/original.txt | head -5)..."
echo "Sum: $(cat /tmp/sum.txt)"
echo "Product: $(cat /tmp/prod.txt)"
echo "Squares: $(cat /tmp/squares.txt | head -3)..."

echo -e "\n4. Co-processes for Bidirectional Communication:"
echo "-----------------------------------------------------"

# Using coproc for interactive communication
coproc CALC {
    bc -l
}

# Send calculations
echo "5 + 3" >&"${CALC[1]}"
read -u "${CALC[0]}" result
echo "5 + 3 = $result"

echo "2 * 3.14" >&"${CALC[1]}"
read -u "${CALC[0]}" result
echo "2 * 3.14 = $result"

# Close coproc
exec {CALC[1]}>&-

echo -e "\n5. Pipeline with Error Recovery:"
echo "------------------------------------"

# Function with retry logic
retry_pipeline() {
    local max_retries=3
    local retry_count=0
    
    while [ $retry_count -lt $max_retries ]; do
        if [ $retry_count -gt 0 ]; then
            echo "Retry attempt $retry_count/$max_retries"
        fi
        
        # Pipeline that might fail
        set +e
        (
            set -e
            echo "Step 1: Fetching data"
            echo "data line 1"
            echo "data line 2"
            if [ $retry_count -eq 1 ]; then
                echo "Simulating transient failure" >&2
                exit 1
            fi
            echo "Step 2: Processing data"
            echo "processed: data line 1"
            echo "processed: data line 2"
            echo "Step 3: Finalizing"
        ) 2>&1 | tee /tmp/pipeline.log
            
        pipeline_exit=${PIPESTATUS[0]}
        set -e
        
        if [ $pipeline_exit -eq 0 ]; then
            echo "Pipeline succeeded!"
            break
        else
            echo "Pipeline failed with exit code: $pipeline_exit"
            retry_count=$((retry_count + 1))
            sleep 1
        fi
    done
    
    if [ $retry_count -eq $max_retries ]; then
        echo "Pipeline failed after $max_retries attempts"
        return 1
    fi
    return 0
}

retry_pipeline

echo -e "\n6. Dynamic Pipeline Construction:"
echo "-------------------------------------"

# Build pipeline based on conditions
build_pipeline() {
    local filters=()
    
    # Add filters based on arguments
    for arg in "$@"; do
        case $arg in
            numeric)
                filters+=("grep '[0-9]'")
                ;;
            uppercase)
                filters+=("tr 'a-z' 'A-Z'")
                ;;
            reverse)
                filters+=("tac")
                ;;
            unique)
                filters+=("sort -u")
                ;;
        esac
    done
    
    # Execute the constructed pipeline
    echo "Input data:
apple
Banana
123
cherry
456" | eval "$(IFS='|'; echo "${filters[*]}")"
}

echo "Testing dynamic pipeline with: numeric + uppercase"
build_pipeline numeric uppercase

echo -e "\n7. Pipeline Performance Monitoring:"
echo "--------------------------------------"

# Monitor pipeline performance
monitor_pipeline() {
    local pipeline="$1"
    
    echo "Monitoring pipeline: $pipeline"
    
    # Time the pipeline
    time eval "$pipeline" > /dev/null
    
    # Monitor memory
    /usr/bin/time -v bash -c "$pipeline" 2>&1 | grep -E "Maximum resident|Elapsed"
}

monitor_pipeline 'seq 1 1000000 | grep "1" | wc -l'

echo -e "\n8. Pipeline Design Patterns Summary:"
echo "----------------------------------------"
cat << 'EOF'
Advanced Pipeline Patterns:
1. Process Substitution: <(cmd) for multiple inputs
2. Named Pipes: mkfifo for complex workflows
3. Tee Splitting: Multiple processing paths
4. Co-processes: Bidirectional communication
5. Error Recovery: Retry logic in pipelines
6. Dynamic Pipelines: Build based on conditions
7. Performance Monitoring: Track resource usage
8. Parallel Processing: xargs -P or GNU parallel

Choose pattern based on:
- Data volume and velocity
- Error handling requirements
- Processing complexity
- Resource constraints
EOF

# Cleanup
rm -f /tmp/sum.txt /tmp/prod.txt /tmp/squares.txt /tmp/original.txt /tmp/pipeline.log