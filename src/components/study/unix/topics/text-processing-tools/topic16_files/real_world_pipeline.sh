#!/bin/bash
# Complete production pipeline with redirection

echo "Production Pipeline with Full Redirection"
echo "========================================="

# Simulate a production log processing script
process_logs() {
    local input_log="$1"
    local output_dir="$2"
    
    echo "Processing: $input_log"
    echo "Output directory: $output_dir"
    echo "================================="
    
    # Create output directory
    mkdir -p "$output_dir"
    
    # Start processing with full error handling and logging
    {
        echo "=== Starting log processing at $(date) ==="
        
        # Extract unique IP addresses with counts
        echo -e "\n1. Top 10 IP addresses:"
        awk '{print $1}' "$input_log" | \
            sort | \
            uniq -c | \
            sort -rn | \
            head -10 | \
            tee "$output_dir/top_ips.txt"
        
        # Extract HTTP status codes
        echo -e "\n2. HTTP status code distribution:"
        awk '{print $9}' "$input_log" | \
            grep -E '^[0-9]{3}$' | \
            sort | \
            uniq -c | \
            sort -rn | \
            tee "$output_dir/status_codes.txt"
        
        # Find error pages (4xx and 5xx)
        echo -e "\n3. Error pages (4xx and 5xx):"
        awk '$9 ~ /^[45][0-9]{2}$/ {print $7}' "$input_log" | \
            sort | \
            uniq -c | \
            sort -rn | \
            head -5 | \
            tee "$output_dir/error_pages.txt"
        
        # Calculate request rate per hour
        echo -e "\n4. Requests per hour:"
        awk '{print $4}' "$input_log" | \
            cut -d: -f1,2 | \
            sort | \
            uniq -c | \
            tee "$output_dir/requests_per_hour.txt"
        
        echo -e "\n=== Processing completed at $(date) ==="
        
    } > "$output_dir/processing.log" 2> "$output_dir/errors.log"
    
    # Summary
    echo -e "\nProcessing Summary:"
    echo "-------------------"
    echo "Main log: $output_dir/processing.log ($(wc -l < "$output_dir/processing.log") lines)"
    echo "Error log: $output_dir/errors.log ($(wc -l < "$output_dir/errors.log") lines)"
    
    if [ -s "$output_dir/errors.log" ]; then
        echo -e "\nErrors found (last 5 lines):"
        tail -5 "$output_dir/errors.log"
    else
        echo -e "\nNo errors encountered."
    fi
}

# Create sample log data
mkdir -p /tmp/prod_logs
cat > /tmp/prod_logs/access.log << 'EOF'
192.168.1.1 - - [15/Jan/2024:10:30:45 +0530] "GET /index.html HTTP/1.1" 200 1234
203.0.113.5 - - [15/Jan/2024:10:31:22 +0530] "GET /about.html HTTP/1.1" 200 5678
192.168.1.1 - - [15/Jan/2024:10:32:15 +0530] "POST /login HTTP/1.1" 302 2345
198.51.100.23 - - [15/Jan/2024:10:33:01 +0530] "GET /contact.html HTTP/1.1" 404 3456
192.168.1.1 - - [15/Jan/2024:10:34:18 +0530] "GET /products.html HTTP/1.1" 200 4567
203.0.113.5 - - [15/Jan/2024:10:35:42 +0530] "GET /index.html HTTP/1.1" 200 1234
192.168.1.1 - - [15/Jan/2024:10:36:09 +0530] "GET /about.html HTTP/1.1" 200 5678
203.0.113.5 - - [15/Jan/2024:10:37:33 +0530] "GET /contact.html HTTP/1.1" 500 3456
192.168.1.1 - - [15/Jan/2024:10:38:56 +0530] "POST /logout HTTP/1.1" 302 2345
198.51.100.23 - - [15/Jan/2024:10:39:12 +0530] "GET /products.html HTTP/1.1" 200 4567
EOF

# Run the pipeline
process_logs "/tmp/prod_logs/access.log" "/tmp/prod_logs/output"

# Show results
echo -e "\nGenerated Files:"
echo "----------------"
ls -la /tmp/prod_logs/output/

# Cleanup
rm -rf /tmp/prod_logs