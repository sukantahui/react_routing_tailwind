#!/bin/bash
# pstree_demo.sh – visualizes process tree from init
echo "=== Full Process Tree (init as root) ==="
if command -v pstree >/dev/null; then
    pstree -p 1
else
    echo "pstree not installed. Installing psmisc..." >&2
    sudo apt-get update && sudo apt-get install -y psmisc
    pstree -p 1
fi
echo -e "\n=== Tree of current shell ==="
pstree -aps $$