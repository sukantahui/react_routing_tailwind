# topic9_files/command_sub_pitfall.sh
#!/bin/bash
# Common pitfalls with command substitution

# Pitfall 1: Forgetting to quote substitutions with spaces
files=$(ls *.txt 2>/dev/null)  # This splits by spaces!
echo "Unquoted count: ${#files[@]}"  # Wrong count if spaces in filenames

files="$(ls *.txt 2>/dev/null)"  # Correct: quoted
echo "Quoted as string"

# Pitfall 2: Command fails but substitution continues
content=$(cat non_existent_file.txt)  # This will fail
echo "Exit status of failed command: $?"
echo "Content (empty): '$content'"

# Better approach: check if command succeeded
if content=$(cat existing_file.txt 2>/dev/null); then
    echo "File read successfully"
else
    echo "Failed to read file"
fi

# Pitfall 3: Trailing newlines are removed
multiline=$(printf "Line 1\nLine 2\nLine 3\n")
echo "Without newlines: '$multiline'"

# Preserve newlines with proper quoting
printf "Line 1\nLine 2\nLine 3\n" > temp.txt
multiline=$(cat temp.txt)
echo "With quoting in echo:"
echo "$multiline"

# Pitfall 4: Using backticks with single quotes
# This won't work as expected:
# result=`echo 'Today is `date`'`

# Clean up
rm -f temp.txt