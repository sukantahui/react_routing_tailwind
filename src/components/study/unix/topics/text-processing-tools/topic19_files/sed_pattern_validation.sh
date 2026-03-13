#!/bin/bash
# Pattern Validation Example
# Validating and cleaning data based on patterns

echo "=== Data Validation with sed ==="
echo "Validating email addresses, phone numbers, and dates"

cat > validate_data.sed << 'EOF'
# Validation and Cleanup Script
# Email validation and formatting
/^[^@]*@[^@]*\.[^@]*$/ {
    s/[[:space:]]*//g
    s/\(.*\)/\L\1/
    s/$/ [VALID_EMAIL]/
}

# Phone number validation (10 digits, various formats)
/[0-9]\{3\}[-. ][0-9]\{3\}[-. ][0-9]\{4\}/ {
    s/[^0-9]//g
    s/\([0-9]\{3\}\)\([0-9]\{3\}\)\([0-9]\{4\}\)/(\1) \2-\3 [VALID_PHONE]/
}

# Date validation and standardization
/[0-9]\{1,2\}[\/.-][0-9]\{1,2\}[\/.-][0-9]\{4\}/ {
    # Convert to YYYY-MM-DD
    s#\([0-9]\{1,2\}\)[\/.-]\([0-9]\{1,2\}\)[\/.-]\([0-9]\{4\}\)#\3-\1-\2#
    s/$/ [VALID_DATE]/
}

# Mark invalid entries
/^[^@]*@[^@]*\.[^@]*$/! {
    /@.*@/ s/$/ [INVALID_EMAIL]/
}

/[0-9]\{3\}[-. ][0-9]\{3\}[-. ][0-9]\{4\}/! {
    /[0-9]\{10,\}/ s/$/ [INVALID_PHONE_FORMAT]/
}
EOF

echo "Sample data for validation:"
cat << 'EOF'
john.doe@example.com
invalid.email@com
555-123-4567
1234567890
01/15/2023
15-01-2023
invalid-date-2023
jane.smith@company.co.in
(555) 987-6543
EOF

echo ""
echo "Validation results:"
sed -f validate_data.sed << 'EOF'
john.doe@example.com
invalid.email@com
555-123-4567
1234567890
01/15/2023
15-01-2023
invalid-date-2023
jane.smith@company.co.in
(555) 987-6543
EOF