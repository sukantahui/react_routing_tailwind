#!/bin/bash
# Pipeline subshell behavior demonstration

echo "=== Pipeline Subshell Behavior ==="

echo -e "\n1. Pipeline Creates Subshells:"
counter=0

# This pipeline creates subshells
seq 1 5 | while read num; do
    counter=$((counter + num))
    echo "  Inside pipeline: counter=$counter"
done

echo "  After pipeline: counter=$counter (UNCHANGED!)"

echo -e "\n2. Avoiding Pipeline Subshells:"
counter=0

# Method 1: Process substitution
while read num; do
    counter=$((counter + num))
    echo "  Inside process substitution: counter=$counter"
done < <(seq 1 5)

echo "  After process substitution: counter=$counter (CHANGED!)"

echo -e "\n3. Another Example with Command Substitution:"
counter=0

# Command substitution also creates subshell
result=$(
    counter=100
    echo "Inside command substitution: counter=$counter"
    echo "This is the result"
)

echo "Command substitution result: $result"
echo "After command substitution: counter=$counter (unchanged)"

echo -e "\n4. Grouping Alternative:"
counter=0

# Using grouping to avoid subshell
{
    while read num; do
        counter=$((counter + num))
    done
} <<EOF
1
2
3
4
5
EOF

echo "After grouping with here-doc: counter=$counter (CHANGED!)"

echo -e "\n=== Key Insight ==="
echo "Each pipe '|' creates a new subshell"
echo "Command substitution '$()' creates a subshell"
echo "Process substitution '<()' creates a subshell"
echo "Use grouping or here-docs to avoid unwanted subshells"