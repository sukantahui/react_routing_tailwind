#!/bin/bash
# Process substitution examples

echo "Process Substitution: <() and >()"
echo "================================="

# Create test files
mkdir -p /tmp/psub_test
cd /tmp/psub_test

cat > file1.txt << EOF
apple
orange
banana
grape
EOF

cat > file2.txt << EOF
banana
grape
kiwi
mango
EOF

echo "1. Compare sorted output of two commands:"
echo "-----------------------------------------"
echo "File1:" && cat file1.txt
echo -e "\nFile2:" && cat file2.txt
echo -e "\nCommon lines (intersection):"
comm -12 <(sort file1.txt) <(sort file2.txt)

echo -e "\n2. Feed command output as file input:"
echo "----------------------------------------"
echo "Using wc on sorted version of file:"
wc -l <(sort file1.txt)
echo "Note: wc sees it as a file!"

echo -e "\n3. Multiple process substitutions:"
echo "-------------------------------------"
echo "Differences between sorted files:"
diff <(sort file1.txt) <(sort file2.txt)

echo -e "\n4. Output process substitution:"
echo "----------------------------------"
echo "Sending output to multiple processors:"
echo "test data" > >(grep -o "test") > >(wc -w) > /dev/null
# Note: The above runs in background, need to wait
sleep 0.1

echo -e "\n5. Real-world example: Find unique users in logs"
echo "---------------------------------------------------"
cat << 'EOF' > log1.txt
user1 logged in
user2 logged in
user1 performed action
user3 logged in
EOF

cat << 'EOF' > log2.txt
user2 logged in
user3 performed action
user4 logged in
user1 logged out
EOF

echo "Log1 users:" && awk '{print $1}' log1.txt | sort -u
echo -e "\nLog2 users:" && awk '{print $1}' log2.txt | sort -u
echo -e "\nUsers in either log:"
sort -u <(awk '{print $1}' log1.txt) <(awk '{print $1}' log2.txt)

# Cleanup
cd ..
rm -rf /tmp/psub_test