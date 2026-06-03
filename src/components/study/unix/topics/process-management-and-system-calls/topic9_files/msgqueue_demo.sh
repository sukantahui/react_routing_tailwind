#!/bin/bash
# msgqueue_demo.sh – explore System V message queues with ipcs
echo "=== Current message queues ==="
ipcs -q

echo -e "\n=== Limits (kernel parameters) ==="
echo "msgmax (max bytes per message): $(cat /proc/sys/kernel/msgmax)"
echo "msgmnb (max bytes per queue): $(cat /proc/sys/kernel/msgmnb)"
echo "msgmni (max number of queues): $(cat /proc/sys/kernel/msgmni)"

echo -e "\n=== Create a test queue (requires a C program) ==="
cat << 'EOF'
To create a queue, compile and run msgqueue_server.c in background.
Then run 'ipcs -q' to see it.
EOF