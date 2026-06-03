#!/bin/bash
# trace_fork.sh – trace fork/clone system calls using strace
echo "=== Tracing fork() in a simple command ==="
strace -f -e clone bash -c 'echo Hello' 2>&1 | head -20

echo -e "\n=== Count of forks when running 'ls' ==="
strace -f -e clone ls 2>&1 | grep -c clone

echo -e "\n=== Watch fork() in real time (press Ctrl+C) ==="
strace -f -e clone -p $$ 2>&1 &
sleep 2
kill %1 2>/dev/null