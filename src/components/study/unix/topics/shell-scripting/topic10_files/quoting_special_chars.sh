# topic10_files/quoting_special_chars.sh
#!/bin/bash
# Special character handling with quotes

echo "=== Globbing (Filename Expansion) ==="

# Create test files
touch file1.txt file2.txt file3.txt "file with spaces.txt"

echo -e "\n1. No quotes (globbing happens):"
echo *.txt  # Expands to matching files

echo -e "\n2. Double quotes (no globbing):"
echo "*.txt"  # Literal *.txt

echo -e "\n3. Single quotes (no globbing):"
echo '*.txt'  # Literal *.txt

echo -e "\n4. Files with spaces (REQUIRES quotes):"
ls "file with spaces.txt"  # Works
# ls file with spaces.txt   # Would fail - 3 arguments!

echo -e "\n=== Other Special Characters ==="

echo -e "\n5. Pipe character:"
echo 'ls | grep txt'  # Literal - won't pipe
echo "ls | grep txt"  # Also literal in echo
# To execute pipe: eval "ls | grep txt"  # But be careful!

echo -e "\n6. Redirects:"
echo 'echo test > file.txt'  # Literal
# echo test > file.txt       # Actually creates file

echo -e "\n7. Semicolon (command separator):"
echo 'echo one; echo two'    # Literal
# echo one; echo two         # Executes two commands

# Cleanup
rm -f file1.txt file2.txt file3.txt "file with spaces.txt"