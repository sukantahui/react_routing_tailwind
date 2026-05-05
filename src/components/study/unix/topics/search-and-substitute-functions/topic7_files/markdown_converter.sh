#!/bin/bash
# markdown_converter.sh - Batch edit Markdown files
mkdir -p docs
echo "# Old Title" > docs/doc1.md
echo "## Section" > docs/doc2.md
echo "- list item" > docs/doc3.md

echo "=== Original Markdown ==="
cat docs/*.md

echo -e "\n=== Convert old title format to new ==="
sed -i 's/^# /# NEW: /' docs/*.md
sed -i 's/^## /## NEW: /' docs/*.md

echo -e "\n=== Convert list items to numbered ==="
sed -i 's/^- /1. /' docs/*.md

echo -e "\n=== After conversion ==="
cat docs/*.md

# Cleanup
rm -rf docs