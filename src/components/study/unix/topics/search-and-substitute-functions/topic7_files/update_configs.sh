#!/bin/bash
# update_configs.sh - Update database host in multiple .env files
mkdir -p configs
echo "DB_HOST=localhost" > configs/app1.env
echo "DB_HOST=localhost" > configs/app2.env
echo "DB_HOST=localhost" > configs/app3.env

echo "=== Before update ==="
cat configs/*.env

echo -e "\n=== Updating DB_HOST from localhost to db.prod.example.com ==="
sed -i 's/DB_HOST=localhost/DB_HOST=db.prod.example.com/' configs/*.env

echo -e "\n=== After update ==="
cat configs/*.env

# Cleanup
rm -rf configs