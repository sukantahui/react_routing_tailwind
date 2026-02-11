#!/bin/bash
# Real-world student database management system
# Used across Barrackpore, Shyamnagar, and Ichapur schools

set -euo pipefail

# Configuration
DB_FILE="${HOME}/.student_db.csv"
BACKUP_DIR="${HOME}/student_backups"

# Ensure database exists
init_db() {
    if [ ! -f "$DB_FILE" ]; then
        echo "id,name,age,department,email,grade,enrollment_date" > "$DB_FILE"
    fi
}

# Backup database
backup_db() {
    local timestamp=$(date '+%Y%m%d_%H%M%S')
    local backup_file="$BACKUP_DIR/backup_$timestamp.csv"
    
    mkdir -p "$BACKUP_DIR"
    cp "$DB_FILE" "$backup_file"
    echo "Backup created: $backup_file"
}

# Add student
add_student() {
    local name age department email grade
    
    # Parse add command options
    while getopts ":n:a:d:e:g:" opt; do
        case $opt in
            n) name="$OPTARG" ;;
            a) age="$OPTARG" ;;
            d) department="$OPTARG" ;;
            e) email="$OPTARG" ;;
            g) grade="$OPTARG" ;;
            ?) echo "Invalid option for add command" >&2; return 1 ;;
            :) echo "Option requires argument" >&2; return 1 ;;
        esac
    done
    shift $((OPTIND - 1))
    
    # Validate
    if [ -z "$name" ] || [ -z "$age" ] || [ -z "$department" ]; then
        echo "Error: Name, age, and department are required" >&2
        return 1
    fi
    
    # Generate ID
    local next_id=1
    if [ -f "$DB_FILE" ] && [ $(wc -l < "$DB_FILE") -gt 1 ]; then
        next_id=$(($(tail -1 "$DB_FILE" | cut -d, -f1) + 1))
    fi
    
    # Defaults
    : ${email:="unknown@school.edu"}
    : ${grade:="N/A"}
    local enrollment_date=$(date '+%Y-%m-%d')
    
    # Add to database
    echo "$next_id,$name,$age,$department,$email,$grade,$enrollment_date" >> "$DB_FILE"
    echo "Added student: $name (ID: $next_id)"
}

# Search students
search_students() {
    local department grade
    
    while getopts ":d:g:" opt; do
        case $opt in
            d) department="$OPTARG" ;;
            g) grade="$OPTARG" ;;
            ?) echo "Invalid option for search command" >&2; return 1 ;;
        esac
    done
    shift $((OPTIND - 1))
    
    echo "Search results:"
    echo "==============="
    
    # Build grep pattern
    local grep_pattern=""
    [ -n "$department" ] && grep_pattern="${grep_pattern}.*$department.*"
    [ -n "$grade" ] && grep_pattern="${grep_pattern}.*$grade.*"
    
    if [ -n "$grep_pattern" ]; then
        grep -i "$grep_pattern" "$DB_FILE" | column -t -s,
    else
        # Show all if no filters
        tail -n +2 "$DB_FILE" | column -t -s,
    fi
}

# Generate report
generate_report() {
    local format="text"
    local output_file="report_$(date '+%Y%m%d').txt"
    
    # Parse report options
    while getopts ":f:o:" opt; do
        case $opt in
            f) format="$OPTARG" ;;
            o) output_file="$OPTARG" ;;
            ?) echo "Invalid option for report command" >&2; return 1 ;;
            :) echo "Option requires argument" >&2; return 1 ;;
        esac
    done
    shift $((OPTIND - 1))
    
    case "$format" in
        text)
            echo "Student Database Report" > "$output_file"
            echo "Generated: $(date)" >> "$output_file"
            echo "======================" >> "$output_file"
            awk -F, 'NR>1 {dept[$4]++; total++} END {
                print "Total students:", total
                print "\nBy department:"
                for (d in dept) printf "  %-20s: %d\n", d, dept[d]
            }' "$DB_FILE" >> "$output_file"
            echo "Text report saved to: $output_file"
            ;;
        csv)
            cp "$DB_FILE" "$output_file"
            echo "CSV report saved to: $output_file"
            ;;
        *)
            echo "Unknown format: $format" >&2
            echo "Available formats: text, csv" >&2
            return 1
            ;;
    esac
}

# Main command dispatcher
main() {
    init_db
    
    if [ $# -eq 0 ]; then
        echo "Usage: $0 COMMAND [OPTIONS]"
        echo "Commands:"
        echo "  add     - Add new student"
        echo "  search  - Search students"
        echo "  report  - Generate report"
        echo "  backup  - Backup database"
        echo "  help    - Show help"
        exit 1
    fi
    
    local command="$1"
    shift
    
    case "$command" in
        add)
            add_student "$@"
            ;;
        search)
            search_students "$@"
            ;;
        report)
            generate_report "$@"
            ;;
        backup)
            backup_db "$@"
            ;;
        help|--help|-h)
            cat << EOF
Student Database Management System
==================================

Commands:
  add     -n NAME -a AGE -d DEPARTMENT [-e EMAIL] [-g GRADE]
  search  [-d DEPARTMENT] [-g GRADE]
  report  [-f FORMAT] [-o OUTPUT_FILE]
  backup

Examples:
  $0 add -n "Tuhina Das" -a 18 -d "Computer Science"
  $0 search -d "Physics" -g A
  $0 report -f csv -o physics_report.csv
EOF
            ;;
        *)
            echo "Unknown command: $command" >&2
            echo "Use: add, search, report, backup, help" >&2
            exit 1
            ;;
    esac
}

# Run main function
main "$@"