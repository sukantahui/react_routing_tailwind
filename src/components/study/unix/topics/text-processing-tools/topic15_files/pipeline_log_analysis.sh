#!/bin/bash
# Real-world log analysis pipeline

echo "Apache Access Log Analysis"
echo "==========================="

# Analyze sample Apache access logs to find top 10 IP addresses
cat << 'EOF' | \
awk '{print $1}' | \
sort | \
uniq -c | \
sort -rn | \
head -10
192.168.1.1 - - [15/Jan/2024:10:30:45 +0530] "GET /index.html HTTP/1.1" 200 1234
203.0.113.5 - - [15/Jan/2024:10:31:22 +0530] "GET /about.html HTTP/1.1" 200 5678
192.168.1.1 - - [15/Jan/2024:10:32:15 +0530] "POST /login HTTP/1.1" 302 2345
198.51.100.23 - - [15/Jan/2024:10:33:01 +0530] "GET /contact.html HTTP/1.1" 200 3456
192.168.1.1 - - [15/Jan/2024:10:34:18 +0530] "GET /products.html HTTP/1.1" 200 4567
203.0.113.5 - - [15/Jan/2024:10:35:42 +0530] "GET /index.html HTTP/1.1" 200 1234
192.168.1.1 - - [15/Jan/2024:10:36:09 +0530] "GET /about.html HTTP/1.1" 200 5678
203.0.113.5 - - [15/Jan/2024:10:37:33 +0530] "GET /contact.html HTTP/1.1" 200 3456
192.168.1.1 - - [15/Jan/2024:10:38:56 +0530] "POST /logout HTTP/1.1" 302 2345
198.51.100.23 - - [15/Jan/2024:10:39:12 +0530] "GET /products.html HTTP/1.1" 200 4567
203.0.113.5 - - [15/Jan/2024:10:40:45 +0530] "GET /index.html HTTP/1.1" 200 1234
192.168.1.1 - - [15/Jan/2024:10:41:22 +0530] "GET /about.html HTTP/1.1" 200 5678
198.51.100.23 - - [15/Jan/2024:10:42:15 +0530] "GET /contact.html HTTP/1.1" 200 3456
EOF

echo -e "\nThis pipeline:"
echo "1. Extracts IP addresses (first column)"
echo "2. Sorts them alphabetically"
echo "3. Counts unique occurrences"
echo "4. Sorts by frequency (highest first)"
echo "5. Shows top 10 results"