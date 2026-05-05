#!/bin/bash
# cal_yearly.sh - Annual calendar generation and formatting

year=${1:-2025}  # allow user to pass year, default 2025

echo "=== Yearly Calendar for $year ==="
echo

# Full year view
cal -y $year

# Count number of months with 31 days in that year
count_31=$(cal $year | grep -E "31" | wc -l)
echo -e "\n📊 Months containing 31 days: $count_31"

# Determine if it's a leap year
if cal $year | grep -q "29"; then
    echo "🍀 $year is a leap year!"
else
    echo "📆 $year is not a leap year."
fi

# Generate a simple monthly report header for logs
for month in {1..12}; do
    echo "--- $(cal $month $year | head -n1) ---" >> yearly_report.txt
done
echo "📄 Yearly report saved to yearly_report.txt"

echo -e "\n💡 Use 'cal 2025' for a quick glance at holidays planning."