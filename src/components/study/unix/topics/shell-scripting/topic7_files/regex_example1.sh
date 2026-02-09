#!/bin/bash
# Regex Pattern Matching Examples
# Topic 7: String Manipulation

echo "=== REGEX PATTERN MATCHING EXAMPLES ==="
echo

# Example 1: Simple pattern matching
email="abhronila@shyamnagar-college.edu.in"
echo "Example 1: Validate email format"
echo "Email: $email"

if [[ $email =~ ^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$ ]]; then
    echo "✓ Valid email format"
    
    # Extract domain using BASH_REMATCH
    echo "Domain: ${BASH_REMATCH[0]##*@}"
else
    echo "✗ Invalid email format"
fi
echo

# Example 2: Extract specific patterns
log_line="2024-12-15 14:30:25 [INFO] User 'debangshu' logged in from 192.168.1.50"
echo "Example 2: Parse log entry"
echo "Log line: $log_line"

if [[ $log_line =~ ([0-9]{4}-[0-9]{2}-[0-9]{2})\ ([0-9]{2}:[0-9]{2}:[0-9]{2})\ \[(INFO|WARN|ERROR)\] ]]; then
    echo "✓ Pattern matched"
    echo "Date: ${BASH_REMATCH[1]}"
    echo "Time: ${BASH_REMATCH[2]}"
    echo "Level: ${BASH_REMATCH[3]}"
fi

# Extract username
if [[ $log_line =~ \'([A-Za-z]+)\' ]]; then
    echo "Username: ${BASH_REMATCH[1]}"
fi

# Extract IP address
if [[ $log_line =~ ([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}) ]]; then
    echo "IP Address: ${BASH_REMATCH[1]}"
fi
echo

# Example 3: Phone number validation
phone_numbers=("+91 98765 43210" "9876543210" "033 1234 5678" "12345" "abcd")
echo "Example 3: Phone number validation"

for phone in "${phone_numbers[@]}"; do
    echo -n "Testing '$phone': "
    
    if [[ $phone =~ ^(\+91[[:space:]])?[0-9]{10}$ ]] || \
       [[ $phone =~ ^[0-9]{3}[[:space:]][0-9]{4}[[:space:]][0-9]{4}$ ]]; then
        echo "✓ Valid phone number"
    else
        echo "✗ Invalid phone number"
    fi
done
echo

# Example 4: URL parsing
url="https://www.naihati-college.edu.in:8080/department/cs/index.html"
echo "Example 4: Parse URL components"
echo "URL: $url"

if [[ $url =~ ^(https?)://([^:/]+)(:([0-9]+))?(/.*)$ ]]; then
    echo "Protocol: ${BASH_REMATCH[1]}"
    echo "Domain: ${BASH_REMATCH[2]}"
    echo "Port: ${BASH_REMATCH[4]:-80 (default)}"
    echo "Path: ${BASH_REMATCH[5]}"
fi
echo

# Example 5: File extension check
filename="report_final_v2.pdf"
echo "Example 5: Check file extension"
echo "Filename: $filename"

if [[ $filename =~ \.(pdf|txt|docx?)$ ]]; then
    echo "✓ Supported document format"
    echo "Extension: ${BASH_REMATCH[1]}"
else
    echo "✗ Unsupported file format"
fi