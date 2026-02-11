#!/bin/bash
# check_multiple_commands.sh – Handling exit status in pipelines and multiple commands
# Usage: ./check_multiple_commands.sh

set -euo pipefail
IFS=$'\n\t'

echo "=== Without pipefail ==="
# This pipeline will "succeed" because the last command (wc -l) always returns 0
false | wc -l
echo "Pipeline exit status: $?"   # Prints 0!

echo -e "\n=== With pipefail ==="
set -o pipefail
false | wc -l
echo "Pipeline exit status with pipefail: $?"  # Prints 1
set +o pipefail  # restore

echo -e "\n=== Using PIPESTATUS (bash only) ==="
true | false | true
echo "PIPESTATUS array: ${PIPESTATUS[@]}"  # 0 1 0

echo -e "\n=== Checking multiple commands explicitly ==="
ret=0
grep root /etc/passwd >/dev/null || ret=$?
grep nobody /etc/passwd >/dev/null || ret=$?
grep daemon /etc/passwd >/dev/null || ret=$?
if [ "$ret" -eq 0 ]; then
    echo "✓ All three users found"
else
    echo "✗ At least one user missing"
fi