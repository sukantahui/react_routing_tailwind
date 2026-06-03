#!/bin/bash
# umask_demo.sh - Show how umask affects default permissions

echo "=== Current umask value ==="
umask

echo -e "\n=== Default permission calculation ==="
echo "For directories: 777 - umask = effective"
echo "For files:       666 - umask = effective"
echo "Bits are subtracted (not numeric subtraction, but mask removal)."

echo -e "\n=== Testing with umask 022 ==="
(umask 022; touch /tmp/umask_022_file; mkdir /tmp/umask_022_dir)
ls -l /tmp/umask_022_file /tmp/umask_022_dir

echo -e "\n=== Testing with umask 002 (group write allowed) ==="
(umask 002; touch /tmp/umask_002_file; mkdir /tmp/umask_002_dir)
ls -l /tmp/umask_002_file /tmp/umask_002_dir

echo -e "\n=== Testing with umask 077 (strict) ==="
(umask 077; touch /tmp/umask_077_file; mkdir /tmp/umask_077_dir)
ls -l /tmp/umask_077_file /tmp/umask_077_dir

echo -e "\n=== To make umask permanent, add to ~/.bashrc ==="
echo 'Example: echo "umask 027" >> ~/.bashrc'

# Cleanup
rm -f /tmp/umask_022_file /tmp/umask_002_file /tmp/umask_077_file
rm -rf /tmp/umask_022_dir /tmp/umask_002_dir /tmp/umask_077_dir