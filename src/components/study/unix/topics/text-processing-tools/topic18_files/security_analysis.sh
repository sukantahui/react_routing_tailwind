#!/bin/bash
# Security analysis script

echo "Security Analysis from Logs"
echo "==========================="

# Create web server log with suspicious activity
cat > /tmp/security.log << 'EOF'
192.168.1.1 - - [15/Jan/2024:10:30:45 +0530] "GET /index.html HTTP/1.1" 200 1234
203.0.113.5 - - [15/Jan/2024:10:31:22 +0530] "GET /admin HTTP/1.1" 403 234
192.168.1.1 - - [15/Jan/2024:10:32:15 +0530] "GET /wp-login.php HTTP/1.1" 404 345
198.51.100.23 - - [15/Jan/2024:10:33:01 +0530] "GET /../../../etc/passwd HTTP/1.1" 400 456
192.168.1.1 - - [15/Jan/2024:10:34:18 +0530] "GET /index.html?param=<script>alert(1)</script> HTTP/1.1" 200 1234
203.0.113.5 - - [15/Jan/2024:10:35:42 +0530] "POST /login HTTP/1.1" 401 234
192.168.1.1 - - [15/Jan/2024:10:36:09 +0530] "GET /api/users?admin=1' OR '1'='1 HTTP/1.1" 500 678
203.0.113.5 - - [15/Jan/2024:10:37:33 +0530] "GET /cgi-bin/test.cgi HTTP/1.1" 404 345
192.168.1.1 - - [15/Jan/2024:10:38:56 +0530] "GET /backup.zip HTTP/1.1" 403 456
198.51.100.23 - - [15/Jan/2024:10:39:12 +0530] "GET /phpmyadmin HTTP/1.1" 404 567
192.168.1.105 - - [15/Jan/2024:10:40:45 +0530] "GET /index.html HTTP/1.1" 200 1234
192.168.1.1 - - [15/Jan/2024:10:41:22 +0530] "GET /shell.php?cmd=ls HTTP/1.1" 404 345
EOF

echo "1. Suspicious requests (common attack patterns):"
echo "----------------------------------------------"
echo "Directory traversal attempts:"
grep -E "\.\./|\.\.\\\\" /tmp/security.log
echo -e "\nSQL injection patterns:"
grep -i -E "union.*select|select.*from|' OR '1'='1" /tmp/security.log
echo -e "\nXSS attempts:"
grep -i "<script>" /tmp/security.log
echo -e "\nSensitive file access:"
grep -i -E "(passwd|config|backup|\.zip|\.sql)" /tmp/security.log
echo -e "\nAdmin/login page probes:"
grep -i -E "(admin|login|wp-login|phpmyadmin)" /tmp/security.log

echo -e "\n2. Failed authentication attempts:"
echo "------------------------------------"
grep " 401 \| 403 " /tmp/security.log | awk '{print $1, $7}' | sort | uniq -c | sort -rn

echo -e "\n3. Most active suspicious IPs:"
echo "--------------------------------"
awk '$9 ~ /^[45][0-9]{2}$/ {print $1}' /tmp/security.log | sort | uniq -c | sort -rn | head -5

echo -e "\n4. Request patterns by hour:"
echo "------------------------------"
awk '{print $4}' /tmp/security.log | cut -d: -f1,2 | sort | uniq -c

echo -e "\n5. Blocked requests analysis:"
echo "-------------------------------"
echo "Total requests:" $(wc -l < /tmp/security.log)
blocked=$(grep -c " 403 \| 400 \| 404 " /tmp/security.log)
echo "Blocked/suspicious requests: $blocked"
echo "Block rate: $(( (blocked * 100) / $(wc -l < /tmp/security.log) ))%"

# Create SSH authentication log
cat > /tmp/ssh_auth.log << 'EOF'
Jan 15 10:30:45 server sshd[1234]: Failed password for root from 192.168.1.1 port 22 ssh2
Jan 15 10:31:22 server sshd[1235]: Failed password for admin from 192.168.1.1 port 22 ssh2
Jan 15 10:32:15 server sshd[1236]: Failed password for root from 192.168.1.1 port 22 ssh2
Jan 15 10:33:01 server sshd[1237]: Accepted password for tuhina from 192.168.1.105 port 22 ssh2
Jan 15 10:34:18 server sshd[1238]: Failed password for root from 203.0.113.5 port 22 ssh2
Jan 15 10:35:42 server sshd[1239]: Failed password for ubuntu from 192.168.1.1 port 22 ssh2
Jan 15 10:36:09 server sshd[1240]: Failed password for root from 192.168.1.1 port 22 ssh2
Jan 15 10:37:33 server sshd[1241]: Failed password for admin from 203.0.113.5 port 22 ssh2
Jan 15 10:38:56 server sshd[1242]: PAM 5 more authentication failures; logname= uid=0 euid=0 tty=ssh ruser= rhost=192.168.1.1
Jan 15 10:39:12 server sshd[1243]: Failed password for root from 192.168.1.1 port 22 ssh2
EOF

echo -e "\n6. SSH brute force analysis:"
echo "-----------------------------"
echo "Failed SSH attempts by IP:"
grep "Failed password" /tmp/ssh_auth.log | awk '{print $11}' | sort | uniq -c | sort -rn
echo -e "\nFailed SSH attempts by username:"
grep "Failed password" /tmp/ssh_auth.log | awk -F"for " '{print $2}' | awk '{print $1}' | sort | uniq -c | sort -rn
echo -e "\nIPs with > 3 failed attempts (potential brute force):"
grep "Failed password" /tmp/ssh_auth.log | awk '{print $11}' | sort | uniq -c | awk '$1 > 3'

# Cleanup
rm -f /tmp/security.log /tmp/ssh_auth.log