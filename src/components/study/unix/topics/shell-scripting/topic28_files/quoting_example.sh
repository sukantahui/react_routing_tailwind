#!/bin/bash
# quoting_example.sh – Shows why quoting is non‑negotiable
set -u

dirpath="/tmp/My Documents"
mkdir -p "$dirpath"

# WRONG – no quotes → word splitting
echo "❌ Without quotes:"
ls -l $dirpath      # tries 'ls -l /tmp/My' and 'Documents'

# RIGHT – with quotes
echo -e "\n✅ With quotes:"
ls -l "$dirpath"

# Cleanup
rm -rf "$dirpath"