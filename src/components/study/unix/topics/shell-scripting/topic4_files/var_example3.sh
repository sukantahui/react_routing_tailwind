#!/bin/bash
# Local Variable Examples

echo "=== Local Variables (Function Scope) ==="
echo ""

# 1. Basic local variable in function
echo "1. Local variables in functions:"
function counter_example {
    local count=0
    count=$((count + 1))
    echo "  Inside function: count=$count"
}

counter_example
echo "  Outside function: count=${count:-undefined}"
echo ""

# 2. Without local keyword (BAD PRACTICE)
echo "2. Without 'local' keyword (shows the problem):"
function bad_counter {
    # Missing 'local' - modifies global variable!
    count=0
    count=$((count + 5))
    echo "  Inside bad function: count=$count"
}

global_count=10
echo "  Before function: global_count=$global_count"
bad_counter
echo "  After function: global_count=$global_count"
echo "  Oops! Global variable was modified!"
echo ""

# 3. Multiple local variables
echo "3. Multiple local variables:"
function calculate_stats {
    local files=(*.txt)
    local total_files=${#files[@]}
    local total_size=0
    
    for file in "${files[@]}"; do
        if [ -f "$file" ]; then
            local size=$(wc -c < "$file" 2>/dev/null || echo 0)
            total_size=$((total_size + size))
        fi
    done
    
    echo "  Files: $total_files, Total size: $total_size bytes"
}

# Create some test files
echo "test1" > /tmp/file1.txt
echo "test2" > /tmp/file2.txt
cd /tmp && calculate_stats
cd - > /dev/null
echo ""

# 4. Local variables with parameters
echo "4. Local variables with function parameters:"
function create_user {
    local username="$1"
    local email="$2"
    local role="${3:-user}"  # Default value
    
    echo "  Creating user:"
    echo "    Username: $username"
    echo "    Email: $email"
    echo "    Role: $role"
    
    # Local variable for timestamp
    local created_at=$(date +"%Y-%m-%d %H:%M:%S")
    echo "    Created: $created_at"
}

create_user "swadeep" "swadeep@example.com"
create_user "tuhina" "tuhina@example.com" "admin"
echo ""

# 5. Nested functions with local variables
echo "5. Nested functions:"
function outer_function {
    local outer_var="I'm in outer function"
    
    function inner_function {
        local inner_var="I'm in inner function"
        echo "  Inner sees: $inner_var"
        echo "  Inner also sees outer: $outer_var"
    }
    
    echo "  Outer sees: $outer_var"
    # echo "  Outer cannot see inner: ${inner_var:-not visible}"
    inner_function
}

outer_function
echo ""

# 6. Local variables in loops within functions
echo "6. Local variables in loops:"
function process_items {
    local items=("$@")
    local processed=0
    local skipped=0
    
    for item in "${items[@]}"; do
        if [[ "$item" == skip_* ]]; then
            skipped=$((skipped + 1))
            continue
        fi
        echo "  Processing: $item"
        processed=$((processed + 1))
    done
    
    echo "  Summary: Processed $processed, Skipped $skipped"
}

process_items "item1" "skip_this" "item2" "skip_that" "item3"
echo ""

# 7. Local variables prevent naming conflicts
echo "7. Preventing naming conflicts:"
config_file="/etc/global.conf"

function read_config {
    local config_file="/tmp/local.conf"  # Different file!
    
    echo "  Inside function:"
    echo "    config_file='$config_file'"
    echo "    Creating local config..."
    echo "local_setting=value" > "$config_file"
}

echo "  Global config_file: $config_file"
read_config
echo "  Global config_file unchanged: $config_file"
echo ""

# 8. Returning values from functions using local variables
echo "8. Returning values:"
function calculate_average {
    local numbers=("$@")
    local sum=0
    local count=${#numbers[@]}
    
    for num in "${numbers[@]}"; do
        sum=$((sum + num))
    done
    
    local average=$((sum / count))
    echo "$average"  # Output to stdout
}

result=$(calculate_average 10 20 30 40)
echo "  Average: $result"
echo ""

# 9. Local variables with arithmetic
echo "9. Local variables with arithmetic:"
function math_operations {
    local a=$1
    local b=$2
    local sum=$((a + b))
    local diff=$((a - b))
    local product=$((a * b))
    
    echo "  $a + $b = $sum"
    echo "  $a - $b = $diff"
    echo "  $a * $b = $product"
    
    # Local variable only used in calculation
    local temp=$((a * a + b * b))
    echo "  $a² + $b² = $temp"
}

math_operations 15 7
echo ""

echo "=== Best Practices for Local Variables ==="
echo "• Always use 'local' keyword in functions"
echo "• Use descriptive names"
echo "• Initialize with default values when appropriate"
echo "• Use local variables for temporary calculations"
echo "• Prevents side effects and naming conflicts"