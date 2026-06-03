#!/bin/bash
# tee_basics.sh - Basic usage of tee: writing to file and terminal

mkdir -p /tmp/tee_demo
cd /tmp/tee_demo

echo "=== Using tee to save listing while viewing ==="
ls -la | tee listing.txt
echo -e "\nContents of listing.txt:"
cat listing.txt

echo -e "\n=== Using tee in a pipeline to capture intermediate data ==="
echo -e "apple\nbanana\ncherry\n" > fruits.txt
cat fruits.txt | tee temp.txt | grep 'a' > filtered.txt
echo "temp.txt contains:"
cat temp.txt
echo "filtered.txt contains:"
cat filtered.txt

echo -e "\n=== Suppress terminal output but still save to file ==="
echo "This will not appear on terminal" | tee silent.txt > /dev/null
ls -l silent.txt

echo -e "\n=== Using tee with a here-string ==="
tee from_herestring.txt <<< "Hello from here-string"
cat from_herestring.txt

cd /tmp
rm -rf /tmp/tee_demo