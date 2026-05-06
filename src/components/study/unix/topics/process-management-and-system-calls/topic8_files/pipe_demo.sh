#!/bin/bash
# pipe_demo.sh – demonstrate anonymous pipe between shell commands
echo "=== Simple pipeline: ls filtered by grep ==="
ls -l | grep -E '^d' | head -5

echo -e "\n=== Counting words in pipe ==="
echo "Hello world from Barrackpore" | wc -w

echo -e "\n=== Using tee to see data flowing through pipe ==="
seq 1 5 | tee >(wc -l) | cat

echo -e "\n=== Pipe buffer size test (writing 100KB, reading slowly) ==="
dd if=/dev/zero bs=1024 count=100 2>/dev/null | (sleep 0.1; wc -c)