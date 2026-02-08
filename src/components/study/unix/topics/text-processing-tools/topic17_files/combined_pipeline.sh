#!/bin/bash
# Combined pipeline examples

echo "Combined Pipelines: sort | uniq | wc"
echo "===================================="

# Create comprehensive test data
cat > /tmp/sales_data.txt << 'EOF'
2024-01-15,Laptop,Swadeep,85000
2024-01-15,Mouse,Tuhina,1200
2024-01-16,Laptop,Swadeep,85000
2024-01-16,Keyboard,Abhronila,2500
2024-01-16,Mouse,Debangshu,1200
2024-01-17,Monitor,Tuhina,22000
2024-01-17,Laptop,Swadeep,85000
2024-01-17,Mouse,Abhronila,1200
2024-01-18,Tablet,Debangshu,45000
2024-01-18,Mouse,Tuhina,1200
EOF

echo "1. Most common product sold:"
echo "---------------------------"
cut -d',' -f2 /tmp/sales_data.txt | sort | uniq -c | sort -rn

echo -e "\n2. Sales count per customer:"
echo "------------------------------"
cut -d',' -f3 /tmp/sales_data.txt | sort | uniq -c | sort -rn

echo -e "\n3. Daily sales count:"
echo "----------------------"
cut -d',' -f1 /tmp/sales_data.txt | sort | uniq -c

echo -e "\n4. Total revenue by product:"
echo "------------------------------"
cat /tmp/sales_data.txt | while IFS=',' read date product customer price; do
    echo "$product,$price"
done | sort | awk -F',' '{arr[$1]+=$2} END {for (i in arr) print i, arr[i]}' | sort -k2 -nr

echo -e "\n5. Complete analysis:"
echo "----------------------"
echo "Total transactions:" && wc -l < /tmp/sales_data.txt
echo -e "\nUnique products:" && cut -d',' -f2 /tmp/sales_data.txt | sort -u | wc -l
echo -e "\nUnique customers:" && cut -d',' -f3 /tmp/sales_data.txt | sort -u | wc -l

echo -e "\n6. Finding duplicate entries:"
echo "-------------------------------"
echo "Checking for duplicate sales entries..."
sort /tmp/sales_data.txt | uniq -d

# Create log analysis example
cat > /tmp/server.log << 'EOF'
ERROR: Database connection failed
INFO: User login successful
WARN: High memory usage
ERROR: Database connection failed
INFO: Backup completed
ERROR: File not found
WARN: Disk space low
ERROR: Database connection failed
INFO: Cache cleared
EOF

echo -e "\n7. Log file analysis:"
echo "----------------------"
echo "Error frequency:"
grep "ERROR" /tmp/server.log | sort | uniq -c | sort -rn
echo -e "\nTotal log entries by type:"
cut -d':' -f1 /tmp/server.log | sort | uniq -c | sort -rn

# Cleanup
rm -f /tmp/sales_data.txt /tmp/server.log