#!/bin/bash
# Topic 25: CSV Validation Script
# Checks for data quality issues

INPUT_FILE="${1:-students_cleaned.csv}"
VALIDATION_LOG="validation_report.txt"
ERROR_FILE="invalid_records.csv"

echo "Starting CSV validation..."
echo "Input file: $INPUT_FILE"
echo ""

# Initialize counters
total_records=0
valid_records=0
invalid_records=0

# Clear output files
> "$VALIDATION_LOG"
> "$ERROR_FILE"

echo "=== VALIDATION CHECKS ===" > "$VALIDATION_LOG"
echo "Timestamp: $(date)" >> "$VALIDATION_LOG"
echo "" >> "$VALIDATION_LOG"

# Process CSV (skip header)
tail -n +2 "$INPUT_FILE" | while IFS= read -r line; do
    ((total_records++))
    error=""
    
    # Parse fields
    IFS=',' read -r -a fields <<< "$line"
    
    # Check 1: ID should be numeric
    if [[ ! "${fields[0]}" =~ ^[0-9]+$ ]]; then
        error+="Invalid ID: ${fields[0]}; "
    fi
    
    # Check 2: Name should not be empty
    if [[ -z "${fields[1]}" || "${fields[1]}" == "\"\"" ]]; then
        error+="Empty name; "
    fi
    
    # Check 3: Date validation (accepts multiple formats)
    date_str=$(echo "${fields[2]}" | tr -d '"')
    if ! date -d "$date_str" "+%Y-%m-%d" > /dev/null 2>&1; then
        error+="Invalid date: $date_str; "
    fi
    
    # Check 4: Marks should be between 0 and 100 (if present)
    if [[ -n "${fields[4]}" && "${fields[4]}" != "\"\"" ]]; then
        marks=$(echo "${fields[4]}" | tr -d '"')
        if [[ ! "$marks" =~ ^[0-9]+$ ]] || (( marks < 0 || marks > 100 )); then
            error+="Invalid marks: $marks; "
        fi
    fi
    
    # Check 5: Grade should be A, B, C, or empty
    if [[ -n "${fields[5]}" && "${fields[5]}" != "\"\"" ]]; then
        grade=$(echo "${fields[5]}" | tr -d '"')
        if [[ ! "$grade" =~ ^[ABC]$ ]]; then
            error+="Invalid grade: $grade; "
        fi
    fi
    
    # Record result
    if [[ -z "$error" ]]; then
        ((valid_records++))
    else
        ((invalid_records++))
        echo "$line" >> "$ERROR_FILE"
        echo "Record $total_records: $error" >> "$VALIDATION_LOG"
    fi
done

# Add summary to log
echo "" >> "$VALIDATION_LOG"
echo "=== VALIDATION SUMMARY ===" >> "$VALIDATION_LOG"
echo "Total records processed: $total_records" >> "$VALIDATION_LOG"
echo "Valid records: $valid_records ($((valid_records * 100 / total_records))%)" >> "$VALIDATION_LOG"
echo "Invalid records: $invalid_records ($((invalid_records * 100 / total_records))%)" >> "$VALIDATION_LOG"
echo "Error records saved to: $ERROR_FILE" >> "$VALIDATION_LOG"

# Display summary
cat "$VALIDATION_LOG" | tail -10
echo ""
echo "Full report: $VALIDATION_LOG"