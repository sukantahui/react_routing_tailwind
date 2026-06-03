#!/bin/bash
# log_anonymize.sh - Anonymize IP addresses and emails in logs
cat > access.log <<EOF
192.168.1.10 - john@example.com - GET /api
10.0.0.5 - jane@test.org - POST /login
172.16.0.1 - admin@company.co.uk - GET /admin
EOF

echo "=== Original log ==="
cat access.log

echo -e "\n=== Anonymize IPs (replace last octet with 0) ==="
sed -E 's/([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)[0-9]{1,3}/\10/' access.log

echo -e "\n=== Anonymize emails (replace username with 'user') ==="
sed -E 's/[a-zA-Z0-9._%+-]+@([a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/user@\1/' access.log

echo -e "\n=== Combined anonymization ==="
sed -E 's/([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)[0-9]{1,3}/\10/; s/[a-zA-Z0-9._%+-]+@([a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/user@\1/' access.log

# Cleanup
rm access.log