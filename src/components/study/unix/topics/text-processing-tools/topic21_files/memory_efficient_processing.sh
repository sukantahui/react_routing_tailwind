#!/bin/bash
# Memory-Efficient Processing Patterns
# Techniques for processing files larger than available memory

echo "=== Memory-Efficient Processing ==="
echo ""

# Create a very large file (simulated)
echo "Note: Using smaller file for demonstration, but techniques work for huge files"
echo ""

cat > /tmp/huge_data.txt << 'EOF'
transaction_001,user_123,product_A,2,50.00,2023-12-01
transaction_002,user_456,product_B,1,25.50,2023-12-01
transaction_003,user_123,product_C,3,75.00,2023-12-02
transaction_004,user_789,product_A,1,50.00,2023-12-02
transaction_005,user_456,product_B,2,51.00,2023-12-03
transaction_006,user_123,product_D,1,30.00,2023-12-03
transaction_007,user_999,product_A,5,250.00,2023-12-04
transaction_008,user_123,product_B,1,25.50,2023-12-04
transaction_009,user_456,product_C,2,50.00,2023-12-05
transaction_010,user_789,product_D,3,90.00,2023-12-05
EOF

echo "Sample data (imagine this is 50GB instead of 10 lines):"
cat /tmp/huge_data.txt
echo ""

echo "=== Problem: Find total sales per user ==="
echo ""

echo "Memory-inefficient approach (might fail with huge files):"
echo "  awk -F, '{sales[\$2] += \$4 * \$5} END {for(u in sales) print u, sales[u]}' /tmp/huge_data.txt"
echo ""
echo "This loads all user data into memory. For 50GB file with millions of users,"
echo "this could exceed available RAM."
echo ""

echo "=== Solution 1: External Sorting ==="
echo ""

echo "Step 1: Extract and sort user data:"
echo "cut -d, -f2,4,5 /tmp/huge_data.txt | sort -t, -k1,1 > /tmp/sorted_users.txt"
echo ""
echo "Step 2: Process sorted data (memory efficient):"
cat > /tmp/process_sorted.awk << 'EOF'
BEGIN {FS=","; current_user=""; total=0}
{
    if (current_user != $1) {
        if (current_user != "") print current_user, total
        current_user = $1
        total = $2 * $3
    } else {
        total += $2 * $3
    }
}
END {if (current_user != "") print current_user, total}
EOF

echo "awk -f /tmp/process_sorted.awk /tmp/sorted_users.txt"
echo ""

echo "=== Solution 2: Database Approach ==="
echo ""

echo "For extremely large files, consider loading into SQLite:"
cat > /tmp/load_to_sqlite.sh << 'EOF'
#!/bin/bash
# Create SQLite database
sqlite3 /tmp/sales.db << SQL
CREATE TABLE transactions (
    id TEXT,
    user_id TEXT,
    product TEXT,
    quantity INTEGER,
    price REAL,
    date TEXT
);

.separator ","
.import /tmp/huge_data.txt transactions

CREATE INDEX idx_user ON transactions(user_id);

SELECT user_id, SUM(quantity * price) as total
FROM transactions
GROUP BY user_id;
SQL
EOF

echo "chmod +x /tmp/load_to_sqlite.sh"
echo "/tmp/load_to_sqlite.sh"
echo ""

echo "=== Solution 3: Chunk Processing ==="
echo ""

echo "Split file and process chunks:"
cat > /tmp/chunk_processor.sh << 'EOF'
#!/bin/bash
# Split file into 1M line chunks
split -l 1000000 /tmp/huge_data.txt /tmp/chunk_

# Process each chunk
for chunk in /tmp/chunk_*; do
    awk -F, '{sales[$2] += $4 * $5} END {for(u in sales) print u, sales[u]}' "$chunk" >> /tmp/partial_results.txt
done

# Combine results
awk '{total[$1] += $2} END {for(u in total) print u, total[u]}' /tmp/partial_results.txt
EOF

echo "chmod +x /tmp/chunk_processor.sh"
echo "/tmp/chunk_processor.sh"
echo ""

echo "=== Solution 4: Use disk-backed associative array ==="
echo ""

echo "Using GNU datamash for memory efficiency:"
echo "datamash -t, -s -g 2 sum 4 5 < /tmp/huge_data.txt | awk -F, '{print \$1, \$2 * \$3}'"
echo ""

echo "=== Memory Usage Comparison ==="
echo ""
echo "Technique                | Memory | Disk I/O | Speed"
echo "-------------------------|--------|----------|------"
echo "In-memory awk hash      | HIGH   | LOW      | FAST"
echo "External sort + awk     | LOW    | HIGH     | MEDIUM"
echo "SQLite database         | LOW    | HIGH     | SLOW"
echo "Chunk processing        | MEDIUM | HIGH     | MEDIUM"
echo ""

echo "=== Recommendation ==="
echo "1. Files < 2GB: Use awk with associative arrays"
echo "2. Files 2GB-20GB: Use external sorting"
echo "3. Files > 20GB: Consider database or chunk processing"