#!/bin/bash
# redirect_basics.sh - Basic stdout redirection: > and >>

mkdir -p /tmp/redir_demo
cd /tmp/redir_demo

echo "=== Overwrite with > ==="
echo "First line" > file.txt
cat file.txt
echo "Second line" > file.txt   # overwrites
cat file.txt

echo -e "\n=== Append with >> ==="
echo "First line" > append.txt
echo "Second line" >> append.txt
echo "Third line" >> append.txt
cat append.txt

echo -e "\n=== Create empty file (truncate) ==="
> empty.txt
ls -l empty.txt

echo -e "\n=== Redirect output of commands ==="
date > date.txt
ls -l > listing.txt
cat date.txt
head -2 listing.txt

cd /tmp
rm -rf /tmp/redir_demo