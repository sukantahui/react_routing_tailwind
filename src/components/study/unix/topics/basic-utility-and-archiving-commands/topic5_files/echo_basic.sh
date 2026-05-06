#!/bin/bash
# echo_basic.sh - Basic usage of echo

echo "=== Basic Echo Examples ==="

echo "1. Simple greeting:"
echo "Hello, Swadeep!"

echo -e "\n2. Multiple arguments:"
echo "Welcome to" "Barrackpore" "!"

echo -e "\n3. With variables:"
name="Tuhina"
echo "Hello, $name"

echo -e "\n4. Command substitution:"
echo "Today is $(date +%A), $(date +%B) $(date +%d)"

echo -e "\n5. Without newline (-n):"
echo -n "Loading "
sleep 1
echo -n "."
sleep 1
echo " Done"