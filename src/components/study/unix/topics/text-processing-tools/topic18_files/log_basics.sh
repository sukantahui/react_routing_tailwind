#!/bin/bash
# Basic log analysis examples

echo "Basic Log Analysis with grep and awk"
echo "===================================="

# Create sample Apache access log
cat > /tmp/access.log << 'EOF'
192.168.1.1 - - [15/Jan/2024:10:30:45 +0530] "GET /index.html HTTP/1.1" 200 1234
203.0.113.5 - - [15/Jan/2024:10:31:22 +0530] "GET /about.html HTTP/1.1" 404 234
192.168.1.1 - - [15/Jan/2024:10:32:15 +0530] "POST /login HTTP/1.1" 302 2345
198.51.100.23 - - [15/Jan/2024:10:33:01 +0530] "GET /products.html HTTP/1.1" 200 4567
192.168.1.1 - - [15/Jan/2024:10:34:18 +0530] "GET /admin.php HTTP/1.1" 403 345
203.0.113.5 - - [15/Jan/2024:10:35:42 +0530] "GET /index.html HTTP/1.1" 200 1234
192.168.1.1 - - [15/Jan/2024:10:36:09 +0530] "GET /contact.html HTTP/1.1" 200 3456
203.0.113.5 - - [15/Jan/2024:10:37:33 +0530] "GET /api/data HTTP/1.1" 500 678
192.168.1.1 - - [15/Jan/2024:10:38:56 +0530] "POST /logout HTTP/1.1" 302 2345
198.51.100.23 - - [15/Jan/2024:10:39:12 +0530] "GET /products.html HTTP/1.1" 200 4567
EOF

echo "1. Count total requests:"
echo "------------------------"
wc -l /tmp/access.log

echo -e "\n2. Extract all IP addresses:"
echo "-----------------------------"
awk '{print $1}' /tmp/access.log

echo -e "\n3. Find all errors (4xx and 5xx):"
echo "-----------------------------------"
awk '$9 ~ /^[45][0-9]{2}$/ {print $0}' /tmp/access.log

echo -e "\n4. Count requests per IP:"
echo "---------------------------"
awk '{print $1}' /tmp/access.log | sort | uniq -c | sort -rn

echo -e "\n5. List unique HTTP status codes:"
echo "-----------------------------------"
awk '{print $9}' /tmp/access.log | sort | uniq -c

echo -e "\n6. Find requests to specific paths:"
echo "-------------------------------------"
grep -E "(admin|api)" /tmp/access.log

echo -e "\n7. Extract timestamps and IPs of errors:"
echo "------------------------------------------"
awk '$9 ~ /^[45][0-9]{2}$/ {print $4, $1}' /tmp/access.log

echo -e "\n8. Calculate total bytes transferred:"
echo "---------------------------------------"
awk '{sum += $10} END {print "Total bytes:", sum}' /tmp/access.log

# Create sample error log
cat > /tmp/error.log << 'EOF'
[Wed Jan 15 10:30:45 2024] [error] [client 192.168.1.1] File does not exist: /var/www/favicon.ico
[Wed Jan 15 10:31:22 2024] [error] [client 203.0.113.5] PHP Warning: Invalid argument supplied for foreach()
[Wed Jan 15 10:32:15 2024] [error] [client 192.168.1.1] File does not exist: /var/www/robots.txt
[Wed Jan 15 10:33:01 2024] [error] [client 192.168.1.1] PHP Fatal error: Call to undefined function mysql_connect()
[Wed Jan 15 10:34:18 2024] [error] [client 198.51.100.23] File does not exist: /var/www/favicon.ico
EOF

echo -e "\n9. Analyze error log:"
echo "----------------------"
echo "Error types:"
grep -o '\[error\].*' /tmp/error.log | cut -d']' -f2- | sort | uniq -c

# Cleanup
rm -f /tmp/access.log /tmp/error.log