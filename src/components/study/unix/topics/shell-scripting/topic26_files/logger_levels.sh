#!/bin/bash
# logger_levels.sh – configurable log levels

LOG_FILE="/tmp/app.log"
LOG_LEVEL=${LOG_LEVEL:-INFO}  # default INFO

log_debug() { [[ "$LOG_LEVEL" =~ ^(DEBUG)$ ]] && echo "$(date) DEBUG - $*" >> "$LOG_FILE"; }
log_info()  { [[ "$LOG_LEVEL" =~ ^(DEBUG|INFO)$ ]] && echo "$(date) INFO  - $*" >> "$LOG_FILE"; }
log_warn()  { echo "$(date) WARN  - $*" >> "$LOG_FILE"; }  # always shown
log_error() { echo "$(date) ERROR - $*" >> "$LOG_FILE"; }

log_debug "Loading configuration"
log_info  "Processing file $1"
log_warn  "Deprecated option used"
log_error "Could not open file"