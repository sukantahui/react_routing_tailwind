#!/bin/bash
# tee_append.sh - Append vs overwrite with tee

mkdir -p /tmp/tee_append
cd /tmp/tee_append

echo "=== Overwrite (tee without -a) ==="
echo "First line" | tee log.txt
echo "Second line (will overwrite!)" | tee log.txt
cat log.txt

echo -e "\n=== Append (tee -a) ==="
echo "First line" > append_log.txt   # create initial
echo "Appended line 1" | tee -a append_log.txt
echo "Appended line 2" | tee -a append_log.txt
cat append_log.txt

echo -e "\n=== Simulating a script that logs each step ==="
> build.log
for step in {1..3}; do
    echo "Step $step started at $(date)" | tee -a build.log
    sleep 1
    echo "Step $step finished" | tee -a build.log
done
echo "Final build log:"
cat build.log

cd /tmp
rm -rf /tmp/tee_append