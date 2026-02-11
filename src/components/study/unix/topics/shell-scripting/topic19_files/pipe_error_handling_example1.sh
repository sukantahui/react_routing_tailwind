#!/bin/bash
# Error handling in Naihati deployment pipelines

echo "=== Naihati Deployment Pipeline with Error Handling ==="

# Enable pipefail for better error detection
set -o pipefail

# Function to simulate deployment steps
simulate_deploy() {
    local step="$1"
    local should_fail="${2:-false}"
    
    echo "Executing: $step"
    
    if [ "$should_fail" = "true" ]; then
        echo "Simulating failure in: $step" >&2
        return 1
    else
        echo "Success: $step"
        return 0
    fi
}

echo "1. Basic pipeline with error handling:"
echo "---------------------------------------"

# Pipeline with error checking
if simulate_deploy "Step 1: Check dependencies" | \
   simulate_deploy "Step 2: Build application" | \
   simulate_deploy "Step 3: Run tests"; then
    echo "✓ Pipeline completed successfully"
else
    echo "✗ Pipeline failed with exit code: $?"
    echo "PIPESTATUS: ${PIPESTATUS[@]}"
fi

echo -e "\n2. Pipeline with simulated failure:"
echo "----------------------------------------"

# Reset pipe status
PIPESTATUS=()

if simulate_deploy "Step 1: Check dependencies" | \
   simulate_deploy "Step 2: Build application" true | \
   simulate_deploy "Step 3: Run tests"; then
    echo "✓ Pipeline completed successfully"
else
    echo "✗ Pipeline failed"
    echo "Individual exit codes: ${PIPESTATUS[@]}"
    
    # Check which step failed
    for i in "${!PIPESTATUS[@]}"; do
        if [ "${PIPESTATUS[$i]}" -ne 0 ]; then
            echo "  Step $((i+1)) failed with code: ${PIPESTATUS[$i]}"
        fi
    done
fi

echo -e "\n3. Using tee to capture output while checking errors:"
echo "---------------------------------------------------------"

{
    echo "=== Deployment Log ==="
    echo "Start time: $(date)"
    
    # Simulate deployment steps with tee
    simulate_deploy "Step 1: Backup current version"
    simulate_deploy "Step 2: Deploy new binaries" true
    simulate_deploy "Step 3: Update configuration"
    
    echo "End time: $(date)"
} 2>&1 | tee /tmp/deployment.log | \
    while read line; do
        # Process each line while also checking for errors
        if echo "$line" | grep -q "Simulating failure"; then
            echo "ERROR DETECTED: $line" >&2
        fi
    done

deploy_exit=${PIPESTATUS[0]}
echo "Deployment exit code: $deploy_exit"

echo -e "\n4. Complex error handling with multiple conditions:"
echo "--------------------------------------------------------"

# Create a more complex pipeline
deploy_pipeline() {
    local log_file="$1"
    
    # Track individual command status
    local status1 status2 status3
    
    # Step 1: Pre-deployment checks
    simulate_deploy "Pre-check: Disk space" > >(tee -a "$log_file") 2>&1
    status1=$?
    
    # Step 2: Build (might fail)
    simulate_deploy "Build: Compile sources" true > >(tee -a "$log_file") 2>&1
    status2=$?
    
    # Step 3: Deploy (only if build succeeded)
    if [ $status2 -eq 0 ]; then
        simulate_deploy "Deploy: Copy files" > >(tee -a "$log_file") 2>&1
        status3=$?
    else
        echo "Skipping deployment due to build failure" | tee -a "$log_file"
        status3=0  # Not an error, just skipped
    fi
    
    # Return overall status
    if [ $status1 -eq 0 ] && [ $status2 -eq 0 ] && [ $status3 -eq 0 ]; then
        return 0
    else
        return 1
    fi
}

echo "Running complex deployment pipeline..."
deploy_pipeline "/tmp/naihati_deploy.log"
pipeline_status=$?

echo "Pipeline status: $pipeline_status"
echo -e "\nLog file contents:"
cat "/tmp/naihati_deploy.log"

echo -e "\n5. Best practices summary:"
echo "------------------------------"
cat << 'EOF'
Best practices for pipe error handling:
1. Always use 'set -o pipefail' in production scripts
2. Check PIPESTATUS array for individual command status
3. Use 'tee' to capture output while preserving error detection
4. Consider using process substitution for complex error handling
5. Log errors with context for debugging
6. Implement retry logic for transient failures
EOF

# Cleanup
rm -f "/tmp/deployment.log" "/tmp/naihati_deploy.log"