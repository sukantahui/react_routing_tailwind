#!/bin/bash
# practical_log_analysis.sh - Real-world log analysis pipeline
cat > server.log <<EOF
2025-01-15 10:00:01 192.168.1.10 GET /index.html 200
2025-01-15 10:00:05 192.168.1.20 POST /login 401
2025-01-15 10:01:00 192.168.1.10 GET /about 200
2025-01-15 10:02:30 192.168.1.30 GET /index.html 404
2025-01-15 10:03:00 192.168.1.20 GET /home 200
2025-01-15 10:05:00 192.168.1.10 POST /submit 500
2025-01-15 10:06:00 192.168.1.40 GET /index.html 200
2025-01-15 10:07:00 192.168.1.20 GET /admin 403
2025-01-15 10:08:00 192.168.1.10 POST /logout 200
2025-01-15 10:10:00 192.168.1.30 GET /index.html 200
EOF

echo "=== Show last 5 log entries ==="
tail -5 server.log

echo -e "\n=== Extract only IP addresses and status codes (last 5 entries) ==="
tail -5 server.log | cut -d' ' -f3,7

echo -e "\n=== Count of 404 errors in last 10 lines ==="
tail -10 server.log | grep "404" | wc -l

# Simulate live monitoring (won't run in script, just demo)
echo -e "\n=== Live monitoring command (press Ctrl+C): ==="
echo "tail -f server.log | cut -d' ' -f3,7 --output-delimiter=' -> '"

# Cleanup
rm server.log