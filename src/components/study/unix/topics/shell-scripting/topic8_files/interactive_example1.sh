#!/bin/bash
# Interactive Menu System
# Topic 8: Reading User Input

echo "=== STUDENT MANAGEMENT SYSTEM ==="
echo "Location: Shyamnagar College"
echo

# Function to display menu
show_menu() {
    echo "========================================"
    echo "            MAIN MENU"
    echo "========================================"
    echo "1. Add New Student"
    echo "2. View Student Records"
    echo "3. Calculate Grades"
    echo "4. Search Student"
    echo "5. Backup Data"
    echo "6. Exit"
    echo "========================================"
}

# Function to add student
add_student() {
    echo
    echo "=== ADD NEW STUDENT ==="
    
    # Read student details
    read -p "Enter student ID (e.g., S2024001): " student_id
    read -p "Enter full name: " student_name
    read -p "Enter class: " student_class
    read -p "Enter phone number: " phone
    
    # Validate email
    while true; do
        read -p "Enter email: " email
        if [[ "$email" =~ ^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$ ]]; then
            break
        else
            echo "Invalid email format. Please try again."
        fi
    done
    
    # Read marks
    echo "Enter marks (0-100):"
    read -p "  Mathematics: " math
    read -p "  Science: " science
    read -p "  English: " english
    
    # Save to file
    record="$student_id|$student_name|$student_class|$phone|$email|$math|$science|$english"
    echo "$record" >> students.txt
    
    echo
    echo "✓ Student added successfully!"
    echo "Record saved to students.txt"
    
    # Ask if user wants to add another
    read -n 1 -p "Add another student? (y/n): " another
    echo
    if [[ "$another" =~ ^[Yy]$ ]]; then
        add_student
    fi
}

# Function to view records
view_records() {
    echo
    echo "=== STUDENT RECORDS ==="
    
    if [ ! -f "students.txt" ] || [ ! -s "students.txt" ]; then
        echo "No student records found."
        return
    fi
    
    echo "Total records: $(wc -l < students.txt)"
    echo
    
    # Ask for display mode
    echo "Display options:"
    echo "1. View all records"
    echo "2. View with pagination (10 per page)"
    echo "3. Search and view specific"
    read -n 1 -p "Choose option (1-3): " view_option
    echo
    
    case $view_option in
        1)
            # View all
            echo "=================================================================================================="
            printf "%-10s %-20s %-10s %-15s %-25s %-5s %-5s %-5s\n" \
                   "ID" "Name" "Class" "Phone" "Email" "M" "S" "E"
            echo "=================================================================================================="
            while IFS='|' read -r id name class phone email math science english; do
                printf "%-10s %-20s %-10s %-15s %-25s %-5s %-5s %-5s\n" \
                       "$id" "$name" "$class" "$phone" "$email" "$math" "$science" "$english"
            done < students.txt
            ;;
        2)
            # Paginated view
            page=1
            lines_per_page=10
            total_lines=$(wc -l < students.txt)
            total_pages=$(( (total_lines + lines_per_page - 1) / lines_per_page ))
            
            while true; do
                echo "=== Page $page of $total_pages ==="
                echo "=================================================================================================="
                printf "%-10s %-20s %-10s %-15s %-25s %-5s %-5s %-5s\n" \
                       "ID" "Name" "Class" "Phone" "Email" "M" "S" "E"
                echo "=================================================================================================="
                
                # Calculate which lines to show
                start_line=$(( (page - 1) * lines_per_page + 1 ))
                end_line=$(( page * lines_per_page ))
                
                # Display the page
                sed -n "${start_line},${end_line}p" students.txt | \
                while IFS='|' read -r id name class phone email math science english; do
                    printf "%-10s %-20s %-10s %-15s %-25s %-5s %-5s %-5s\n" \
                           "$id" "$name" "$class" "$phone" "$email" "$math" "$science" "$english"
                done
                
                echo
                echo "Navigation: n=next, p=previous, q=quit"
                read -n 1 -p "Command: " nav_cmd
                echo
                
                case $nav_cmd in
                    n|N)
                        if [ $page -lt $total_pages ]; then
                            ((page++))
                        else
                            echo "Already on last page"
                        fi
                        ;;
                    p|P)
                        if [ $page -gt 1 ]; then
                            ((page--))
                        else
                            echo "Already on first page"
                        fi
                        ;;
                    q|Q)
                        break
                        ;;
                    *)
                        echo "Invalid command"
                        ;;
                esac
            done
            ;;
        3)
            # Search view
            read -p "Enter search term (name or ID): " search_term
            echo
            echo "Search results for '$search_term':"
            echo "=================================================================================================="
            grep -i "$search_term" students.txt | \
            while IFS='|' read -r id name class phone email math science english; do
                printf "%-10s %-20s %-10s %-15s %-25s %-5s %-5s %-5s\n" \
                       "$id" "$name" "$class" "$phone" "$email" "$math" "$science" "$english"
            done
            ;;
        *)
            echo "Invalid option"
            ;;
    esac
}

