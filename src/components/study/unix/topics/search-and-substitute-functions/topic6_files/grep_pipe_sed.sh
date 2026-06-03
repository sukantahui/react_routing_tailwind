#!/bin/bash
# grep_pipe_sed.sh - Basic pipe: grep then sed
cat > sample.log <<EOF
INFO: Starting backup
ERROR: Disk full
WARNING: Low memory
ERROR: Network timeout
INFO: Backup completed
EOF

echo "=== Original log ==="
cat sample.log

echo -e "\n=== Filter ERROR lines and replace ERROR with CRITICAL ==="
grep "ERROR" sample.log | sed 's/ERROR/CRITICAL/'