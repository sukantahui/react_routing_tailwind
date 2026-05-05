#!/bin/bash
# uniq_practical.sh - Real-world examples
# 1. Count unique visitors from web log (by IP)
cat > access.log <<EOF
192.168.1.10 GET /index
192.168.1.20 GET /about
192.168.1.10 POST /login
192.168.1.30 GET /index
192.168.1.10 GET /home
EOF

echo "=== Unique IP addresses ==="
cut -d' ' -f1 access.log | sort | uniq

echo -e "\n=== Frequency of each IP ==="
cut -d' ' -f1 access.log | sort | uniq -c | sort -nr

# 2. Find duplicate lines in a file, showing each duplicate once
echo -e "\n=== Duplicate lines in a file (showing once each) ==="
cat > test.txt <<EOF
line1
line2
line1
line3
line2
EOF
sort test.txt | uniq -d

# 3. Remove duplicate lines but keep one copy (standard)
echo -e "\n=== Deduplicated file ==="
sort test.txt | uniq

# 4. Count lines in sorted output without uniq (just wc -l)
echo -e "\n=== Number of unique lines ==="
sort test.txt | uniq | wc -l

# Cleanup
rm access.log test.txt