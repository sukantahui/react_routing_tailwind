#!/bin/bash
# getpid_demo.sh – explore PID and PPID in shell
echo "=== Current shell ==="
echo "Shell PID ($$): $$"
echo "Parent PID (\$PPID): $PPID"
echo "Subshell PID: $(echo $$) vs subshell actual: $(bash -c 'echo $BASHPID')"

echo -e "\n=== Start a background process ==="
sleep 30 &
bg_pid=$!
echo "Background sleep PID: $bg_pid"
echo "Parent of background process (should be current shell):"
ps -o pid,ppid,comm -p $bg_pid

echo -e "\n=== Killing parent would reparent? (not doing) ==="
echo "To see reparenting: kill $$ and then check PPID of the sleep process from another terminal."