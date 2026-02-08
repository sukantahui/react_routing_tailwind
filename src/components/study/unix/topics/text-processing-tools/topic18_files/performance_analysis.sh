#!/bin/bash
# Performance analysis script

echo "Performance Analysis from Logs"
echo "=============================="

# Create performance log with response times
cat > /tmp/performance.log << 'EOF'
192.168.1.1 - - [15/Jan/2024:10:30:45 +0530] "GET /index.html HTTP/1.1" 200 1234 0.045
203.0.113.5 - - [15/Jan/2024:10:31:22 +0530] "GET /api/users HTTP/1.1" 200 5678 1.234
192.168.1.1 - - [15/Jan/2024:10:32:15 +0530] "POST /login HTTP/1.1" 302 2345 0.125
198.51.100.23 - - [15/Jan/2024:10:33:01 +0530] "GET /products.html HTTP/1.1" 200 4567 0.089
192.168.1.1 - - [15/Jan/2024:10:34:18 +0530] "GET /admin/dashboard HTTP/1.1" 200 3456 2.567
203.0.113.5 - - [15/Jan/2024:10:35:42 +0530] "GET /index.html HTTP/1.1" 200 1234 0.042
192.168.1.1 - - [15/Jan/2024:10:36:09 +0530] "GET /api/products HTTP/1.1" 200 34567 1.890
203.0.113.5 - - [15/Jan/2024:10:37:33 +0530] "GET /contact.html HTTP/1.1" 200 3456 0.067
192.168.1.1 - - [15/Jan/2024:10:38:56 +0530] "POST /api/order HTTP/1.1" 200 5678 3.456
198.51.100.23 - - [15/Jan/2024:10:39:12 +0530] "GET /products.html HTTP/1.1" 200 4567 0.091
EOF

echo "1. Response time statistics (last field):"
echo "----------------------------------------"
awk '{print $NF}' /tmp/performance.log | sort -n | awk '
    NR == 1 {min = $1}
    {sum += $1; sumsq += $1*$1}
    NR == 1 || $1 < min {min = $1}
    NR == 1 || $1 > max {max = $1}
    END {
        print "Min:", min "s";
        print "Max:", max "s";
        print "Avg:", sum/NR "s";
        print "Std Dev:", sqrt(sumsq/NR - (sum/NR)**2) "s"
    }
'

echo -e "\n2. Slowest endpoints (> 1 second):"
echo "-----------------------------------"
awk '$NF > 1 {print $7, $NF "s"}' /tmp/performance.log | sort -k2 -nr

echo -e "\n3. Average response time by endpoint:"
echo "---------------------------------------"
awk '{endpoint=$7; time=$NF; count[endpoint]++; sum[endpoint]+=time} 
     END {for (e in sum) print e, sum[e]/count[e] "s"}' /tmp/performance.log | sort -k2 -nr

echo -e "\n4. Requests per minute:"
echo "-------------------------"
awk '{print $4}' /tmp/performance.log | cut -d: -f1,2 | sort | uniq -c

echo -e "\n5. Throughput analysis:"
echo "-------------------------"
echo "Total requests:" $(wc -l < /tmp/performance.log)
echo "Total response time:" $(awk '{sum+=$NF} END {print sum "s"}' /tmp/performance.log)
echo "Requests per second:" $(awk 'END {print NR/600}' /tmp/performance.log)

echo -e "\n6. Performance by HTTP method:"
echo "--------------------------------"
awk '{method=$6; gsub(/"/, "", method); time=$NF; count[method]++; sum[method]+=time} 
     END {for (m in sum) print m, sum[m]/count[m] "s", "(" count[m] " requests)"}' /tmp/performance.log

# Create database query log
cat > /tmp/db_performance.log << 'EOF'
2024-01-15 10:30:45 SELECT * FROM users WHERE id=1 - 0.045s
2024-01-15 10:31:22 SELECT * FROM orders WHERE user_id=42 - 1.234s
2024-01-15 10:32:15 UPDATE users SET last_login=NOW() WHERE id=1 - 0.125s
2024-01-15 10:33:01 SELECT * FROM products WHERE category='electronics' - 2.567s
2024-01-15 10:34:18 SELECT COUNT(*) FROM orders WHERE status='pending' - 0.089s
2024-01-15 10:35:42 INSERT INTO logs (message) VALUES ('test') - 0.042s
2024-01-15 10:36:09 SELECT * FROM products JOIN categories ON products.category_id=categories.id - 3.456s
EOF

echo -e "\n7. Database query analysis:"
echo "----------------------------"
echo "Slow queries (> 1s):"
grep -E '[0-9]+\.[0-9]+s$' /tmp/db_performance.log | awk '{if ($NF+0 > 1) print $0}'
echo -e "\nQuery types:"
awk '{print $4}' /tmp/db_performance.log | sort | uniq -c | sort -rn

# Cleanup
rm -f /tmp/performance.log /tmp/db_performance.log