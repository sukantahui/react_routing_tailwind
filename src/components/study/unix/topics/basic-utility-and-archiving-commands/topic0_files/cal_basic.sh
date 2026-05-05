#!/bin/bash
# cal_basic.sh - Demonstrates basic usage of the cal command
# Purpose: Show current month, specific month/year, and highlight today

echo "=== Basic cal command examples ==="
echo

echo "1. Default: current month"
cal

echo -e "\n2. Specific month and year (March 2025)"
cal 03 2025

echo -e "\n3. Only year (full year 2025)"
cal 2025

echo -e "\n4. Today's date highlighted (if terminal supports)"
cal | sed "s/$(date +%e)/\\\x1b[7m&\\\x1b[0m/"

echo -e "\n✅ Tip: 'cal' alone is quick for date reference."