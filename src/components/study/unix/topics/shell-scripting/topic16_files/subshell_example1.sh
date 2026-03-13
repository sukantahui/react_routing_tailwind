#!/bin/bash
# Subshell for temporary directory changes in Barrackpore project

echo "=== Barrackpore Project File Processing ==="
echo "Current directory: $(pwd)"
echo "Original directory contents:"
ls -la | head -5

# Use subshell to temporarily change directory
(
    echo "Entering subshell..."
    cd /tmp
    echo "Subshell directory: $(pwd)"
    echo "Creating test file..."
    echo "Test content" > test_file.txt
    echo "Subshell directory contents:"
    ls -la test_file.txt
)

# Back in original shell
echo -e "\nBack in original shell..."
echo "Current directory: $(pwd)"
echo "Can we see test_file.txt?"
if [ -f test_file.txt ]; then
    echo "Yes, test_file.txt exists here"
else
    echo "No, test_file.txt only existed in the subshell"
fi

# Check if we can access /tmp/test_file.txt
if [ -f /tmp/test_file.txt ]; then
    echo "The file exists in /tmp (created by subshell)"
    # Clean up
    rm /tmp/test_file.txt
fi