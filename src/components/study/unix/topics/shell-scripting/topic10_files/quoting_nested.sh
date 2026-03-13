# topic10_files/quoting_nested.sh
#!/bin/bash
# Nested quotes and complex cases

echo "=== Nested Quotes (Complex Cases) ==="

echo -e "\n1. Double quotes inside single quotes:"
echo 'The message was: "Hello World"'

echo -e "\n2. Single quotes inside double quotes:"
echo "It's a beautiful day"

echo -e "\n3. Escaped quotes inside same-type quotes:"
echo "She said: \"It's raining\""
echo 'He replied: '\''So take an umbrella'\'''

echo -e "\n4. Multiple levels of nesting:"
echo "'"'"'"This gets confusing!"'"'"'"

echo -e "\n5. Using variables with nested quotes:"
NAME="Tuhina"
MESSAGE="Don't forget the meeting"
echo "$NAME said: \"$MESSAGE\""

echo -e "\n6. Here documents with quotes:"
cat << 'EOF'
This is a here-doc with 'single' and "double" quotes
Variable $HOME won't expand because of quoted EOF
EOF

cat << EOF
This here-doc will expand variables like $HOME
And commands like $(date)
EOF

echo -e "\n7. ANSI-C quoting ($'...'):"
echo $'Line 1\nLine 2\tTabbed'
echo $'Special: \xE2\x98\xBA \u263A'  # Unicode smiley

echo -e "\n8. Locale-specific quoting ($\"...\"):"
# This requires proper locale setup
echo $"Hello"  # May translate if locale supports it