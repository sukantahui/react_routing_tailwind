#!/bin/bash
# tree_structure.sh - Display directory tree with depth limiting

echo "=== Installing tree if not present (Debian/Ubuntu style) ==="
if ! command -v tree &> /dev/null; then
    echo "tree command not found. Install it using: sudo apt install tree"
    echo "Showing fallback using find:"
    find / -maxdepth 2 -type d 2>/dev/null | head -20
else
    echo "=== Tree of root directory (max depth 2) ==="
    tree -L 2 -d / 2>/dev/null | head -30

    echo -e "\n=== Tree of /etc (showing only first level) ==="
    tree -L 1 /etc 2>/dev/null
fi

echo -e "\n=== Quick overview of home directories ==="
ls -ld /home/* 2>/dev/null