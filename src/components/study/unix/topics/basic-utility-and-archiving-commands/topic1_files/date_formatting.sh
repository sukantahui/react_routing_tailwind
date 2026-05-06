#!/bin/bash
# date_formatting.sh - Exploring format specifiers

echo "=== Date format specifiers ==="
echo "Year (4-digit):   $(date +%Y)"
echo "Year (2-digit):   $(date +%y)"
echo "Month (numeric):  $(date +%m)"
echo "Month (name):     $(date +%B)"
echo "Day of month:     $(date +%d)"
echo "Weekday (full):   $(date +%A)"
echo "Hour (24h):       $(date +%H)"
echo "Minute:           $(date +%M)"
echo "Second:           $(date +%S)"
echo "ISO 8601:         $(date -Iseconds)"
echo "Custom:           $(date +"%A, %B %d, %Y at %I:%M %p")"