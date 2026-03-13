#!/bin/bash
# wc command examples

echo "wc Command - Counting Lines, Words, Characters"
echo "=============================================="

# Create test files
cat > /tmp/sample.txt << 'EOF'
The quick brown fox
jumps over the lazy dog
This is a test file
with multiple lines
for counting examples
EOF

echo "1. Basic wc (lines, words, characters):"
echo "---------------------------------------"
wc /tmp/sample.txt

echo -e "\n2. Count lines only (wc -l):"
echo "------------------------------"
wc -l /tmp/sample.txt

echo -e "\n3. Count words only (wc -w):"
echo "------------------------------"
wc -w /tmp/sample.txt

echo -e "\n4. Count characters only (wc -c):"
echo "-----------------------------------"
wc -c /tmp/sample.txt

echo -e "\n5. Count characters without newlines (wc -m):"
echo "-----------------------------------------------"
wc -m /tmp/sample.txt

echo -e "\n6. Practical examples:"
echo "-----------------------"
echo "Count number of files in directory:"
ls /bin | wc -l

echo -e "\nCount words in multiple files:"
cat > /tmp/file1.txt << 'EOF'
Hello world
This is file one
EOF
cat > /tmp/file2.txt << 'EOF'
This is file two
With more words
EOF
wc -w /tmp/file1.txt /tmp/file2.txt

echo -e "\n7. Using wc in pipelines:"
echo "---------------------------"
echo "Count unique IPs in access log:"
cat > /tmp/access.log << 'EOF'
192.168.1.1
192.168.1.2
192.168.1.1
192.168.1.3
192.168.1.1
EOF
echo "Total entries:" && wc -l < /tmp/access.log
echo "Unique IPs:" && sort /tmp/access.log | uniq | wc -l

# Cleanup
rm -f /tmp/sample.txt /tmp/file1.txt /tmp/file2.txt /tmp/access.log