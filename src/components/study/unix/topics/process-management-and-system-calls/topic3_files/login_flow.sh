#!/bin/bash
# login_flow.sh – explore getty and login processes
echo "=== Getty processes on virtual terminals ==="
ps -ef | grep -E 'getty|login' | grep -v grep

echo -e "\n=== Current user login shell (should be $$) ==="
ps -o pid,ppid,comm -p $$

echo -e "\n=== Tracing parent chain up to init ==="
pid=$$
while [ $pid -gt 1 ]; do
    ps -o pid,ppid,comm -p $pid --no-headers
    pid=$(ps -o ppid= -p $pid)
done

echo -e "\n=== Simulate login (requires sudo) ==="
echo "To simulate: sudo login -f $USER"