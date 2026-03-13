#!/bin/bash
# defensive_template.sh – A robust starting point for any new script
# Usage: ./defensive_template.sh [options]

set -euo pipefail
IFS=$'\n\t'

# ---------- Global settings ----------
VERSION="1.0.0"
VERBOSE=0

# ---------- Functions ----------
usage() {
    cat <<EOF
Usage: $0 [OPTIONS]

Options:
  -v         Verbose output
  --version  Show version
  -h, --help Show this help
EOF
    exit 0
}

log_info() {
    echo "[INFO] $*"
}

log_error() {
    echo "[ERROR] $*" >&2
}

die() {
    log_error "$*"
    exit 1
}

cleanup() {
    # Remove temporary files, etc.
    if [[ -n "${TMPFILE:-}" && -f "$TMPFILE" ]]; then
        rm -f "$TMPFILE"
        log_info "Cleaned up temporary file"
    fi
}

# ---------- Parse arguments ----------
while [[ $# -gt 0 ]]; do
    case "$1" in
        -v) VERBOSE=1 ;;
        --version) echo "Version: $VERSION"; exit 0 ;;
        -h|--help) usage ;;
        --) shift; break ;;
        -*)
            die "Unknown option: $1"
            ;;
        *) break ;;
    esac
    shift
done

# ---------- Set trap ----------
trap cleanup EXIT INT TERM

# ---------- Main ----------
log_info "Starting script..."

# Example: safe temporary file
TMPFILE=$(mktemp)
echo "Temporary data" > "$TMPFILE"

# Your script logic here
log_info "Done."
exit 0