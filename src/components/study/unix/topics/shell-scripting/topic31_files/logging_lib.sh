#!/bin/sh
# logging_lib.sh – Reusable logging functions
# Source this file from other scripts: . /path/to/logging_lib.sh

# Guard against multiple sourcing
[ -n "$_LOGGING_LIB" ] && return
_LOGGING_LIB=1

# Log an informational message (to stdout)
log_info() {
    echo "[INFO] $(date '+%Y-%m-%d %H:%M:%S') - $*"
}

# Log an error message (to stderr)
log_error() {
    echo "[ERROR] $(date '+%Y-%m-%d %H:%M:%S') - $*" >&2
}

# Print a fatal error and exit the script
die() {
    log_error "$*"
    exit 1
}

# Set verbose mode (if -v is passed)
debug() {
    [ "$VERBOSE" = "1" ] && echo "[DEBUG] $*" >&2
}