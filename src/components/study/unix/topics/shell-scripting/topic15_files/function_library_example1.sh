#!/bin/bash
# Function library for Naihati project utilities
# Save as: /usr/local/lib/naihati_utils.sh

# Color codes for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Logging functions
log_info() {
    echo -e "${GREEN}[INFO]${NC} $*"
}

log_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $*" >&2
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $*" >&2
}

# File system utilities
ensure_directory() {
    local dir="$1"
    
    if [[ ! -d "$dir" ]]; then
        log_info "Creating directory: $dir"
        mkdir -p "$dir"
        
        if [[ $? -ne 0 ]]; then
            log_error "Failed to create directory: $dir"
            return 1
        fi
    fi
}

safe_copy() {
    local src="$1"
    local dst="$2"
    
    if [[ ! -f "$src" ]]; then
        log_error "Source file not found: $src"
        return 1
    fi
    
    # Create destination directory if needed
    local dst_dir=$(dirname "$dst")
    ensure_directory "$dst_dir" || return 1
    
    cp "$src" "$dst"
    
    if [[ $? -eq 0 ]]; then
        log_info "Copied: $src → $dst"
        return 0
    else
        log_error "Failed to copy: $src → $dst"
        return 1
    fi
}

# System monitoring
check_disk_usage() {
    local threshold="${1:-80}"  # Default 80%
    local partitions=("/" "/var" "/home")
    
    for partition in "${partitions[@]}"; do
        local usage=$(df "$partition" | awk 'NR==2 {print $5}' | sed 's/%//')
        
        if [[ "$usage" -ge "$threshold" ]]; then
            log_warning "High disk usage on $partition: ${usage}%"
            return 1
        else
            log_info "Disk usage on $partition: ${usage}% (OK)"
        fi
    done
    
    return 0
}