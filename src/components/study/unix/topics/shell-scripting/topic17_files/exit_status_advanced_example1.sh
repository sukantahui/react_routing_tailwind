#!/bin/bash
# Complex error handling patterns for production systems

echo "=== Advanced Exit Status Patterns ==="

# Pattern 1: Exit on error with cleanup
set -eE  # Exit on error, enable ERR trap

cleanup() {
    local exit_code=$?
    echo "Cleanup triggered with exit code: $exit_code"
    
    # Perform cleanup operations
    if [ -f "/tmp/tempfile.txt" ]; then
        echo "Removing temporary files..."
        rm -f "/tmp/tempfile.txt"
    fi
    
    # Log the error
    if [ $exit_code -ne 0 ]; then
        echo "[ERROR] Script failed at line: ${BASH_LINENO[0]}"
    fi
}

# Set up trap
trap cleanup EXIT

# Pattern 2: Retry logic with exponential backoff
retry_command() {
    local cmd="$1"
    local max_retries="${2:-3}"
    local retry_delay="${3:-1}"
    
    local attempt=1
    while [ $attempt -le $max_retries ]; do
        echo "Attempt $attempt/$max_retries: $cmd"
        
        if eval "$cmd"; then
            echo "✓ Command succeeded on attempt $attempt"
            return 0
        else
            local exit_code=$?
            echo "✗ Command failed with exit code: $exit_code"
            
            if [ $attempt -eq $max_retries ]; then
                echo "Maximum retries reached"
                return $exit_code
            fi
            
            echo "Waiting ${retry_delay}s before retry..."
            sleep $retry_delay
            
            # Exponential backoff
            retry_delay=$((retry_delay * 2))
            attempt=$((attempt + 1))
        fi
    done
}

# Pattern 3: Command grouping with exit status
echo -e "\nTesting command grouping..."
{
    echo "Starting grouped commands..."
    date
    false  # This will fail
    echo "This won't execute"
} && {
    echo "Success block executed"
} || {
    local group_exit=$?
    echo "Failure block executed with exit: $group_exit"
}

# Pattern 4: Subshell exit status
echo -e "\nTesting subshell exit status..."
(
    echo "Inside subshell..."
    exit 42
)
subshell_exit=$?
echo "Subshell exited with: $subshell_exit"

# Pattern 5: Multiple condition checks
echo -e "\nTesting multiple conditions..."
check_all() {
    local all_ok=true
    
    # Check 1: Disk space
    df -h / | tail -1 | awk '{print $5}' | sed 's/%//' | {
        read usage
        if [ "$usage" -gt 90 ]; then
            echo "✗ Disk usage too high: ${usage}%"
            all_ok=false
        else
            echo "✓ Disk usage OK: ${usage}%"
        fi
    }
    
    # Check 2: Memory
    free -m | awk 'NR==2 {print $3/$2 * 100.0}' | {
        read usage
        if (( $(echo "$usage > 90" | bc -l) )); then
            echo "✗ Memory usage too high: ${usage}%"
            all_ok=false
        else
            echo "✓ Memory usage OK: ${usage}%"
        fi
    }
    
    # Check 3: Load average
    load=$(uptime | awk -F'load average:' '{print $2}' | awk '{print $1}' | tr -d ',')
    if (( $(echo "$load > 5" | bc -l) )); then
        echo "✗ Load average too high: $load"
        all_ok=false
    else
        echo "✓ Load average OK: $load"
    fi
    
    if $all_ok; then
        return 0
    else
        return 1
    fi
}

check_all
system_status=$?

echo -e "\n=== Final Status ==="
echo "System check exit code: $system_status"
exit $system_status