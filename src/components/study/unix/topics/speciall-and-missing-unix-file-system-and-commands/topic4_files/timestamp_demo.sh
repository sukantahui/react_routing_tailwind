#!/bin/bash
# timestamp_demo.sh - Compare ls options and stat formatting

mkdir -p /tmp/ts_show
cd /tmp/ts_show

echo "=== Create a test file ==="
echo "Data" > sample.log
echo "Sleeping 2 seconds to spread timestamps..."
sleep 2

echo -e "\n=== ls -l (mtime) ==="
ls -l sample.log

echo -e "\n=== ls -lu (atime) ==="
ls -lu sample.log

echo -e "\n=== ls -lc (ctime) ==="
ls -lc sample.log

echo -e "\n=== Detailed stat ==="
stat sample.log

echo -e "\n=== Custom stat format ==="
stat -c "atime: %x | mtime: %y | ctime: %z" sample.log

echo -e "\n=== Show only modification timestamp (Unix epoch) ==="
stat -c "%Y" sample.log

cd /tmp
rm -rf /tmp/ts_show