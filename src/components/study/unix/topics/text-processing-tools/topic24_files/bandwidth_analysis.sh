#!/bin/bash
# Topic 24: Bandwidth Consumption Analysis
# Calculate total bandwidth usage by file type

echo "=== Bandwidth Usage Analysis ==="
echo ""

# 1. Total bandwidth consumed
echo "1. TOTAL BANDWIDTH CONSUMED:"
total_bytes=$(awk '{sum += $10} END {print sum}' access.log)
total_mb=$(echo "scale=2; $total_bytes / 1048576" | bc)
echo "   Total data transferred: $total_mb MB"
echo ""

# 2. Bandwidth by file extension
echo "2. BANDWIDTH BY FILE TYPE:"
echo "   Type     | Size (MB) | % of Total"
echo "   ---------------------------------"
awk '
{
    # Extract file extension
    if (match($7, /\.[a-zA-Z0-9]+$/)) {
        ext = substr($7, RSTART, RLENGTH)
    } else {
        ext = "no_ext"
    }
    bytes[ext] += $10
    total += $10
}
END {
    for (ext in bytes) {
        mb = bytes[ext] / 1048576
        percentage = (bytes[ext] / total) * 100
        printf "   %-9s| %-9.2f | %.1f%%\n", ext, mb, percentage
    }
}' access.log | sort -rnk2
echo ""

# 3. Largest files served
echo "3. LARGEST FILES SERVED:"
echo "   Size (KB) | URL"
echo "   -----------------------------"
awk '{printf "%d %s\n", $10/1024, $7}' access.log | sort -rn | head -10 | \
  awk '{printf "   %-10s| %s\n", $1, substr($0, index($0,$2))}'
echo ""

# 4. Bandwidth by hour
echo "4. BANDWIDTH USAGE BY HOUR:"
echo "   Hour   | MB Transferred"
echo "   -----------------------"
awk -F: '{bytes[$2] += $NF} END {
    for (hour in bytes) {
        mb = bytes[hour] / 1048576
        printf "   %-6s | %.2f MB\n", hour ":00", mb
    }
}' access.log | sort
echo ""

# 5. Average file size
echo "5. AVERAGE FILE SIZE STATISTICS:"
awk '$10 > 0 {
    count++
    sum += $10
    if ($10 > max) max = $10
    if (count == 1) min = $10
    if ($10 < min) min = $10
}
END {
    avg = sum / count
    print "   Average file size: " int(avg/1024) " KB"
    print "   Largest file: " int(max/1024) " KB"
    print "   Smallest file: " int(min/1024) " KB"
    print "   Total files served: " count
}' access.log