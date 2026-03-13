#!/bin/bash
# Common Mistakes Demonstration
# Showing frequent errors and how to fix them

echo "=== Common Mistakes in Text Processing ==="
echo ""

# Create test files
echo "Creating test files..."
echo "Hello World" > /tmp/test1.txt
echo "Goodbye World" > /tmp/test2.txt
echo "file with spaces.txt" > "/tmp/file with spaces.txt"

echo ""
echo "=== Mistake 1: Unquoted Variables ==="
echo ""

filename="file with spaces.txt"
echo "filename='$filename'"
echo ""
echo "Wrong: ls $filename"
echo "Expands to: ls file with spaces.txt (3 arguments)"
ls $filename 2>&1 || echo "Command failed (expected)"
echo ""
echo "Right: ls \"$filename\""
echo "Expands to: ls 'file with spaces.txt' (1 argument)"
ls "$filename"
echo ""

echo "=== Mistake 2: Missing grep -i ==="
echo ""

echo "File contents:"
cat /tmp/test1.txt
echo ""
echo "Wrong: grep 'hello' /tmp/test1.txt"
grep 'hello' /tmp/test1.txt || echo "No match (case sensitive)"
echo ""
echo "Right: grep -i 'hello' /tmp/test1.txt"
grep -i 'hello' /tmp/test1.txt
echo ""

echo "=== Mistake 3: Unescaped dots in regex ==="
echo ""

echo "Testing: echo 'file.txt' | sed 's/.txt/.backup/'"
echo "file.txt" | sed 's/.txt/.backup/'
echo ""
echo "What happened? '.' matches any character, so 'f.txt' -> '.backup'"
echo ""
echo "Fix: echo 'file.txt' | sed 's/\\.txt/.backup/'"
echo "file.txt" | sed 's/\.txt/.backup/'
echo ""

echo "=== Mistake 4: Greedy regex matching ==="
echo ""

echo "Input: 'foo bar foo baz'"
echo "Goal: Remove everything from first 'foo' to next 'foo'"
echo ""
echo "Wrong: echo 'foo bar foo baz' | sed 's/foo.*foo//'"
echo "foo bar foo baz" | sed 's/foo.*foo//'
echo "Matches too much! Removes entire string"
echo ""
echo "Right: echo 'foo bar foo baz' | sed 's/foo[^f]*foo//'"
echo "foo bar foo baz" | sed 's/foo[^f]*foo//'
echo "Non-greedy: stops at next 'foo'"
echo ""

echo "=== Mistake 5: Not checking file existence ==="
echo ""

echo "Wrong: wc -l /tmp/nonexistent.txt"
wc -l /tmp/nonexistent.txt 2>&1
echo ""
echo "Right: test -f /tmp/nonexistent.txt && wc -l /tmp/nonexistent.txt || echo 'File not found'"
test -f /tmp/nonexistent.txt && wc -l /tmp/nonexistent.txt || echo 'File not found'
echo ""

echo "=== Mistake 6: Forgetting awk field separators ==="
echo ""

echo "Input: 'John,Doe,25'"
echo "Goal: Extract last name"
echo ""
echo "Wrong: echo 'John,Doe,25' | awk '{print \$2}'"
echo "John,Doe,25" | awk '{print $2}'
echo "Default FS is whitespace, so \$2 is empty"
echo ""
echo "Right: echo 'John,Doe,25' | awk -F, '{print \$2}'"
echo "John,Doe,25" | awk -F, '{print $2}'
echo ""

echo "=== Mistake 7: Pipeline exit codes ==="
echo ""

echo "Testing: grep 'nonexistent' /tmp/test1.txt | wc -l"
grep 'nonexistent' /tmp/test1.txt | wc -l
echo "Exit code: $?"
echo "Shows wc's exit code (0), not grep's (1)"
echo ""
echo "Solution 1: set -o pipefail"
(set -o pipefail; grep 'nonexistent' /tmp/test1.txt | wc -l; echo "Exit: $?")
echo ""
echo "Solution 2: Check PIPESTATUS"
grep 'nonexistent' /tmp/test1.txt | wc -l
echo "PIPESTATUS: ${PIPESTATUS[@]}"
echo ""

echo "=== Mistake 8: sed without backup ==="
echo ""

echo "DANGER ZONE: Always backup before sed -i"
echo "Create test file: echo 'original' > /tmp/sed_test.txt"
echo "original" > /tmp/sed_test.txt
echo ""
echo "Wrong: sed -i 's/original/changed/' /tmp/sed_test.txt"
echo "(If regex is wrong, data is lost)"
echo ""
echo "Right: sed -i.bak 's/original/changed/' /tmp/sed_test.txt"
sed -i.bak 's/original/changed/' /tmp/sed_test.txt
echo "File: $(cat /tmp/sed_test.txt)"
echo "Backup: $(cat /tmp/sed_test.txt.bak)"
echo ""

echo "=== Debugging Technique: Use echo ==="
echo ""

echo "When debugging, echo shows what will happen:"
echo "echo rm \"\$filename\""
echo "rm \"$filename\""
echo ""
echo "Or for complex commands:"
cmd="grep pattern *.txt | awk '{print \$1}' | sort -u"
echo "Command: $cmd"
echo "Debug: set -x; $cmd; set +x"
echo ""
echo "=== Summary ==="
echo "1. Quote variables: \"\$var\""
echo "2. Use grep -i for case-insensitive"
echo "3. Escape regex special chars: \\. \\* \\["
echo "4. Use non-greedy patterns: [^x]*"
echo "5. Check file existence: test -f"
echo "6. Set awk field separator: -F,"
echo "7. Use pipefail or PIPESTATUS"
echo "8. Backup before sed -i"