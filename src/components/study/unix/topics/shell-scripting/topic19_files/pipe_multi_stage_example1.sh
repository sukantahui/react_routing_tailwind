#!/bin/bash
# Data processing pipeline for Ichapur analytics

echo "=== Ichapur Data Processing Pipeline ==="

# Create sample data file
DATA_FILE="/tmp/ichapur_sales.csv"
cat > "$DATA_FILE" << 'EOF'
date,product,region,quantity,price
2024-01-15,Widget A,North,150,25.50
2024-01-15,Widget B,South,200,18.75
2024-01-15,Widget A,East,180,25.50
2024-01-15,Widget C,West,90,32.00
2024-01-16,Widget B,North,220,18.75
2024-01-16,Widget A,South,170,25.50
2024-01-16,Widget C,East,110,32.00
2024-01-16,Widget B,West,190,18.75
2024-01-17,Widget A,North,160,25.50
2024-01-17,Widget C,South,85,32.00
EOF

echo "Processing sales data from: $DATA_FILE"
echo "=========================================="

# Multi-stage pipeline 1: Daily sales summary
echo -e "\n1. Daily Sales Summary:"
cat "$DATA_FILE" | \
    tail -n +2 | \                # Skip header
    awk -F, '{print $1, $4 * $5}' | \    # Calculate revenue
    awk '{
        date=$1
        revenue=$2
        total[date] += revenue
        count[date]++
    }
    END {
        for (date in total) {
            printf "%s: $%.2f (avg: $%.2f)\n", 
                   date, total[date], total[date]/count[date]
        }
    }' | \
    sort

# Multi-stage pipeline 2: Product performance
echo -e "\n2. Product Performance Ranking:"
cat "$DATA_FILE" | \
    tail -n +2 | \
    awk -F, '{
        product=$2
        quantity=$4
        price=$5
        revenue[product] += quantity * price
        units[product] += quantity
    }
    END {
        for (product in revenue) {
            avg_price = revenue[product] / units[product]
            printf "%s,%.0f,%.2f,%.2f\n", 
                   product, units[product], revenue[product], avg_price
        }
    }' | \
    sort -t, -k3 -nr | \          # Sort by revenue
    awk -F, 'BEGIN {
        print "Product,Units,Revenue,Avg Price"
        print "--------------------------------"
    }
    {
        printf "%-10s %6d $%9.2f $%8.2f\n", $1, $2, $3, $4
    }'

# Multi-stage pipeline 3: Regional analysis
echo -e "\n3. Regional Analysis:"
cat "$DATA_FILE" | \
    tail -n +2 | \
    awk -F, '{
        region=$3
        product=$2
        quantity=$4
        region_quantity[region] += quantity
        product_quantity[region,product] += quantity
    }
    END {
        # First pass: total by region
        for (region in region_quantity) {
            printf "Region: %s\n", region
            printf "  Total units: %d\n", region_quantity[region]
            printf "  Product breakdown:\n"
            
            # Second pass: products in this region
            for (key in product_quantity) {
                split(key, parts, SUBSEP)
                if (parts[1] == region) {
                    printf "    - %s: %d units\n", parts[2], product_quantity[key]
                }
            }
            print ""
        }
    }'

# Multi-stage pipeline 4: Complex transformation
echo -e "\n4. Data Quality Check:"
cat "$DATA_FILE" | \
    tail -n +2 | \
    awk -F, '{
        # Flag suspicious entries
        if ($4 <= 0) {
            printf "ERROR: Invalid quantity on %s: %s\n", $1, $0
        } else if ($5 <= 0) {
            printf "ERROR: Invalid price on %s: %s\n", $1, $0
        } else if ($4 > 1000) {
            printf "WARN: Large order on %s: %d units\n", $1, $4
        } else {
            print "OK: " $0
        }
    }' | \
    grep -E "(ERROR|WARN)" | \
    sort

# Multi-stage pipeline 5: Create summary report
echo -e "\n5. Generating Summary Report..."
cat "$DATA_FILE" | \
    tail -n +2 | \
    awk -F, 'BEGIN {
        total_revenue = 0
        total_units = 0
        products_count = 0
        split("", products_seen)
    }
    {
        revenue = $4 * $5
        total_revenue += revenue
        total_units += $4
        
        if (!($2 in products_seen)) {
            products_seen[$2] = 1
            products_count++
        }
    }
    END {
        print "=== Ichapur Sales Summary ==="
        print "Period: 2024-01-15 to 2024-01-17"
        print "Total Revenue: $" total_revenue
        print "Total Units Sold: " total_units
        print "Average Price: $" total_revenue/total_units
        print "Unique Products: " products_count
        print "Average Daily Revenue: $" total_revenue/3
    }'

# Cleanup
rm -f "$DATA_FILE"