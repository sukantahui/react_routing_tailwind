#!/bin/bash
# comm_practical.sh – Set operations (union, intersection, difference)
cat > old_list.txt <<EOF
Alice
Bob
Charlie
David
EOF

cat > new_list.txt <<EOF
Bob
Charlie
Eve
Frank
EOF

# Sort both
sort old_list.txt -o old_sorted.txt
sort new_list.txt -o new_sorted.txt

echo "=== Set operations using comm ==="
echo "Unsubscribed (in old but not new):"
comm -23 old_sorted.txt new_sorted.txt

echo -e "\nNew subscribers (in new but not old):"
comm -13 old_sorted.txt new_sorted.txt

echo -e "\nRemained subscribed (common):"
comm -12 old_sorted.txt new_sorted.txt

# Union (all unique lines) – not directly comm, use sort -u
echo -e "\nUnion (all unique subscribers):"
sort -u old_sorted.txt new_sorted.txt

# Check if old_list is a subset of new_list
echo -e "\nIs old list subset of new list?"
if [ -z "$(comm -23 old_sorted.txt new_sorted.txt)" ]; then
    echo "Yes, all old subscribers are in new list."
else
    echo "No, some old subscribers are missing."
fi

# Cleanup
rm old_list.txt new_list.txt old_sorted.txt new_sorted.txt