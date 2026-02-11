#!/bin/bash
# graceful_shutdown.sh – common handler for multiple signals
shutdown() {
    echo "Received $1 – shutting down gracefully"
    # kill background jobs, close connections, etc.
    exit 0
}

trap 'shutdown SIGINT'  INT
trap 'shutdown SIGTERM' TERM
trap 'shutdown EXIT'    EXIT

echo "Running... press Ctrl+C or kill me"
while true; do sleep 2; done