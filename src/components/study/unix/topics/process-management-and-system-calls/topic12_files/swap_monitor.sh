#!/bin/bash
# swap_monitor.sh – monitor swap activity in real time
echo "=== Monitoring swap in/out (si/so) with vmstat (press Ctrl+C to stop) ==="
vmstat 1 10

echo -e "\n=== Swap activity using sar (if installed) ==="
if command -v sar >/dev/null; then
    sar -W 1 5
else
    echo "sar not installed. Install sysstat package."
fi

echo -e "\n=== Watch for processes doing swap I/O ==="
sudo iotop -bc -d 1 -o 2>/dev/null || echo "iotop not installed or no swap I/O currently."