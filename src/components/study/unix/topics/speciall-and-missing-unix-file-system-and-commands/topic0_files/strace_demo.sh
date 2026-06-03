#!/bin/bash
# strace_demo.sh - Show system calls made by a simple command

echo "=== Tracing 'ls -l' system calls (first 30 lines) ==="
strace -e trace=file,process,network ls -l 2>&1 | head -30

echo ""
echo "=== Summary of system calls for 'echo hello' ==="
strace -c echo hello 2>&1