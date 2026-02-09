#!/bin/bash
# Complete Practical Example
# Topic 7: String Manipulation - All operations combined

echo "=== COMPREHENSIVE PRACTICAL EXAMPLE ==="
echo "Scenario: Student Record Processing System"
echo

# Sample student records (simulating a database)
records=(
    "S2023001|Swadeep Kumar|swadeep@college.edu|9876543210|CS101|A+"
    "S2023002|Tuhina Das|tuhina_das@shyamnagar.edu|8765432109|MA202|B"
    "S2023003|Abhronila Sen|abroni.sen@naihati.edu.in|7654321098|PH303|A"
    "S2023004|Debangshu Roy|deban.roy@ichapur.ac.in|9012345678|CS101|A-"
    "S2023055|John Smith|john@test|12345|EE404|C"  # Invalid records
)

echo "Processing ${#records[@]} student records..."
echo

valid_count=0
invalid_count=0

for record in "${records[@]}"; do
    echo "--- Processing Record ---"
    
    # Split record into components
    IFS='|' read -r student_id full_name email phone course grade <<< "$record"
    
    echo "Raw Data:"
    echo "  ID: $student_id"
    echo "  Name: $full_name"
    echo "  Email: $email"
    echo "  Phone: $phone"
    echo "  Course: $course"
    echo "  Grade: $grade"
    
    # ========== STRING VALIDATION & TRANSFORMATION ==========
    
    # 1. Validate Student ID format: S followed by 7 digits
    if [[ ! $student_id =~ ^S[0-9]{7}$ ]]; then
        echo "  ❌ Invalid Student ID format"
        ((invalid_count++))
        continue
    fi
    
    # 2. Extract year from student ID (positions 1-4)
    year="${student_id:1:4}"
    echo "  📅 Admission Year: $year"
    
    # 3. Format name: Convert to "Last, First" format
    if [[ $full_name =~ ^([A-Za-z]+)[[:space:]]([A-Za-z]+)$ ]]; then
        first_name="${BASH_REMATCH[1]}"
        last_name="${BASH_REMATCH[2]}"
        formatted_name="$last_name, $first_name"
        echo "  👤 Formatted Name: $formatted_name"
    else
        echo "  ⚠️  Name format unusual: $full_name"
        formatted_name="$full_name"
    fi
    
    # 4. Validate and extract email domain
    if [[ $email =~ ^[A-Za-z0-9._%+-]+@([A-Za-z0-9.-]+\.[A-Za-z]{2,})$ ]]; then
        domain="${BASH_REMATCH[1]}"
        echo "  📧 Valid email | Domain: $domain"
        
        # Create username from email (part before @)
        username="${email%@*}"
        echo "  👤 Username: $username"
    else
        echo "  ❌ Invalid email format"
        ((invalid_count++))
        continue
    fi
    
    # 5. Standardize phone number format
    # Remove all non-digits
    clean_phone="${phone//[^0-9]/}"
    
    # Check if it's a valid 10-digit number
    if [[ ${#clean_phone} -eq 10 ]]; then
        # Format as +91 XXXXX XXXXX
        formatted_phone="+91 ${clean_phone:0:5} ${clean_phone:5:5}"
        echo "  📱 Formatted Phone: $formatted_phone"
    else
        echo "  ❌ Invalid phone number (must be 10 digits)"
        ((invalid_count++))
        continue
    fi
    
    # 6. Course code validation and expansion
    case $course in
        CS101)
            course_name="Computer Science Fundamentals"
            ;;
        MA202)
            course_name="Advanced Mathematics"
            ;;
        PH303)
            course_name="Modern Physics"
            ;;
        EE404)
            course_name="Electrical Engineering"
            ;;
        *)
            course_name="Unknown Course"
            ;;
    esac
    echo "  📚 Course: $course ($course_name)"
    
    # 7. Grade validation
    valid_grades=("A+" "A" "A-" "B+" "B" "B-" "C+" "C" "C-" "D" "F")
    if [[ " ${valid_grades[*]} " =~ " $grade " ]]; then
        echo "  🎓 Valid Grade: $grade"
        
        # Calculate grade points
        case $grade in
            "A+") points=4.0 ;;
            "A")  points=3.8 ;;
            "A-") points=3.6 ;;
            "B+") points=3.3 ;;
            "B")  points=3.0 ;;
            "B-") points=2.7 ;;
            "C+") points=2.3 ;;
            "C")  points=2.0 ;;
            "C-") points=1.7 ;;
            "D")  points=1.0 ;;
            "F")  points=0.0 ;;
        esac
        echo "  ⭐ Grade Points: $points"
    else
        echo "  ❌ Invalid grade"
        ((invalid_count++))
        continue
    fi
    
    # 8. Generate student summary
    summary="Student: $formatted_name | ID: $student_id | Course: $course_name | Grade: $grade"
    
    # Truncate if too long (max 80 chars)
    if [ ${#summary} -gt 80 ]; then
        summary="${summary:0:77}..."
    fi
    echo "  📋 Summary: $summary"
    
    # 9. Generate filename for student report
    # Remove special characters from name for filename
    safe_name="${formatted_name//[^A-Za-z0-9, ]/_}"
    safe_name="${safe_name//, /_}"
    safe_name="${safe_name// /_}"
    
    filename="report_${student_id}_${safe_name}.txt"
    echo "  💾 Report File: $filename"
    
    ((valid_count++))
    echo
done

# ========== FINAL REPORT ==========
echo "=== PROCESSING COMPLETE ==="
echo
echo "📊 Summary Statistics:"
echo "  Total Records Processed: ${#records[@]}"
echo "  ✅ Valid Records: $valid_count"
echo "  ❌ Invalid Records: $invalid_count"
echo "  📈 Success Rate: $(( (valid_count * 100) / ${#records[@]} ))%"
echo

# Additional analysis
echo "📈 Additional Analysis:"
echo -n "  📅 Students by admission year: "
for year in 2023 2024 2025; do
    count=0
    for record in "${records[@]}"; do
        if [[ $record =~ ^S${year}[0-9]{3} ]]; then
            ((count++))
        fi
    done
    [ $count -gt 0 ] && echo -n "$year: $count | "
done
echo

# Extract all domains from emails
echo -n "  🌐 Email domains found: "
declare -A domains
for record in "${records[@]}"; do
    if [[ $record =~ @([A-Za-z0-9.-]+\.[A-Za-z]{2,}) ]]; then
        domain="${BASH_REMATCH[1]}"
        ((domains[$domain]++))
    fi
done

for domain in "${!domains[@]}"; do
    echo -n "$domain (${domains[$domain]}) | "
done
echo
echo
echo "🎯 This example demonstrates real-world application of:"
echo "   • String length validation"
echo "   • Substring extraction"
echo "   • Pattern replacement"
echo "   • Regular expression matching"
echo "   • Data transformation and formatting"