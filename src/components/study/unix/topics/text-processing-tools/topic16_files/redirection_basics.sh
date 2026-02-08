#!/bin/bash
# Basic redirection examples

echo "Basic Redirection Operators"
echo "==========================="

# Create a test directory
mkdir -p /tmp/redir_test
cd /tmp/redir_test

echo "1. Output Redirection (>):"
echo "--------------------------"
echo "Hello, World!" > output.txt
echo "File contents:"
cat output.txt

echo -e "\n2. Append Redirection (>>):"
echo "------------------------------"
echo "Second line" >> output.txt
echo "Third line" >> output.txt
echo "File now contains:"
cat output.txt

echo -e "\n3. Error Redirection (2>):"
echo "-----------------------------"
ls /nonexistent 2> error.log
echo "Error log contents:"
cat error.log

echo -e "\n4. Input Redirection (<):"
echo "----------------------------"
cat > input.txt << EOF
Apple
Banana
Cherry
Date
EOF
echo "Sorting input from file:"
sort < input.txt

echo -e "\n5. Here Document (<<):"
echo "------------------------"
wc -l << EOF
Line 1
Line 2
Line 3
Line 4
Line 5
EOF

echo -e "\n6. Discarding Output:"
echo "----------------------"
echo "This message won't appear" > /dev/null
echo "Check if message was discarded:"
ls /tmp/redir_test > /dev/null && echo "Command succeeded (output discarded)"

# Cleanup
cd ..
rm -rf /tmp/redir_test