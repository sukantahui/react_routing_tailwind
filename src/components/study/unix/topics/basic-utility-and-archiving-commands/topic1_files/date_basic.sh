#!/bin/bash
# date_basic.sh - Basic date command usage

echo "=== Basic date examples ==="
echo "1. Current date and time:"
date

echo -e "\n2. UTC time:"
date -u

echo -e "\n3. Epoch seconds:"
date +%s

echo -e "\n4. Custom format (YYYY-MM-DD HH:MM:SS):"
date +"%Y-%m-%d %H:%M:%S"