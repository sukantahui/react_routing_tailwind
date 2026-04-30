#!/bin/bash
# redirect_errors.sh - Stderr redirection and combining streams

mkdir -p /tmp/error_demo
cd /tmp/error_demo

echo "=== Redirect stderr only (2>) ==="
ls existent.txt non-existent.txt 2> errors.log
echo "stdout appears on terminal (if any)"
cat errors.log

echo -e "\n=== Append stderr (2>>) ==="
ls non-existent1.txt 2>> errors.log
ls non-existent2.txt 2>> errors.log
cat errors.log

echo -e "\n=== Send both stdout and stderr to same file (POSIX) ==="
ls existent.txt non-existent.txt > both.log 2>&1
cat both.log

echo -e "\n=== Bash shorthand &> (both overwrite) and &>> (append) ==="
bash -c "ls existent.txt non-existent.txt &> short.log" 2>/dev/null
cat short.log

echo -e "\n=== Discard errors to /dev/null ==="
find /proc -name "stat" 2>/dev/null | head -3

echo -e "\n=== Redirect stdout to stderr (useful for debug) ==="
echo "This is an error message" 1>&2

cd /tmp
rm -rf /tmp/error_demo