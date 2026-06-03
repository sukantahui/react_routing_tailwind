#!/bin/bash
# init_check.sh – identify init system and PID 1 details
echo "=== PID 1 Information ==="
echo "Command line of PID 1:"
cat /proc/1/cmdline | tr '\0' ' ' && echo
echo -e "\nInit executable:"
ls -l /sbin/init
echo -e "\nSystemd version (if any):"
systemd --version 2>/dev/null || echo "Not systemd"
echo -e "\nUpstart version (if any):"
/sbin/init --version 2>&1 | grep -i upstart || echo "Not Upstart"
echo -e "\nParent of init (should be 0):"
ps -o ppid= -p 1