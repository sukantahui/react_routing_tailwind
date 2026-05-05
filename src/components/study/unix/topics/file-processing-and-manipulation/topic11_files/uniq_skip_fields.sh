#!/bin/bash
# uniq_skip_fields.sh - Skip fields with -f
cat > employees.txt <<EOF
101 Alice Developer
102 Bob Manager
101 Alice Lead
103 Charlie Tester
EOF

echo "=== Compare only after skipping first field (ID) ==="
echo "If IDs differ but names match, they are still considered different because IDs are part of comparison."
echo "Default uniq (whole line):"
sort employees.txt | uniq

echo -e "\n=== uniq -f1 (ignore first field, compare from field2 onward) ==="
sort employees.txt | uniq -f1

# Note: -f1 skips first whitespace-separated field.
# Cleanup
rm employees.txt