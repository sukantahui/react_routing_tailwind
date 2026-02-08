#!/bin/bash
# Real-world analysis pipeline

echo "Real-World Analysis: Web Server Logs"
echo "===================================="

# Create realistic Apache access log
cat > /tmp/access.log << 'EOF'
192.168.1.105 - - [15/Jan/2024:10:30:45 +0530] "GET /index.html HTTP/1.1" 200 1234
203.0.113.42 - - [15/Jan/2024:10:31:22 +0530] "GET /about.html HTTP/1.1" 200 5678
192.168.1.105 - - [15/Jan/2024:10:32:15 +0530] "GET /contact.html HTTP/1.1" 200 3456
198.51.100.23 - - [15/Jan/2024:10:33:01 +0530] "GET /products.html HTTP/1.1" 200 4567
192.168.1.105 - - [15/Jan/2024:10:34:18 +0530] "GET /index.html HTTP/1.1" 200 1234
203.0.113.42 - - [15/Jan/2024:10:35:42 +0530] "GET /about.html HTTP/1.1" 404 234
192.168.1.105 - - [15/Jan/2024:10:36:09 +0530] "POST /login HTTP/1.1" 302 2345
198.51.100.23 - - [15/Jan/2024:10:37:33 +0530] "GET /contact.html HTTP/1.1" 200 3456
192.168.1.220 - - [15/Jan/2024:10:38:56 +0530] "GET /products.html HTTP/1.1" 200 4567
203.0.113.42 - - [15/Jan/2024:10:39:12 +0530] "GET /index.html HTTP/1.1" 200 1234
192.168.1.105 - - [15/Jan/2024:10:40:45 +0530] "GET /about.html HTTP/1.1" 200 5678
192.168.1.220 - - [15/Jan/2024:10:41:22 +0530] "GET /contact.html HTTP/1.1" 200 3456
192.168.1.105 - - [15/Jan/2024:10:42:15 +0530] "GET /products.html HTTP/1.1" 500 678
203.0.113.42 - - [15/Jan/2024:10:43:01 +0530] "POST /logout HTTP/1.1" 302 2345
EOF

echo "Analyzing web server access.log..."
echo "=================================="

echo "1. Total requests:"
echo "------------------"
wc -l < /tmp/access.log

echo -e "\n2. Top 5 IP addresses:"
echo "----------------------"
awk '{print $1}' /tmp/access.log | sort | uniq -c | sort -rn | head -5

echo -e "\n3. Most accessed pages:"
echo "-------------------------"
awk '{print $7}' /tmp/access.log | sort | uniq -c | sort -rn | head -5

echo -e "\n4. HTTP status code distribution:"
echo "-----------------------------------"
awk '{print $9}' /tmp/access.log | sort | uniq -c | sort -rn

echo -e "\n5. Requests per hour:"
echo "----------------------"
awk '{print $4}' /tmp/access.log | cut -d: -f1,2 | sort | uniq -c

echo -e "\n6. Error analysis (4xx and 5xx):"
echo "----------------------------------"
awk '$9 ~ /^[45][0-9]{2}$/ {print $7 " - " $9}' /tmp/access.log | sort | uniq -c | sort -rn

echo -e "\n7. Successful requests (2xx):"
echo "-------------------------------"
awk '$9 ~ /^2[0-9]{2}$/ {count++} END {print count}' /tmp/access.log

echo -e "\n8. Busiest hour:"
echo "-----------------"
awk '{print $4}' /tmp/access.log | cut -d: -f1,2 | sort | uniq -c | sort -rn | head -1

# Create error log example
cat > /tmp/error.log << 'EOF'
[Wed Jan 15 10:30:45 2024] [error] [client 192.168.1.105] File does not exist: /var/www/favicon.ico
[Wed Jan 15 10:31:22 2024] [error] [client 203.0.113.42] PHP Warning: Invalid argument
[Wed Jan 15 10:32:15 2024] [error] [client 192.168.1.105] File does not exist: /var/www/robots.txt
[Wed Jan 15 10:33:01 2024] [error] [client 192.168.1.105] PHP Warning: Invalid argument
[Wed Jan 15 10:34:18 2024] [error] [client 198.51.100.23] File does not exist: /var/www/favicon.ico
[Wed Jan 15 10:35:42 2024] [error] [client 192.168.1.105] PHP Warning: Invalid argument
EOF

echo -e "\n9. Error log analysis:"
echo "----------------------"
echo "Top error sources:"
grep -o 'client [0-9.]*' /tmp/error.log | cut -d' ' -f2 | sort | uniq -c | sort -rn
echo -e "\nMost common error messages:"
grep -o '\[error\].*' /tmp/error.log | sed 's/\[error\]//' | sort | uniq -c | sort -rn

# Cleanup
rm -f /tmp/access.log /tmp/error.log