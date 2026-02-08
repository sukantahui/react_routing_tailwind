#!/bin/bash
# Quoting and Variable Expansion Issues
# The most common source of bugs in shell scripts

echo "=== Quoting and Variable Expansion Pitfalls ==="
echo ""

echo "=== The Great Shell Expansion Order ==="
echo "1. Brace expansion: {a,b,c}"
echo "2. Tilde expansion: ~"
echo "3. Parameter expansion: \$VAR"
echo "4. Command substitution: \$(cmd)"
echo "5. Arithmetic expansion: \$((expression))"
echo "6. Word splitting"
echo "7. Pathname expansion: *"
echo "8. Quote removal"
echo ""

echo "=== Problem 1: Word Splitting ==="
echo ""

echo "Create test variable:"
files="file1.txt file2.txt 'file3 with spaces.txt'"
echo "files=\"$files\""
echo ""
echo "Wrong: ls \$files"
ls $files 2>&1 || echo "Fails because of spaces"
echo ""
echo "What shell sees: ls file1.txt file2.txt 'file3 with spaces.txt'"
echo "The quotes are just characters, not syntax!"
echo ""
echo "Right: Use array instead"
files_array=(file1.txt file2.txt "file3 with spaces.txt")
echo "files_array=(\${files_array[@]})"
echo "ls \"\${files_array[@]}\""
ls "${files_array[@]}"
echo ""

echo "=== Problem 2: Globbing at wrong time ==="
echo ""

echo "Create test files:"
touch /tmp/test_{a,b,c}.txt
touch /tmp/test_document.txt
echo "Files: $(ls /tmp/test_*.txt)"
echo ""
echo "Variable with glob:"
pattern="/tmp/test_*.txt"
echo "pattern=\"\$pattern\""
echo ""
echo "Wrong: echo \$pattern"
echo $pattern
echo "Globbing happens after expansion!"
echo ""
echo "Right: echo \"\$pattern\""
echo "$pattern"
echo "Or delay globbing:"
echo "for file in \$pattern; do echo \"\$file\"; done"
for file in $pattern; do echo "$file"; done
echo ""

echo "=== Problem 3: Command substitution quirks ==="
echo ""

echo "Get list of files:"
echo "files=\$(ls /tmp/test_*.txt)"
echo "\$files"
files=$(ls /tmp/test_*.txt)
echo "$files"
echo ""
echo "Word splitting happens on newlines!"
echo "echo \$files | wc -w"
echo $files | wc -w
echo "Not what you expect!"
echo ""
echo "Right: Use array or handle carefully"
echo "mapfile -t files_array <<< \"\$(ls /tmp/test_*.txt)\""
mapfile -t files_array <<< "$(ls /tmp/test_*.txt)"
echo "Array has \${#files_array[@]} elements"
echo ""

echo "=== Problem 4: Nested quotes ==="
echo ""

echo "Trying to pass quoted string through commands:"
echo "echo 'Hello World' | awk '{print \$1}'"
echo 'Hello World' | awk '{print $1}'
echo ""
echo "But what if we need quotes in awk?"
echo "Wrong: echo 'Hello World' | awk '{print \"\$1\": \$1}'"
echo 'Hello World' | awk '{print "$1": $1}'
echo "Works, but gets complex with shell variables:"
shell_var="test"
echo "shell_var=\"\$shell_var\""
echo "Wrong: echo 'Hello World' | awk '{print \"'\"\$shell_var\"'\": \$1}'"
echo 'Hello World' | awk '{print "'"$shell_var"'": $1}'
echo "Very confusing!"
echo ""
echo "Better: Use awk -v"
echo "echo 'Hello World' | awk -v var=\"\$shell_var\" '{print var \": \" \$1}'"
echo 'Hello World' | awk -v var="$shell_var" '{print var ": " $1}'
echo ""

echo "=== Problem 5: Arithmetic in quotes ==="
echo ""

echo "Arithmetic needs unquoted expansion:"
a=5
b=10
echo "a=\$a, b=\$b"
echo ""
echo "Wrong: result=\"\$((a + b))\""
result="$((a + b))"
echo "result: \$result"
echo "$result"
echo "Actually works, but be careful with spaces:"
echo "Wrong with spaces: result=\"\$(( a + b ))\""
result="$(( a + b ))"
echo "$result"
echo ""
echo "Right: result=\$((a + b))"
result=$((a + b))
echo "result: \$result"
echo "$result"
echo ""

echo "=== Debugging Technique: set -x ==="
echo ""

echo "set -x shows expansions:"
set -x
test_var="file with spaces.txt"
echo $test_var
echo "$test_var"
set +x
echo ""

echo "=== Debugging Technique: printf for inspection ==="
echo ""

echo "printf shows exact content:"
problematic="file with spaces.txt"
echo "Variable:"
printf '%q\n' "$problematic"
echo "Length: ${#problematic}"
echo ""

echo "=== Quoting Rules Summary ==="
echo ""
echo "1. Always quote variables: \"\$var\""
echo "2. Use arrays for lists: array=(\"item1\" \"item2\")"
echo "3. Use \$() for command substitution, not backticks"
echo "4. Use [[ ]] for tests in bash, not [ ]"
echo "5. Use printf for safe output"
echo "6. Use set -x for debugging expansions"
echo "7. Remember: Single quotes ' literal, Double quotes \" expand"
echo ""
echo "=== When to use which ==="
echo ""
echo "Single quotes:"
echo "  echo 'Cost: \$100'  # Literal dollar sign"
echo "  awk '{print \$1}'   # Awk program"
echo ""
echo "Double quotes:"
echo "  echo \"Hello \$name\"  # Variable expansion"
echo "  echo \"*.txt\"        # Prevent globbing"
echo ""
echo "No quotes:"
echo "  var=\$(command)     # Command substitution"
echo "  num=\$((1 + 2))     # Arithmetic"
echo "  [[ \$var == test ]] # Bash tests"