#!/bin/bash
# find_advanced.sh - Advanced expressions: logical operators, pruning, regex

mkdir -p /tmp/find_adv
cd /tmp/find_adv

touch a.txt b.log c.jpg d.png e.out
mkdir gitdir .hidden logs
touch gitdir/.gitignore logs/error.log .hidden/secret.txt

echo "=== Find .txt OR .log files ==="
find . -name "*.txt" -o -name "*.log"

echo -e "\n=== Find files NOT matching .txt ==="
find . ! -name "*.txt"

echo -e "\n=== Using parentheses to group (escape them) ==="
find . \\( -name "*.jpg" -o -name "*.png" \\) -type f

echo -e "\n=== Exclude .git directory (prune) ==="
find . -path "./gitdir" -prune -o -type f -print

echo -e "\n=== Using -regex (GNU find) ==="
find . -regex '.*\.[ch]' 2>/dev/null || echo "regex not supported"
echo "Creating .c and .h files"
touch main.c header.h
find . -regex '.*\.\(c\|h\)$'

echo -e "\n=== Limit depth to 1 ==="
find . -maxdepth 1 -type f

cd /tmp
rm -rf /tmp/find_adv