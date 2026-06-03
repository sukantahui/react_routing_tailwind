#!/bin/bash
# date_arithmetic.sh - Date calculations using -d

echo "=== Date arithmetic ==="
echo "Today:       $(date +%F)"
echo "Yesterday:   $(date -d 'yesterday' +%F)"
echo "Tomorrow:    $(date -d 'tomorrow' +%F)"
echo "Next week:   $(date -d 'next Monday' +%F)"
echo "Last Friday: $(date -d 'last Friday' +%F)"
echo "In 10 days:  $(date -d '+10 days' +%F)"
echo "3 months ago:$(date -d '3 months ago' +%F)"

# Seconds since epoch difference
epoch_now=$(date +%s)
epoch_2025=$(date -d '2025-01-01' +%s)
diff_days=$(( (epoch_2025 - epoch_now) / 86400 ))
echo "Days until 2025-01-01: $diff_days"