#!/bin/bash
# cleanup_temp.sh – removes scratch files on exit or interrupt
TMPFILE=$(mktemp /tmp/example.XXXXXX)
echo "Working with $TMPFILE" > "$TMPFILE"

cleanup() {
    rm -f "$TMPFILE"
    echo "Cleaned up $TMPFILE"
}

trap cleanup EXIT INT TERM

# simulate work
sleep 5