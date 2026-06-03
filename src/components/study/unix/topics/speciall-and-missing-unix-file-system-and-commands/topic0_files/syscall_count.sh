#!/bin/bash
# syscall_count.sh - Count how many times each syscall is used

echo "=== System call counts for 'df -h' ==="
strace -c df -h 2>&1

echo ""
echo "=== Which syscalls are used most by 'grep'? ==="
strace -c grep "root" /etc/passwd 2>&1