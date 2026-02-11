#!/bin/bash
# Side-by-side comparison of subshell vs grouping

echo "=== File Processing Comparison: Subshell vs Grouping ==="

# Method 1: Using subshell (variables isolated)
echo -e "\n1. Using Subshell ( ):"
file_count=0
total_size=0

(
    echo "  Inside subshell..."
    for file in /etc/*.conf; do
        if [ -f "$file" ]; then
            file_count=$((file_count + 1))
            size=$(stat -c%s "$file" 2>/dev/null || echo "0")
            total_size=$((total_size + size))
        fi
    done
    echo "  Subshell counted: $file_count files"
    echo "  Subshell total size: $total_size bytes"
)

echo "  Outside subshell:"
echo "  Main shell file_count: $file_count"
echo "  Main shell total_size: $total_size"

# Method 2: Using grouping (variables shared)
echo -e "\n2. Using Grouping { }:"
file_count=0
total_size=0

{
    echo "  Inside command group..."
    for file in /etc/*.conf; do
        if [ -f "$file" ]; then
            file_count=$((file_count + 1))
            size=$(stat -c%s "$file" 2>/dev/null || echo "0")
            total_size=$((total_size + size))
        fi
    done
    echo "  Group counted: $file_count files"
    echo "  Group total size: $total_size bytes"
}

echo "  Outside group:"
echo "  Main shell file_count: $file_count"
echo "  Main shell total_size: $total_size"

# Summary
echo -e "\n=== Summary ==="
echo "Subshell: Variables isolated - main shell values unchanged"
echo "Grouping: Variables shared - main shell values updated"
echo -e "\nUse subshell when you want isolation"
echo "Use grouping when you want persistence"