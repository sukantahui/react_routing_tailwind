#!/bin/bash
# tee_multiple.sh - Writing to multiple files and combining with sudo

mkdir -p /tmp/tee_multi
cd /tmp/tee_multi

echo "=== Write to multiple files at once ==="
echo "Shared content" | tee file1.txt file2.txt file3.txt
ls -l file*.txt
echo "File1: $(cat file1.txt)"
echo "File2: $(cat file2.txt)"

echo -e "\n=== Append to multiple files ==="
echo "Appended line" | tee -a file1.txt file2.txt
tail -n 1 file1.txt
tail -n 1 file2.txt

echo -e "\n=== Using sudo tee to write to protected location (simulate) ==="
# Create a root-owned file for demo
sudo touch /tmp/root_owned 2>/dev/null
sudo chmod 644 /tmp/root_owned 2>/dev/null
echo "Config line" | sudo tee /tmp/root_owned > /dev/null
echo "Content written by sudo tee:"
sudo cat /tmp/root_owned
sudo rm /tmp/root_owned 2>/dev/null

echo -e "\n=== Broadcast to multiple processes (process substitution) ==="
# Requires bash; use a simple echo for demo
echo "Broadcast to multiple filters" | tee >(grep -o 'cast' > cast.txt) >(wc -w > wordcount.txt) > /dev/null
cat cast.txt
cat wordcount.txt

cd /tmp
rm -rf /tmp/tee_multi