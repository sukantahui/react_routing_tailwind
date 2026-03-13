#!/bin/bash
# Associative Array Examples

echo "=== Associative Arrays (Key-Value Pairs) ==="
echo ""
echo "IMPORTANT: Associative arrays require Bash 4.0+"
echo "           and must be declared with 'declare -A'"
echo ""

# Check Bash version
bash_version=${BASH_VERSION%%[^0-9.]*}
echo "Bash version: $bash_version"
if [[ $(echo "$bash_version < 4.0" | bc) -eq 1 ]]; then
    echo "WARNING: Associative arrays require Bash 4.0 or higher"
    echo "Some examples may not work on this system"
fi
echo ""

# 1. Declaring associative arrays
echo "1. Declaring associative arrays:"

# Method 1: Declare then assign
declare -A student
student["name"]="Swadeep"
student["age"]=22
student["city"]="Barrackpore"
student["course"]="Computer Science"
echo "  Method 1: declare -A then assign"
echo "  Student: ${student[@]}"
echo ""

# Method 2: Declare and initialize
declare -A teacher=(
    ["name"]="Sukanta Hui"
    ["experience"]=27
    ["email"]="sukantahui@codernaccotax.co.in"
    ["skills"]="Programming, RDBMS, OS"
)
echo "  Method 2: declare -A with initialization"
echo "  Teacher: ${teacher[@]}"
echo ""

# 2. Accessing elements
echo "2. Accessing elements:"
echo "  Student name: ${student["name"]}"
echo "  Student age: ${student["age"]}"
echo "  Student city: ${student["city"]}"
echo ""

# 3. Getting keys and values
echo "3. Getting keys and values separately:"
echo "  All keys: ${!student[@]}"
echo "  All values: ${student[@]}"
echo "  Number of elements: ${#student[@]}"
echo ""

# 4. Iterating through associative arrays
echo "4. Iterating through associative arrays:"

echo "  Method 1: Loop through keys"
for key in "${!student[@]}"; do
    echo "    $key: ${student[$key]}"
done
echo ""

echo "  Method 2: Loop through values only"
for value in "${student[@]}"; do
    echo "    Value: $value"
done
echo ""

# 5. Modifying associative arrays
echo "5. Modifying associative arrays:"

# Add new key-value pair
student["grade"]="A"
echo "  After adding grade:"
for key in "${!student[@]}"; do
    echo "    $key: ${student[$key]}"
done
echo ""

# Update existing value
student["age"]=23
echo "  After updating age to 23: ${student["age"]}"
echo ""

# Remove a key-value pair
unset student["course"]
echo "  After removing course key:"
echo "  Keys: ${!student[@]}"
echo ""

# 6. Checking if key exists
echo "6. Checking if key exists:"
check_key="email"
if [[ -v student["$check_key"] ]]; then
    echo "  Key '$check_key' exists with value: ${student[$check_key]}"
else
    echo "  Key '$check_key' does not exist"
fi
echo ""

# 7. Nested associative arrays (simulated)
echo "7. Simulating nested associative arrays:"

declare -A student1
student1["name"]="Tuhina"
student1["city"]="Shyamnagar"
student1["age"]=21

declare -A student2
student2["name"]="Abhronila"
student2["city"]="Ichapur"
student2["age"]=22

declare -A student3
student3["name"]="Debangshu"
student3["city"]="Naihati"
student3["age"]=23

# Array of associative arrays (simulated by prefix)
echo "  Multiple students:"
for i in 1 2 3; do
    declare -n current_student="student$i"
    echo "    Student $i: ${current_student["name"]} from ${current_student["city"]}"
done
echo ""

# 8. Practical example: Word frequency counter
echo "8. Practical example: Word frequency counter:"

text="apple banana apple cherry banana apple date apple cherry"
declare -A word_count

for word in $text; do
    if [[ -v word_count["$word"] ]]; then
        ((word_count["$word"]++))
    else
        word_count["$word"]=1
    fi
done

echo "  Text: $text"
echo "  Word frequencies:"
for word in "${!word_count[@]}"; do
    echo "    $word: ${word_count[$word]}"
done
echo ""

# 9. Practical example: Configuration storage
echo "9. Configuration storage example:"

declare -A server_config
server_config["hostname"]="web-server-01"
server_config["ip_address"]="192.168.1.100"
server_config["port"]=8080
server_config["max_connections"]=1000
server_config["timeout"]=30

echo "  Server Configuration:"
for key in "${!server_config[@]}"; do
    printf "    %-20s: %s\n" "$key" "${server_config[$key]}"
done
echo ""

# 10. Copying associative arrays
echo "10. Copying associative arrays:"
declare -A student_copy
for key in "${!student[@]}"; do
    student_copy["$key"]="${student[$key]}"
done

echo "  Original student keys: ${!student[@]}"
echo "  Copied student keys: ${!student_copy[@]}"
echo "  Are they equal? $( [[ "${student[*]}" == "${student_copy[*]}" ]] && echo "Yes" || echo "No" )"
echo ""

# 11. Merging associative arrays
echo "11. Merging associative arrays:"
declare -A personal_info
personal_info["phone"]="7003756860"
personal_info["address"]="123 Main Street"

declare -A complete_profile
# Copy student info
for key in "${!student[@]}"; do
    complete_profile["$key"]="${student[$key]}"
done
# Merge with personal info
for key in "${!personal_info[@]}"; do
    complete_profile["$key"]="${personal_info[$key]}"
done

echo "  Complete profile keys: ${!complete_profile[@]}"
echo "  Complete profile values: ${complete_profile[@]}"
echo ""

# 12. Common operations
echo "12. Common operations on associative arrays:"

# Check if array is empty
declare -A empty_array
if [[ ${#empty_array[@]} -eq 0 ]]; then
    echo "  empty_array is empty"
fi

# Get all keys as array
keys_array=("${!student[@]}")
echo "  Keys as array: ${keys_array[@]}"

# Get all values as array
values_array=("${student[@]}")
echo "  Values as array: ${values_array[@]}"
echo ""

# 13. Limitations and workarounds
echo "13. Limitations and workarounds:"
echo "  Limitation 1: Keys with spaces need special handling"
declare -A test_array
test_array["key with spaces"]="value with spaces"
echo "    Key with spaces: ${test_array["key with spaces"]}"
echo ""
echo "  Limitation 2: Cannot store arrays inside associative arrays"
echo "    Workaround: Use serialization (JSON, comma-separated)"
echo ""

echo "=== When to Use Associative Arrays ==="
echo "• Configuration data with named parameters"
echo "• Counting occurrences (word frequencies, stats)"
echo "• Lookup tables (error codes, status messages)"
echo "• Object-like structures (user profiles, settings)"
echo "• When you need to access data by meaningful names, not positions"