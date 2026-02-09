# topic10_files/quoting_pitfalls.sh
#!/bin/bash
# Common quoting pitfalls and how to avoid them

echo "=== Common Quoting Pitfalls ==="

echo -e "\n1. Pitfall: Forgetting quotes with spaces"
touch "test file.txt"
# WRONG: ls test file.txt      # Looks for two files
# RIGHT:
ls "test file.txt"

echo -e "\n2. Pitfall: Single quotes inside single quotes"
# WRONG: echo 'It's broken'
# RIGHT:
echo "It's working"
echo 'It'\''s also working'

echo -e "\n3. Pitfall: Variable expansion in single quotes"
NAME="Debangshu"
echo 'Hello $NAME'  # Wrong if you want expansion
echo "Hello $NAME"  # Right

echo -e "\n4. Pitfall: Globbing when you don't want it"
touch file1 file2 file3
COUNT=$(ls -1 | wc -l)
echo "File count: $COUNT"
echo "Files: *"  # Shows "Files: *"
echo "Files: "*  # Shows "Files: file1 file2 file3"

echo -e "\n5. Pitfall: Command substitution with special chars"
OUTPUT="$(ls -l)"
echo "$OUTPUT"  # Preserves newlines
echo $OUTPUT    # May collapse whitespace

echo -e "\n6. Pitfall: Empty variables"
EMPTY=""
echo "Test: $EMPTY"        # Shows: Test:
echo "Test: ${EMPTY:-default}"  # Shows: Test: default

echo -e "\n7. Pitfall: Over-quoting arithmetic"
X=5
Y=3
RESULT=$((X + Y))  # No quotes needed for arithmetic
echo "Result: $RESULT"
# WRONG: RESULT="$(($X + $Y))"  # Works but unnecessary quotes

echo -e "\n8. Pitfall: Quotes in eval"
CMD="echo 'Hello World'"
eval $CMD  # May not work as expected
# BETTER: eval "$CMD"

echo -e "\n9. Pitfall: Quotes in find -exec"
# WRONG: find . -name "*.txt" -exec echo {} \;
# RIGHT: find . -name "*.txt" -exec echo "{}" \;

# Cleanup
rm -f "test file.txt" file1 file2 file3