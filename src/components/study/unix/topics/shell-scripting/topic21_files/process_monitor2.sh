#!/bin/bash
# Advanced process monitoring with alerts
# Used by Swadeep for Ichapur school server

threshold_cpu=80
threshold_mem=70
log_file="/var/log/process_monitor.log"

log_message() {
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] $1" >> "$log_file"
}

check_processes() {
    echo "=== Advanced Process Monitor ==="
    echo "Time: $(date)"
    echo "CPU Threshold: ${threshold_cpu}%"
    echo "Memory Threshold: ${threshold_mem}%"
    echo "================================"
    
    # Check high CPU processes
    high_cpu=$(ps aux --sort=-%cpu | awk -v threshold=$threshold_cpu 'NR>1 && $3 > threshold')
    if [ -n "$high_cpu" ]; then
        echo -e "\n⚠️ HIGH CPU PROCESSES:"
        echo "$high_cpu"
        log_message "High CPU alert: $high_cpu"
        
        # Optional: Send notification
        # echo "High CPU alert" | mail -s "Server Alert" admin@school.edu
    fi
    
    # Check high memory processes
    high_mem=$(ps aux --sort=-%mem | awk -v threshold=$threshold_mem 'NR>1 && $4 > threshold')
    if [ -n "$high_mem" ]; then
        echo -e "\n⚠️ HIGH MEMORY PROCESSES:"
        echo "$high_mem"
        log_message "High memory alert: $high_mem"
    fi
    
    # Process count by user
    echo -e "\n👤 Processes per user:"
    ps -eo user= | sort | uniq -c | sort -rn | head -5
    
    # Long running processes
    echo -e "\n⏱️ Long running processes (>30 minutes):"
    ps -eo pid,etime,cmd | awk '$2 ~ /^[0-9]+:[0-9]+:[0-9]+/ {print $0}' | head -5
    
    # Orphaned processes (PPID = 1 but not init/systemd)
    echo -e "\n👻 Orphaned processes check:"
    ps -eo pid,ppid,cmd | awk '$2 == 1 && $3 !~ /^\[/ {print $0}' | head -5
}

# Run check every 5 minutes in background
while true; do
    check_processes
    echo -e "\nSleeping for 300 seconds...\n"
    sleep 300
done