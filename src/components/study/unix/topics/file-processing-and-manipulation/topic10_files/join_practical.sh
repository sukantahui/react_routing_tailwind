#!/bin/bash
# join_practical.sh - Real‑world examples
# 1. Enrich sales.csv with product names
cat > sales.csv <<EOF
prod_id,quantity
101,5
102,3
104,2
EOF

cat > products.csv <<EOF
prod_id,name
101,Laptop
102,Mouse
103,Keyboard
EOF

echo "=== Sales report with product names (inner join) ==="
# Remove header, sort, join, add header back
tail -n +2 sales.csv | sort -t',' -k1,1 > sales_nohead_sorted
tail -n +2 products.csv | sort -t',' -k1,1 > products_nohead_sorted
echo "prod_id,quantity,name"
join -t',' -o '1.1,1.2,2.2' sales_nohead_sorted products_nohead_sorted

# 2. Compare two versions of a configuration (find keys only in old config)
cat > config_v1.txt <<EOF
timeout=30
retries=3
debug=false
EOF

cat > config_v2.txt <<EOF
timeout=30
retries=5
cache=true
EOF

# Extract key part only (before '=')
echo -e "\n=== Keys only in v1 (removed) ==="
sed 's/=.*//' config_v1.txt | sort > old_keys
sed 's/=.*//' config_v2.txt | sort > new_keys
comm -23 old_keys new_keys

echo -e "\n=== Keys only in v2 (added) ==="
comm -13 old_keys new_keys

# 3. Merging logs with user info
echo -e "\n=== Merge user info into access log ==="
cat > users.txt <<EOF
1001 Swadeep
1002 Tuhina
EOF

cat > access.log <<EOF
1001 GET /index
1003 POST /login
1002 GET /home
EOF

sort -k1,1 users.txt > users_sorted
sort -k1,1 access.log > access_sorted
join -o '1.2,2.2' users_sorted access_sorted

# Cleanup
rm sales.csv products.csv sales_nohead_sorted products_nohead_sorted config_v1.txt config_v2.txt old_keys new_keys users.txt access.log users_sorted access_sorted