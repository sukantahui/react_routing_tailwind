#!/bin/bash
# Advanced CSV processing with validation and error handling

echo "Robust CSV Processing with Validation"
echo "====================================="

awk '
BEGIN {
    FS = ","
    OFS = "|"  # Convert to pipe-separated output
    
    # Counters
    valid_records = 0
    invalid_records = 0
    warnings = 0
    
    print "Processing log file..."
    print "======================"
}
NR == 1 {
    # Store header
    header = $0
    gsub(/,/, OFS, header)  # Convert header to output format
    print "HEADER: " header
    print "-------" 
    next
}
{
    # Skip empty lines
    if (NF == 0 || $0 ~ /^[[:space:]]*$/) {
        print "WARNING: Empty line at row " NR " - Skipping"
        warnings++
        next
    }
    
    # Validate field count (expected 4 fields)
    if (NF != 4) {
        print "ERROR: Row " NR " has " NF " fields (expected 4)"
        invalid_records++
        next
    }
    
    # Clean and validate each field
    errors = ""
    
    # Field 1: Username (non-empty)
    gsub(/^[ \t]+|[ \t]+$/, "", $1)
    if ($1 == "") {
        errors = errors "Empty username; "
    }
    
    # Field 2: Email (basic validation)
    gsub(/^[ \t]+|[ \t]+$/, "", $2)
    if ($2 !~ /@/) {
        errors = errors "Invalid email; "
    }
    
    # Field 3: Age (numeric, 1-120)
    gsub(/^[ \t]+|[ \t]+$/, "", $3)
    if ($3 !~ /^[0-9]+$/) {
        errors = errors "Age not numeric; "
    } else if ($3 < 1 || $3 > 120) {
        errors = errors "Age out of range; "
    }
    
    # Field 4: Score (numeric, 0-100)
    gsub(/^[ \t]+|[ \t]+$/, "", $4)
    if ($4 !~ /^[0-9]+(\.[0-9]+)?$/) {
        errors = errors "Score not numeric; "
    } else if ($4 < 0 || $4 > 100) {
        errors = errors "Score out of range; "
    }
    
    if (errors != "") {
        print "ERROR: Row " NR " - " errors
        invalid_records++
    } else {
        # All valid - output in pipe-separated format
        print $1, $2, $3, $4
        valid_records++
    }
}
END {
    print "\nProcessing Complete:"
    print "===================="
    printf("Valid records:     %d\n", valid_records)
    printf("Invalid records:   %d\n", invalid_records)
    printf("Warnings:          %d\n", warnings)
    printf("Success rate:      %.1f%%\n", 
           (valid_records/(valid_records+invalid_records))*100)
}
' << 'EOF'
Username,Email,Age,Score
tuhina_das,tuhina@school.edu,17,85.5
swadeep_roy,swadeep@school.edu,16,92.0
abhronila,abhronila@college.edu,18,78.5
deb_roy,deb@work.com,35,65.0
priya,priya@gmail.com,,88.0  # Missing age
rohit,rohit@yahoo.com,25,105 # Invalid score
,empty@test.com,30,75.0      # Empty username
sam,sam@test,28,82.5         # Invalid email
EOF