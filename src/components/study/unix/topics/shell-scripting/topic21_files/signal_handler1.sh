#!/bin/bash
# Graceful shutdown with signal handling
# For Naihati High School database maintenance

# Trap signals for graceful shutdown
trap 'cleanup_and_exit' SIGTERM SIGINT SIGQUIT

cleanup_and_exit() {
    echo -e "\n⚠️ Received shutdown signal"
    echo "Stopping database connections..."
    
    # Gracefully stop background processes
    if [ -n "$backup_pid" ]; then
        echo "Stopping backup process (PID: $backup_pid)..."
        kill -TERM $backup_pid 2>/dev/null
        wait $backup_pid 2>/dev/null
    fi
    
    if [ -n "$index_pid" ]; then
        echo "Stopping index process (PID: $index_pid)..."
        kill -TERM $index_pid 2>/dev/null
        wait $index_pid 2>/dev/null
    fi
    
    echo "Closing database connections..."
    # Actual cleanup code here
    sleep 2
    
    echo "✅ Cleanup complete. Exiting."
    exit 0
}

# Main process
echo "Starting database maintenance..."

# Start background tasks
echo "1. Starting database backup..."
backup_database.sh &
backup_pid=$!

echo "2. Starting index optimization..."
optimize_indexes.sh &
index_pid=$!

echo "3. Starting log rotation..."
rotate_logs.sh &
log_pid=$!

echo -e "\n📊 Process Status:"
echo "Backup PID: $backup_pid"
echo "Index PID: $index_pid"
echo "Log PID: $log_pid"

# Wait for all processes
echo -e "\n⏳ Monitoring processes..."
wait $backup_pid
backup_status=$?

wait $index_pid
index_status=$?

wait $log_pid
log_status=$?

echo -e "\n✅ Maintenance completed"
exit 0