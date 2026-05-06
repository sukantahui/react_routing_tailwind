#!/bin/bash
# who_basic.sh - Basic usage of who command

echo "=== Basic who command examples ==="
echo "1. List currently logged-in users:"
who

echo -e "\n2. Display only usernames and count (quick summary):"
who -q

echo -e "\n3. Show system boot time:"
who -b

echo -e "\n4. Show current runlevel (Linux only):"
who -r

echo -e "\n5. Show your own login session:"
who am i

echo -e "\n6. Show all available options (help):"
who --help | head -10