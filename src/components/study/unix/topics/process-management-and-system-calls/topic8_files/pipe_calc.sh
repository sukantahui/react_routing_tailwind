#!/bin/bash
# pipe_calc.sh – two-way communication using named pipes
FIFO="/tmp/calc_fifo_$$"
mkfifo "$FIFO"

# Start a calculator that reads from FIFO
(
    while read -r line; do
        [ -z "$line" ] && continue
        result=$(echo "$line" | bc 2>/dev/null || echo "Error")
        echo "$result" > "$FIFO"
    done
) &
calc_pid=$!

# Send some calculations
for expr in "2+3" "10*5" "100/3" "scale=2; 22/7"; do
    echo "$expr" > "$FIFO"
    read -r result < "$FIFO"
    echo "$expr = $result"
done

kill $calc_pid 2>/dev/null
rm -f "$FIFO"