# Function to calculate statistics
calculate_stats() {
    echo
    echo "=== GRADE STATISTICS ==="
    
    if [ ! -f "students.txt" ]; then
        echo "No data available"
        return
    fi
    
    # Initialize counters
    total_students=0
    math_sum=0
    science_sum=0
    english_sum=0
    pass_count=0
    
    # Process each student
    while IFS='|' read -r id name class phone email math science english; do
        ((total_students++))
        math_sum=$((math_sum + math))
        science_sum=$((science_sum + science))
        english_sum=$((english_sum + english))
        
        # Check if passed all subjects (40+)
        if [ $math -ge 40 ] && [ $science -ge 40 ] && [ $english -ge 40 ]; then
            ((pass_count++))
        fi
    done < students.txt
    
    if [ $total_students -eq 0 ]; then
        echo "No students in database"
        return
    fi
    
    # Calculate averages
    math_avg=$((math_sum / total_students))
    science_avg=$((science_sum / total_students))
    english_avg=$((english_sum / total_students))
    pass_percentage=$((pass_count * 100 / total_students))
    
    # Display statistics
    echo "Total Students: $total_students"
    echo "Average Scores:"
    echo "  Mathematics: $math_avg"
    echo "  Science: $science_avg"
    echo "  English: $english_avg"
    echo
    echo "Pass Rate: $pass_count/$total_students ($pass_percentage%)"
    echo
    
    # Find top student
    echo "=== TOP PERFORMERS ==="
    echo "Finding student with highest average..."
    
    highest_avg=0
    top_student=""
    
    while IFS='|' read -r id name class phone email math science english; do
        avg=$(( (math + science + english) / 3 ))
        if [ $avg -gt $highest_avg ]; then
            highest_avg=$avg
            top_student="$name (ID: $id)"
        fi
    done < students.txt
    
    echo "Top Student: $top_student"
    echo "Average Score: $highest_avg"
}

# Function to search student
search_student() {
    echo
    echo "=== SEARCH STUDENT ==="
    
    read -p "Enter search term (name, ID, or class): " search_term
    
    # Search in file
    results=$(grep -i "$search_term" students.txt 2>/dev/null)
    
    if [ -z "$results" ]; then
        echo "No students found matching '$search_term'"
        return
    fi
    
    echo
    echo "Found $(echo "$results" | wc -l) student(s):"
    echo "=================================================================================================="
    
    echo "$results" | while IFS='|' read -r id name class phone email math science english; do
        avg=$(( (math + science + english) / 3 ))
        grade=""
        if [ $avg -ge 80 ]; then
            grade="A"
        elif [ $avg -ge 60 ]; then
            grade="B"
        elif [ $avg -ge 40 ]; then
            grade="C"
        else
            grade="F"
        fi
        
        printf "%-10s %-20s %-10s %-15s %-25s AVG: %-3d GRADE: %s\n" \
               "$id" "$name" "$class" "$phone" "$email" "$avg" "$grade"
    done
}

# Function to backup data
backup_data() {
    echo
    echo "=== DATA BACKUP ==="
    
    timestamp=$(date +%Y%m%d_%H%M%S)
    backup_dir="backups"
    
    # Create backup directory if it doesn't exist
    if [ ! -d "$backup_dir" ]; then
        mkdir -p "$backup_dir"
    fi
    
    # Create backup
    backup_file="$backup_dir/students_backup_$timestamp.txt"
    cp students.txt "$backup_file"
    
    if [ $? -eq 0 ]; then
        echo "✓ Backup created successfully: $backup_file"
        echo "Backup size: $(wc -l < "$backup_file") records"
        
        # List recent backups
        echo
        echo "Recent backups:"
        ls -lt "$backup_dir"/*.txt 2>/dev/null | head -5
    else
        echo "✗ Backup failed!"
    fi
}

# Main program loop
while true; do
    show_menu
    echo
    read -n 1 -p "Enter your choice (1-6): " choice
    echo
    echo
    
    case $choice in
        1)
            add_student
            ;;
        2)
            view_records
            ;;
        3)
            calculate_stats
            ;;
        4)
            search_student
            ;;
        5)
            backup_data
            ;;
        6)
            echo "Exiting Student Management System..."
            echo "Goodbye!"
            exit 0
            ;;
        *)
            echo "Invalid choice. Please enter a number between 1 and 6."
            ;;
    esac
    
    # Pause before showing menu again
    echo
    read -n 1 -p "Press any key to continue to main menu..."
    echo
    echo
done