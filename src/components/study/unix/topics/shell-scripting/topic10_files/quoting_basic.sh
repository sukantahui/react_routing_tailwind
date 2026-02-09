# topic10_files/quoting_basic.sh
#!/bin/bash
# Basic quoting examples

echo "=== Single Quotes (Literal) ==="
echo 'Hello $USER, today is $(date)'
echo 'Special chars: * ? [ ] { } $ \ `'

echo -e "\n=== Double Quotes (Interpreted) ==="
echo "Hello $USER, today is $(date +%F)"
echo "Special chars in double quotes: * ? [ ] { }"

echo -e "\n=== No Quotes (Shell Expands) ==="
echo Hello $USER, today is $(date +%F)
# Warning: This can cause problems with spaces or globs!

echo -e "\n=== Backslash Escape ==="
echo "Dollar sign: \$HOME"
echo "Quote in double quotes: She said \"Hello\""
echo 'Single quote in single quotes: It'\''s raining'