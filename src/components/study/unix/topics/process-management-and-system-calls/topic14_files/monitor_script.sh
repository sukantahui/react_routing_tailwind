#!/bin/bash
# monitor_script.sh – log top output for a specific process over time
if [ -z "$1" ]; then
    echo "Usage: $0 <process_name> [duration_seconds]"
    exit 1
fi

PROCESS_NAME="$1"
DURATION=${2:-30}
LOGFILE="top_monitor_${PROCESS_NAME}.log"

echo "Monitoring process '$PROCESS_NAME' for $DURATION seconds. Logging to $LOGFILE"
echo "Timestamp, PID, %CPU, %MEM, RES" > "$LOGFILE"

# Get PID(s) of the process
PIDS=$(pgrep "$PROCESS_NAME" | tr '\n' ',' | sed 's/,$//')
if [ -z "$PIDS" ]; then
    echo "No process found with name '$PROCESS_NAME'"
    exit 1
fi

echo "Monitoring PIDs: $PIDS"

END=$((SECONDS + DURATION))
while [ $SECONDS -lt $END ]; do
    TIMESTAMP=$(date +%Y-%m-%d\ %H:%M:%S)
    top -b -n 1 -p "$PIDS" | tail -n +8 | while read -r line; do
        PID=$(echo "$line" | awk '{print $1}')
        CPU=$(echo "$line" | awk '{print $9}')
        MEM=$(echo "$line" | awk '{print $10}')
        RES=$(echo "$line" | awk '{print $6}')
        echo "$TIMESTAMP, $PID, $CPU, $MEM, $RES" >> "$LOGFILE"
    done
    sleep 2
done

echo "Monitoring complete. Output saved to $LOGFILE"
echo "Sample output:"
head -5 "$LOGFILE"