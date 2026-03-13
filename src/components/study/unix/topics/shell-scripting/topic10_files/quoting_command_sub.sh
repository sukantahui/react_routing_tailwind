# topic10_files/quoting_command_sub.sh
#!/bin/bash
# Command substitution in quotes

echo "=== Command Substitution with Quotes ==="

echo -e "\n1. Double quotes with command substitution:"
echo "Today is: $(date +%A)"
echo "You are: $(whoami)@$(hostname)"
echo "Files: $(ls -1 | wc -l) in $(pwd)"

echo -e "\n2. Single quotes (no substitution):"
echo 'Today is: $(date +%A)'
echo 'You are: $(whoami)@$(hostname)'

echo -e "\n3. Nested quotes with command substitution:"
echo "User '$(whoami)' has home at \"$(echo ~)\""

echo -e "\n4. Command substitution in variable assignment:"
SERVER="$(hostname -s)"
UPTIME="$(uptime -p)"
echo "Server $SERVER has been up for $UPTIME"

echo -e "\n5. Quoting the result of command substitution:"
FILE_COUNT="$(ls -1 | wc -l)"
echo "File count: \"$FILE_COUNT\""  # Quotes around variable

echo -e "\n6. When NOT to quote command substitution:"
# For arithmetic, don't quote the $(( ))
RESULT=$(( $(date +%d) + 10 ))
echo "Ten days from now: day $RESULT"