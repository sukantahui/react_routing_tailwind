#!/bin/bash
# Processing CSV with quoted fields containing commas

echo "Processing Quoted CSV Fields"
echo "============================="

awk '
BEGIN {
    # FPAT defines what a field looks like (not what separates them)
    # Pattern: Either non-comma sequence OR quoted string
    FPAT = "([^,]*)|(\"[^\"]*\")"
    print "Number of fields per row:"
    print "-------------------------"
}
{
    # Remove quotes from fields for display
    for (i = 1; i <= NF; i++) {
        # Remove surrounding quotes if present
        gsub(/^"|"$/, "", $i)
    }
    
    printf("Row %2d: %s, %s, %s\n", NR, $1, $2, $3)
}
' << 'EOF'
Name,Address,Age
John Doe,"123 Main St, Apt 4B",25
Jane Smith,"456 Oak Ave, Springfield",30
"Deb, Roy","789 Pine Rd, Kolkata",35
EOF