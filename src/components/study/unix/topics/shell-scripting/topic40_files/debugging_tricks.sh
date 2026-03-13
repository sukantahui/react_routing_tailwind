#!/bin/bash
# debugging_tricks.sh – Advanced debugging techniques
# Usage: ./debugging_tricks.sh [--trace] [--debug-file]

set -euo pipefail
IFS=$'\n\t'

# ---------- 1. Custom PS4 with line numbers and source file ----------
export PS4='+ ${BASH_SOURCE}:${LINENO}: ${FUNCNAME[0]:+${FUNCNAME[0]}(): }'

# ---------- 2. Conditional tracing via DEBUG flag ----------
DEBUG_MODE=0
TRACE_FILE=""

while [[ $# -gt 0 ]]; do
    case "$1" in
        --trace) DEBUG_MODE=1; shift ;;
        --debug-file) TRACE_FILE="$2"; shift 2 ;;
        *) echo "Unknown option: $1"; exit 1 ;;
    esac
done

# Redirect trace output to a file if requested
if [[ -n "$TRACE_FILE" ]]; then
    exec 5> "$TRACE_FILE"
    BASH_XTRACEFD=5
fi

# Enable tracing conditionally
if [[ $DEBUG_MODE -eq 1 ]]; then
    echo "🔍 Tracing enabled"
    set -x
fi

# ---------- 3. trap DEBUG – run command before every statement ----------
debug_breakpoint() {
    # Only break if a certain condition is met
    if [[ "${CUSTOM_VAR:-}" == "break" ]]; then
        echo "🛑 Breakpoint hit at line $LINENO"
        read -p "Press Enter to continue... "
    fi
}
trap debug_breakpoint DEBUG

# ---------- Demo code ----------
CUSTOM_VAR="normal"
echo "This is a normal line."

CUSTOM_VAR="break"
echo "This line triggers the breakpoint."

CUSTOM_VAR="normal"
echo "Tracing continues."

# ---------- 4. Selective tracing: only trace a block ----------
slow_function() {
    local count="$1"
    local result=0
    # Only trace inside this function
    set -x
    for ((i=0; i<count; i++)); do
        result=$((result + i * 2))
    done
    set +x
    echo "Result: $result"
}

slow_function 3

# ---------- Cleanup ----------
if [[ $DEBUG_MODE -eq 1 ]]; then
    set +x
fi
if [[ -n "$TRACE_FILE" ]]; then
    exec 5>&-
    echo "Trace written to $TRACE_FILE"
fi

exit 0