#!/bin/bash
# multiple_pipes.sh - Chain grep, sed, sort, uniq
cat > access.log <<EOF
192.168.1.10 - GET /index.html
192.168.1.20 - POST /login
192.168.1.10 - GET /about
192.168.1.30 - GET /index.html
192.168.1.10 - GET /index.html
EOF

echo "=== Unique IPs that requested /index.html, with counter ==="
grep "GET /index.html" access.log | \
    sed 's/ - .*//' | \
    sort | uniq -c