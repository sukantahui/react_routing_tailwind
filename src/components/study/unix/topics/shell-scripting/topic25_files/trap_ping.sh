#!/bin/bash
# ping_with_lock.sh – production lock handling
LOCKFILE="/tmp/ping_monitor.lock"
exec 200>"$LOCKFILE"
flock -n 200 || exit 1  # fail if already running

cleanup() {
    flock -u 200
    rm -f "$LOCKFILE"
    echo "Lock released"
}
trap cleanup EXIT INT TERM

ping -c 10 google.com > /tmp/ping_output.log