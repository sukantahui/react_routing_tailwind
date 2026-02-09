#!/usr/bin/env bash
# Script: backup_files.sh
# Purpose: Backup important files
# Author: Your Name
# Date: $(date +%Y-%m-%d)

set -euo pipefail  # Strict mode

# Configuration
BACKUP_DIR="/backup"
SOURCE_DIR="/data"

# Functions
usage() {
    echo "Usage: $0 [options]"
    echo "Options:"
    echo "  -h, --help    Show this help"
    echo "  -v, --verbose Verbose output"
}

# Main execution
main() {
    # Your logic here
    echo "Starting backup..."
}

# Execute main if script is called directly
if [[ "${BASH_SOURCE[0]}" == "${0}" ]]; then
    main "$@"
fi