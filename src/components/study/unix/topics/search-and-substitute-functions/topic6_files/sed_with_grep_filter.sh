#!/bin/bash
# sed_with_grep_filter.sh - Using sed with pattern address (alternative to grep|sed)
cat > data.txt <<EOF
apple 10
banana 20
apple 30
cherry 40
EOF

echo "=== Using grep | sed (two processes) ==="
grep "apple" data.txt | sed 's/10/100/'

echo -e "\n=== Using sed alone (one process) ==="
sed '/apple/ s/10/100/' data.txt

echo -e "\nWhen to prefer which? For simple filtering, sed address is enough."