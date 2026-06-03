#!/bin/bash
# selective_multiple.sh - Multiple selective replacements
cat > config.ini <<EOF
[Database]
host=localhost
port=5432
user=admin
password=secret

[Redis]
host=localhost
port=6379
EOF

echo "=== Replace 'localhost' with 'db.example.com' only in [Database] section ==="
sed '/\[Database\]/,/\[/ s/localhost/db.example.com/' config.ini

echo -e "\n=== Replace multiple patterns with different replacements ==="
sed -e '/^host=/ s/localhost/prod-db/' -e '/^port=5432/ s/5432/5433/' config.ini