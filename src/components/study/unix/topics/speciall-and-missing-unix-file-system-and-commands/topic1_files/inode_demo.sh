#!/bin/bash
# inode_demo.sh - Demonstrate inodes and hard links

# Create a test directory
mkdir -p /tmp/inode_demo
cd /tmp/inode_demo

# Create an original file
echo "Hello from original" > original.txt

# Display its inode
echo "=== Inode of original.txt ==="
ls -li original.txt

# Create a hard link
ln original.txt hardlink.txt
echo -e "\n=== After creating hardlink.txt ==="
ls -li original.txt hardlink.txt

# Create a symbolic link
ln -s original.txt symlink.txt
echo -e "\n=== After creating symlink.txt ==="
ls -li original.txt hardlink.txt symlink.txt

# Modify content through hard link
echo "Modified via hardlink" > hardlink.txt
echo -e "\n=== Content of original.txt after hardlink modification ==="
cat original.txt

# Remove original file
rm original.txt
echo -e "\n=== After removing original.txt ==="
ls -li hardlink.txt symlink.txt
echo "Hardlink still works:"
cat hardlink.txt
echo "Symlink is broken (dangling):"
cat symlink.txt 2>&1

# Cleanup
cd /tmp
rm -rf /tmp/inode_demo