#!/bin/bash
# flag_extended_regex.sh - Using -E for extended regex (helps with flags)
cat > emails.txt <<EOF
john@example.com
jane@test.org
bob@company.co.uk
EOF

echo "=== Without -E (basic regex, need escaping for + and ?) ==="
sed 's/^[a-z]\+@/user@/' emails.txt

echo -e "\n=== With -E (cleaner) ==="
sed -E 's/^[a-z]+@/user@/' emails.txt