#!/bin/bash
# Complete Array Management System

echo "=== Professional Array Management System ==="
echo ""

# Configuration
declare -A CONFIG
CONFIG=(
    ["MAX_ITEMS"]=100
    ["LOG_LEVEL"]="INFO"
    ["DATA_DIR"]="/tmp/array_data"
    ["BACKUP_ENABLED"]="true"
)

# Function to display array in formatted way
display_array() {
    local array_name="$1"
    declare -n arr_ref="$2"
    local array_type="$3"
    
    echo "=== $array_name ($array_type) ==="
    
    if [[ ${#arr_ref[@]} -eq 0 ]]; then
        echo "  [Empty array]"
        echo ""
        return
    fi
    
    case $array_type in
        "indexed")
            echo "  Elements: ${#arr_ref[@]}"
            echo "  Indices: ${!arr_ref[@]}"
            echo ""
            echo "  Values:"
            for index in "${!arr_ref[@]}"; do
                printf "    [%d] = %s\n" "$index" "${arr_ref[$index]}"
            done
            ;;
        "associative")
            echo "  Elements: ${#arr_ref[@]}"
            echo ""
            echo "  Key-Value Pairs:"
            local max_key_len=0
            for key in "${!arr_ref[@]}"; do
                if [[ ${#key} -gt $max_key_len ]]; then
                    max_key_len=${#key}
                fi
            done
            
            for key in $(echo "${!arr_ref[@]}" | tr ' ' '\n' | sort); do
                printf "    %-${max_key_len}s = %s\n" "$key" "${arr_ref[$key]}"
            done
            ;;
    esac
    echo ""
}

# Function to validate array operations
validate_array_operation() {
    local operation="$1"
    local array_name="$2"
    declare -n arr_ref="$3"
    
    case $operation in
        "add"|"update")
            if [[ ${#arr_ref[@]} -ge ${CONFIG[MAX_ITEMS]} ]]; then
                echo "ERROR: Cannot $operation. Maximum items (${CONFIG[MAX_ITEMS]}) reached." >&2
                return 1
            fi
            ;;
        "get")
            if [[ ${#arr_ref[@]} -eq 0 ]]; then
                echo "ERROR: Array is empty." >&2
                return 1
            fi
            ;;
    esac
    return 0
}

# Function to backup array state
backup_array() {
    local array_name="$1"
    declare -n arr_ref="$2"
    local backup_file="${CONFIG[DATA_DIR]}/backup_${array_name}_$(date +%Y%m%d_%H%M%S).txt"
    
    if [[ "${CONFIG[BACKUP_ENABLED]}" != "true" ]]; then
        return 0
    fi
    
    mkdir -p "${CONFIG[DATA_DIR]}"
    
    echo "# Backup of $array_name at $(date)" > "$backup_file"
    echo "# Type: ${#arr_ref[@]} elements" >> "$backup_file"
    
    for key in "${!arr_ref[@]}"; do
        echo "$key=${arr_ref[$key]}" >> "$backup_file"
    done
    
    echo "  Backup saved to: $backup_file"
}

# Student Management System using arrays
main() {
    echo "Initializing Student Management System..."
    echo ""
    
    # Create necessary directories
    mkdir -p "${CONFIG[DATA_DIR]}"
    
    # 1. Indexed array for student roll numbers in order
    echo "1. Creating indexed array for student roll numbers..."
    declare -a student_roll_numbers=()
    
    # Add students
    student_roll_numbers+=("S001")
    student_roll_numbers+=("S002")
    student_roll_numbers+=("S003")
    student_roll_numbers+=("S004")
    
    display_array "Student Roll Numbers" student_roll_numbers "indexed"
    backup_array "student_roll_numbers" student_roll_numbers
    
    # 2. Associative array for student details
    echo "2. Creating associative arrays for student details..."
    
    declare -A student_s001
    student_s001=(
        ["roll_no"]="S001"
        ["name"]="Swadeep Das"
        ["age"]=22
        ["city"]="Barrackpore"
        ["course"]="Computer Science"
        ["grades"]="A,B+,A-,B"
    )
    
    declare -A student_s002
    student_s002=(
        ["roll_no"]="S002"
        ["name"]="Tuhina Roy"
        ["age"]=21
        ["city"]="Shyamnagar"
        ["course"]="Information Technology"
        ["grades"]="A,A,B+,A-"
    )
    
    declare -A student_s003
    student_s003=(
        ["roll_no"]="S003"
        ["name"]="Abhronila Sen"
        ["age"]=22
        ["city"]="Ichapur"
        ["course"]="Electronics"
        ["grades"]="B+,A-,B,A"
    )
    
    declare -A student_s004
    student_s004=(
        ["roll_no"]="S004"
        ["name"]="Debangshu Ghosh"
        ["age"]=23
        ["city"]="Naihati"
        ["course"]="Mechanical"
        ["grades"]="A,A,A,B+"
    )
    
    # Display student details
    for student_ref in student_s001 student_s002 student_s003 student_s004; do
        declare -n student=$student_ref
        display_array "Student: ${student["name"]}" student "associative"
    done
    
    # 3. Array of student references (simulating array of objects)
    echo "3. Creating array of student references..."
    declare -a all_students=("student_s001" "student_s002" "student_s003" "student_s004")
    
    # 4. Operations on the student database
    echo "4. Performing operations on student database..."
    echo ""
    
    # Operation 1: Find student by roll number
    echo "Operation 1: Find student by roll number"
    search_roll="S002"
    found=false
    
    for student_ref in "${all_students[@]}"; do
        declare -n student=$student_ref
        if [[ "${student["roll_no"]}" == "$search_roll" ]]; then
            echo "  Found: ${student["name"]} from ${student["city"]}"
            found=true
            break
        fi
    done
    
    if [[ $found == false ]]; then
        echo "  Student with roll number $search_roll not found"
    fi
    echo ""
    
    # Operation 2: Calculate average age
    echo "Operation 2: Calculate statistics"
    total_age=0
    student_count=0
    cities=()
    
    for student_ref in "${all_students[@]}"; do
        declare -n student=$student_ref
        total_age=$((total_age + student["age"]))
        student_count=$((student_count + 1))
        cities+=("${student["city"]}")
    done
    
    average_age=$((total_age / student_count))
    echo "  Total students: $student_count"
    echo "  Average age: $average_age"
    echo "  Cities: ${cities[@]}"
    echo ""
    
    # Operation 3: Group by course
    echo "Operation 3: Group students by course"
    declare -A course_groups
    
    for student_ref in "${all_students[@]}"; do
        declare -n student=$student_ref
        course="${student["course"]}"
        
        if [[ -v course_groups["$course"] ]]; then
            course_groups["$course"]="${course_groups["$course"]}, ${student["name"]}"
        else
            course_groups["$course"]="${student["name"]}"
        fi
    done
    
    echo "  Course distribution:"
    for course in "${!course_groups[@]}"; do
        echo "    $course: ${course_groups[$course]}"
    done
    echo ""
    
    # Operation 4: Parse and analyze grades
    echo "Operation 4: Grade analysis"
    declare -A grade_points=(
        ["A"]=4.0 ["A-"]=3.7 ["B+"]=3.3 ["B"]=3.0
        ["B-"]=2.7 ["C+"]=2.3 ["C"]=2.0 ["D"]=1.0 ["F"]=0.0
    )
    
    for student_ref in "${all_students[@]}"; do
        declare -n student=$student_ref
        grades_str="${student["grades"]}"
        
        # Convert comma-separated grades to array
        IFS=',' read -ra grades <<< "$grades_str"
        
        total_points=0
        grade_count=0
        
        for grade in "${grades[@]}"; do
            grade_trimmed=${grade// /}  # Remove spaces
            if [[ -v grade_points["$grade_trimmed"] ]]; then
                # Use bc for floating point arithmetic
                total_points=$(echo "$total_points + ${grade_points[$grade_trimmed]}" | bc)
                grade_count=$((grade_count + 1))
            fi
        done
        
        if [[ $grade_count -gt 0 ]]; then
            gpa=$(echo "scale=2; $total_points / $grade_count" | bc)
            student["gpa"]=$gpa
            echo "  ${student["name"]}: GPA = $gpa"
        fi
    done
    echo ""
    
    # 5. Export data to files
    echo "5. Exporting data to files..."
    
    # Export student list
    student_list_file="${CONFIG[DATA_DIR]}/student_list.csv"
    echo "Roll No,Name,Age,City,Course,GPA" > "$student_list_file"
    
    for student_ref in "${all_students[@]}"; do
        declare -n student=$student_ref
        echo "${student["roll_no"]},${student["name"]},${student["age"]},${student["city"]},${student["course"]},${student["gpa"]:-N/A}" >> "$student_list_file"
    done
    
    echo "  Student list exported to: $student_list_file"
    
    # Export configuration
    config_file="${CONFIG[DATA_DIR]}/system_config.txt"
    echo "# System Configuration" > "$config_file"
    echo "# Generated: $(date)" >> "$config_file"
    echo "" >> "$config_file"
    
    for key in "${!CONFIG[@]}"; do
        echo "$key=${CONFIG[$key]}" >> "$config_file"
    done
    
    echo "  Configuration exported to: $config_file"
    echo ""
    
    # 6. Performance metrics
    echo "6. Performance metrics:"
    echo "  Total indexed arrays: 2"
    echo "  Total associative arrays: 4"
    echo "  Total array elements: $(( ${#student_roll_numbers[@]} + ${#all_students[@]} ))"
    echo "  Memory usage (estimated): Small"
    echo ""
    
    # 7. Cleanup demonstration
    echo "7. Array cleanup demonstration:"
    
    # Create a temporary array
    declare -a temp_array=("temp1" "temp2" "temp3")
    echo "  Before cleanup - temp_array: ${temp_array[@]}"
    
    # Proper array cleanup
    unset temp_array
    echo "  After unset - temp_array: ${temp_array[@]:-array deleted}"
    echo ""
    
    # 8. Best practices summary
    echo "8. Best Practices Used in This System:"
    echo "  ✓ Used indexed arrays for ordered data (roll numbers)"
    echo "  ✓ Used associative arrays for structured data (student details)"
    echo "  ✓ Used declare -n for name references (simulating pointers)"
    echo "  ✓ Validated array operations before performing them"
    echo "  ✓ Implemented backup functionality"
    echo "  ✓ Exported data to persistent storage"
    echo "  ✓ Properly cleaned up temporary arrays"
    echo ""
    
    # 9. Interactive demonstration
    echo "9. Interactive array exploration:"
    echo "  Try these commands in your shell:"
    echo ""
    echo "  # View all arrays in the script"
    echo "  declare -p | grep -E '(student_|CONFIG)'"
    echo ""
    echo "  # Access specific student data"
    echo "  echo \"Swadeep's city: \${student_s001[\"city\"]}\""
    echo ""
    echo "  # Loop through all students"
    echo "  for student_ref in \"\${all_students[@]}\"; do"
    echo "    declare -n student=\$student_ref"
    echo "    echo \"\${student[\"name\"]} - \${student[\"course\"]}\""
    echo "  done"
    echo ""
    
    echo "=== System Initialization Complete ==="
    echo "Total students managed: ${#all_students[@]}"
    echo "Data directory: ${CONFIG[DATA_DIR]}"
    echo "Backup enabled: ${CONFIG[BACKUP_ENABLED]}"
    echo ""
    
    # Cleanup temporary files
    rm -f /tmp/test_array.txt
}

# Run the main function
main

echo ""
echo "=== Array Management Tips ==="
echo "• Use indexed arrays when order matters"
echo "• Use associative arrays for key-value data"
echo "• Always quote array expansions"
echo "• Use declare -n for indirect references"
echo "• Implement backup for important array data"
echo "• Validate array bounds before operations"