#!/bin/bash
# echo_options.sh - Exploring -n, -e, -E options

echo "=== Echo Options Demo ==="

echo "1. Default (adds newline):"
echo "Line 1"; echo "Line 2"

echo -e "\n2. Suppress newline with -n:"
echo -n "This line" && echo " continues"

echo -e "\n3. Enable escapes with -e:"
echo -e "First line\nSecond line\nThird line"

echo -e "\n4. Tab stops:"
echo -e "Column1\tColumn2\tColumn3"

echo -e "\n5. Backspace and carriage return:"
echo -e "12345\b\b\bABC"   # deletes 3 chars
echo -e "Loading...\rDone   "

echo -e "\n6. Disable escapes with -E (default):"
echo -E "This is a literal \\n backslash-n"

# Note: on some systems, /bin/sh may not support -e
echo "Note: Options may vary; use 'man echo'."