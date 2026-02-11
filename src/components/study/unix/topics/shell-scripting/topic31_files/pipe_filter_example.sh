#!/bin/sh
# pipe_filter_example.sh – A filter: reads lines, prepends timestamp, writes to stdout
# Example: ./pipe_filter_example.sh < access.log > annotated.log

while IFS= read -r line; do
    printf "%s | %s\n" "$(date '+%Y-%m-%d %H:%M:%S')" "$line"
done

# Exit status: success if all reads succeeded
exit 0