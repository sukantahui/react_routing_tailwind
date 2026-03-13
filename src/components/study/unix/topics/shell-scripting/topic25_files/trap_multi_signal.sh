#!/bin/bash
# critical_section.sh – ignore Ctrl+C during sensitive operation
echo "Critical operation – Ctrl+C disabled"
trap '' INT
sleep 3
echo "Critical part finished – restoring Ctrl+C"
trap - INT
sleep 3
echo "Normal operation, you can interrupt now"