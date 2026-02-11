# topic10_files/quoting_variables.sh
#!/bin/bash
# Variables in different quoting contexts

USER="Swadeep"
HOME="/home/students/swadeep"
FILES="file1 file2 file3"

echo "=== Variable Expansion Examples ==="

echo -e "\n1. No quotes (DANGER - word splitting):"
echo $FILES  # Expands to three separate arguments

echo -e "\n2. Double quotes (SAFE - preserves as single string):"
echo "$FILES"  # Preserves as "file1 file2 file3"

echo -e "\n3. Single quotes (LITERAL - no expansion):"
echo '$FILES'  # Prints literal text: $FILES

echo -e "\n4. Mixed quoting:"
echo "User: '$USER', Home: \"$HOME\""

echo -e "\n5. Empty variable test:"
EMPTY=""
echo "Unquoted empty: $EMPTY"  # Shows nothing
echo "Quoted empty: '$EMPTY'"  # Shows empty quotes