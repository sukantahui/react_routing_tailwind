#!/bin/bash
# scheduler_observe.sh – monitor scheduler metrics
echo "=== System uptime and load average (run queue length) ==="
uptime

echo -e "\n=== Context switches and run queue (cs and r columns) ==="
vmstat 1 5

echo -e "\n=== Scheduler statistics from /proc/schedstat ==="
head -5 /proc/schedstat

echo -e "\n=== Real‑time processes in the system ==="
ps -e -o pid,policy,pri,comm | awk '$2 ~ /FF|RR/ {print}'