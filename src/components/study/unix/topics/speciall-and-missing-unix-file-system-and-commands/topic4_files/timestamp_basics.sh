#!/bin/bash
# timestamp_basics.sh - Basic observation of atime, mtime, ctime

mkdir -p /tmp/ts_demo
cd /tmp/ts_demo

echo "=== Create a new file ==="
echo "Initial content" > test.txt
echo "Initial stat (all timestamps same):"
stat test.txt | grep -E "Access|Modify|Change"

sleep 2
echo -e "\n=== Read the file (cat) ==="
cat test.txt > /dev/null
stat test.txt | grep -E "Access|Modify|Change"
echo "Only atime changed (and ctime because atime is metadata)"

sleep 2
echo -e "\n=== Modify content ==="
echo "New line" >> test.txt
stat test.txt | grep -E "Access|Modify|Change"
echo "mtime and ctime changed; atime may also update depending on system"

sleep 2
echo -e "\n=== Change permissions ==="
chmod 600 test.txt
stat test.txt | grep -E "Access|Modify|Change"
echo "Only ctime changed (metadata change)"

cd /tmp
rm -rf /tmp/ts_demo