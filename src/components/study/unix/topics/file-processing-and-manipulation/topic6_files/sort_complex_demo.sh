#!/bin/bash
# sort_complex_demo.sh - IP sorting, version sort, nested keys
# 1. Sorting IP addresses by numeric octets
cat > ips.txt <<EOF
192.168.1.10
10.0.0.1
192.168.2.5
172.16.0.1
EOF

echo "=== IP sort (correct) ==="
sort -t. -k1,1n -k2,2n -k3,3n -k4,4n ips.txt

# 2. Version sort (-V)
echo -e "\n=== Version sort ==="
cat > versions.txt <<EOF
1.2
1.10
2.0
1.2.1
EOF
sort -V versions.txt

# 3. Combined keys with global options
echo -e "\n=== Department (field 1), then Salary (field 3) descending, using tab delimiter ==="
cat > payroll.tsv <<EOF
IT	Swadeep	50000
HR	Tuhina	45000
IT	Abhronila	55000
HR	Debangshu	48000
EOF
sort -k1,1 -k3,3nr payroll.tsv

# Cleanup
rm ips.txt versions.txt payroll.tsv