#!/bin/bash
# cut_practical_cases.sh - Real-world scenarios
# 1. Extract usernames from /etc/passwd style
cat > passwd.txt <<EOF
root:x:0:0:root:/root:/bin/bash
daemon:x:1:1:daemon:/usr/sbin:/usr/sbin/nologin
Swadeep:x:1001:1001:Swadeep:/home/swadeep:/bin/bash
EOF

echo "=== Usernames (field 1) from passwd ==="
cut -d':' -f1 passwd.txt

# 2. HTTP access log: extract IP and status code
cat > access.log <<EOF
192.168.1.10 - - [01/Jan/2025] "GET /index.html" 200 1024
192.168.1.20 - - [01/Jan/2025] "POST /login" 401 512
EOF

echo -e "\n=== IP and Status from Apache log (space delimiter) ==="
cut -d' ' -f1,9 access.log

# 3. Fixed-width file: extract characters 2-5
cat > fixed.txt <<EOF
ABCDEFGH
12345678
EOF

echo -e "\n=== Fixed-width: characters 2-5 ==="
cut -c2-5 fixed.txt

# Cleanup
rm passwd.txt access.log fixed.txt