#!/bin/bash
# Debugging exit status issues in production scripts

echo "=== Debugging Exit Status Issues ==="

# Enable tracing
set -x

# Function that might fail
process_data() {
    local input="$1"
    
    echo "Processing: $input"
    
    # Simulate processing
    if [[ "$input" == "error" ]]; then
        echo "Simulating error..."
        return 1
    elif [[ "$input" == "fail" ]]; then
        echo "Simulating failure..."
        return 2
    fi
    
    echo "Processing successful"
    return 0
}

# Test case 1: Direct call
echo -e "\n=== Test 1: Direct function call ==="
process_data "test"
echo "Exit status: $?"

# Test case 2: Error case
echo -e "\n=== Test 2: Error case ==="
process_data "error"
error_status=$?
echo "Exit status: $error_status"

# Test case 3: In pipeline
echo -e "\n=== Test 3: In pipeline ==="
process_data "test" | grep -q "success"
pipeline_status=$?
echo "Pipeline exit status: $pipeline_status"
echo "PIPESTATUS: ${PIPESTATUS[@]}"

# Test case 4: Command substitution
echo -e "\n=== Test 4: Command substitution ==="
result=$(process_data "fail")
substitution_status=$?
echo "Command substitution exit: $substitution_status"
echo "Result: $result"

# Test case 5: Conditional execution
echo -e "\n=== Test 5: Conditional execution ==="
process_data "test" && echo "Success branch" || echo "Failure branch"
process_data "error" && echo "Success branch" || echo "Failure branch"

# Test case 6: set -e behavior
echo -e "\n=== Test 6: Testing set -e ==="
set -e
process_data "test"
echo "This executes (success)"
process_data "error"  # This should exit
echo "This should not execute"

# Disable tracing
set +x

echo -e "\n=== Debugging Tips ==="
echo "1. Use 'set -x' to trace execution"
echo "2. Check \$? immediately after command"
echo "3. Use 'set -o pipefail' for pipelines"
echo "4. Check PIPESTATUS array for pipeline components"
echo "5. Save exit status to variable if needed later"