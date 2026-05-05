#!/bin/bash
# tr_advanced.sh - Advanced tr usage
# 1. Combining -s and -d (order matters: -d first? Actually tr -ds: delete then squeeze)
echo "=== Combine -d and -s ==="
echo "a   b   c" | tr -ds ' ' ' '        # delete spaces then squeeze? Actually tr -ds ' ' ' ' means delete spaces then squeeze? Let's test
# Better: squeeze spaces then delete spaces is redundant. Instead, keep only digits:
echo "abc 123 def 456" | tr -cd '[:digit:] ' | tr -s ' '

# 2. Preserve newlines while deleting carriage returns (CR)
echo -e "Line1\r\nLine2\r\nLine3" | tr -d '\r'

# 3. Translate double quotes to single quotes
echo '"Hello", "World"' | tr '"' "'"

# 4. Remove non-printable characters (ASCII control chars)
echo -e "Hello\x01World\x02!" | tr -cd '[:print:]\n'

# 5. Translate from octal escapes (using printf)
printf 'a\01b\02c' | tr '\01-\02' 'XY'

# 6. Complement to keep only alphanumeric and spaces, replace others with newline
echo "Hello, World! 2025." | tr -c '[:alnum:] ' '\n' | tr -s '\n'

# Cleanup - no files created
echo -e "\n=== Advanced tr examples completed ==="