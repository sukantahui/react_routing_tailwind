#!/bin/bash
# Common Regex Mistakes and Debugging
# Focusing on pattern matching errors

echo "=== Regex Debugging Techniques ==="
echo ""

echo "=== Mistake 1: Not escaping special characters ==="
echo ""

echo "Test string: 'file.txt backup.tar.gz'"
echo "Goal: Match 'file.txt'"
echo ""
echo "Wrong: grep 'file.txt' <<< 'file.txt backup.tar.gz'"
grep 'file.txt' <<< 'file.txt backup.tar.gz'
echo "Actually matches 'fileAtxt' where A is any character!"
echo ""
echo "Debug with: echo 'file.txt' | grep -o 'file.txt'"
echo "file.txt" | grep -o 'file.txt'
echo ""
echo "Right: grep 'file\\.txt' <<< 'file.txt backup.tar.gz'"
grep 'file\.txt' <<< 'file.txt backup.tar.gz'
echo ""

echo "=== Mistake 2: Greedy vs non-greedy matching ==="
echo ""

echo "Test string: '<b>bold</b> and <i>italic</i>'"
echo "Goal: Extract first HTML tag content"
echo ""
echo "Wrong greedy: sed 's/<.*>//' <<< '<b>bold</b> and <i>italic</i>'"
sed 's/<.*>//' <<< '<b>bold</b> and <i>italic</i>'
echo "Matches from first < to last >"
echo ""
echo "Right (non-greedy): sed 's/<[^>]*>//' <<< '<b>bold</b> and <i>italic</i>'"
sed 's/<[^>]*>//' <<< '<b>bold</b> and <i>italic</i>'
echo "Stops at first >"
echo ""

echo "=== Mistake 3: Anchors missing ==="
echo ""

echo "Test data:"
echo "error: something went wrong"
echo "warning: minor issue"
echo "another error: critical"
echo ""
echo "Goal: Find lines starting with 'error:'"
echo ""
echo "Wrong: grep 'error:'"
grep 'error:' <<< $'error: something went wrong\nwarning: minor issue\nanother error: critical'
echo "Matches both lines with 'error:'"
echo ""
echo "Right: grep '^error:'"
grep '^error:' <<< $'error: something went wrong\nwarning: minor issue\nanother error: critical'
echo ""

echo "=== Mistake 4: Character class errors ==="
echo ""

echo "Test string: 'ABC123 DEF456'"
echo "Goal: Match 'ABC123' (letters followed by numbers)"
echo ""
echo "Wrong: grep '[A-Z][0-9]' <<< 'ABC123 DEF456'"
grep '[A-Z][0-9]' <<< 'ABC123 DEF456'
echo "Matches 'C1' not the whole pattern"
echo ""
echo "Debug step by step:"
echo "echo 'ABC123' | grep -o '[A-Z]\+'"
echo "ABC123" | grep -o '[A-Z]\+'
echo "echo 'ABC123' | grep -o '[0-9]\+'"
echo "ABC123" | grep -o '[0-9]\+'
echo ""
echo "Right: grep '[A-Z]\\+[0-9]\\+' <<< 'ABC123 DEF456'"
grep '[A-Z]\+[0-9]\+' <<< 'ABC123 DEF456'
echo ""

echo "=== Mistake 5: Backreference confusion ==="
echo ""

echo "Test string: 'hello hello'"
echo "Goal: Detect repeated words"
echo ""
echo "Wrong: grep '\\(\\w\\)\\1' <<< 'hello hello'"
grep '\(\w\)\1' <<< 'hello hello' 2>&1 || echo "Matches repeated characters, not words"
echo ""
echo "Right: grep '\\(\\w\\+\\) \\1' <<< 'hello hello'"
grep '\(\w\+\) \1' <<< 'hello hello'
echo ""

echo "=== Debugging Technique: Test with echo ==="
echo ""

echo "When debugging regex, test with known strings:"
echo "echo 'test.string' | grep -o 'test\\.string'"
echo "test.string" | grep -o 'test\.string'
echo ""
echo "Or use regex debuggers online, or in Python/Perl:"
cat > /tmp/regex_test.py << 'EOF'
import re
pattern = r'file\.txt'
test_string = 'file.txt backup.tar.gz'
match = re.search(pattern, test_string)
print(f"Pattern: {pattern}")
print(f"String: {test_string}")
print(f"Match: {match.group() if match else 'No match'}")
EOF
echo "python3 /tmp/regex_test.py"
python3 /tmp/regex_test.py
echo ""

echo "=== Debugging Technique: Stepwise refinement ==="
echo ""

echo "Complex regex: Match email addresses"
echo "Test strings:"
echo "  valid@example.com"
echo "  invalid@com"
echo "  another.valid@test.co.in"
echo ""
echo "Step 1: Basic pattern"
echo "grep '@'"
grep '@' <<< $'valid@example.com\ninvalid@com\nanother.valid@test.co.in'
echo ""
echo "Step 2: Add domain"
echo "grep '@.*\\.'"
grep '@.*\.' <<< $'valid@example.com\ninvalid@com\nanother.valid@test.co.in'
echo ""
echo "Step 3: Refine"
echo "grep '[a-zA-Z0-9._%+-]\\+@[a-zA-Z0-9.-]\\+\\.[a-zA-Z]\\{2,\\}'"
grep '[a-zA-Z0-9._%+-]\+@[a-zA-Z0-9.-]\+\.[a-zA-Z]\{2,\}' <<< $'valid@example.com\ninvalid@com\nanother.valid@test.co.in'
echo ""

echo "=== Common Regex Tips ==="
echo ""
echo "1. Escape dots: \\. not ."
echo "2. Use ^ and $ for line boundaries"
echo "3. Prefer [^>]* over .*? for non-greedy"
echo "4. Test with echo and small samples"
echo "5. Use regex debuggers or online tools"
echo "6. Remember: regex engines differ (grep vs sed vs awk)"