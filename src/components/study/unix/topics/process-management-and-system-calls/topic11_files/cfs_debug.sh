#!/bin/bash
# cfs_debug.sh – examine CFS scheduler parameters
echo "=== CFS tunable parameters ==="
sysctl kernel.sched_min_granularity_ns
sysctl kernel.sched_latency_ns
sysctl kernel.sched_wakeup_granularity_ns

echo -e "\n=== Current process vruntime (if available) ==="
if [ -r /proc/$$/sched ]; then
    grep vruntime /proc/$$/sched
fi

echo -e "\n=== Scheduler debug info (first few lines) ==="
if [ -r /proc/sched_debug ]; then
    head -20 /proc/sched_debug
else
    echo "/proc/sched_debug not readable (requires root)"
fi