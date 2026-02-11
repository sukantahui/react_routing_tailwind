#!/bin/bash
# cron_manager.sh – Add, list, and remove cron jobs programmatically
# Usage: ./cron_manager.sh [list|add|remove] [cron_spec] [command]

set -euo pipefail
IFS=$'\n\t'

# ---------- Functions ----------
die() {
    echo "ERROR: $*" >&2
    exit 1
}

usage() {
    cat <<EOF
Usage: $0 COMMAND [OPTIONS]

Commands:
  list                     Show current crontab entries
  add "cron_spec command"  Add a new cron job (if not already present)
  remove "pattern"         Remove all jobs matching the given pattern (grep)

Options:
  -d, --dry-run           Show what would be done, but don't modify crontab
  -h, --help              Show this help

Examples:
  $0 list
  $0 add "30 2 * * * /usr/local/bin/backup.sh"
  $0 remove "backup.sh"
EOF
    exit 0
}

# Get current crontab; if none, use empty file
get_crontab() {
    crontab -l 2>/dev/null || true
}

# Show crontab
cmd_list() {
    if [[ -n "$(get_crontab)" ]]; then
        get_crontab
    else
        echo "No crontab for user $(whoami)"
    fi
}

# Add a job if not already present
cmd_add() {
    local entry="$1"
    local crontab_current
    crontab_current=$(get_crontab)
    
    if echo "$crontab_current" | grep -Fq -- "$entry"; then
        echo "Job already exists in crontab. Skipping." >&2
        return 0
    fi
    
    if [[ $DRY_RUN -eq 1 ]]; then
        echo "[DRY RUN] Would add: $entry"
    else
        # Backup current crontab
        backup_file="/tmp/crontab.backup.$(date '+%Y%m%d_%H%M%S')"
        echo "$crontab_current" > "$backup_file"
        echo "Backup saved to $backup_file"
        
        # Add new entry
        (echo "$crontab_current"; echo "$entry") | crontab -
        echo "Cron job added: $entry"
    fi
}

# Remove all jobs containing given pattern
cmd_remove() {
    local pattern="$1"
    local crontab_current
    crontab_current=$(get_crontab)
    
    if [[ -z "$crontab_current" ]]; then
        echo "No crontab to modify." >&2
        return 0
    fi
    
    # Filter out lines matching pattern
    local new_crontab
    new_crontab=$(echo "$crontab_current" | grep -Ev -- "$pattern" || true)
    
    if [[ "$crontab_current" == "$new_crontab" ]]; then
        echo "No jobs matching pattern '$pattern' found." >&2
        return 0
    fi
    
    if [[ $DRY_RUN -eq 1 ]]; then
        echo "[DRY RUN] Would remove lines containing: $pattern"
        echo "Removed:"
        diff --unchanged-line-format='' --old-line-format='%L' \
            <(echo "$crontab_current") <(echo "$new_crontab") || true
    else
        backup_file="/tmp/crontab.backup.$(date '+%Y%m%d_%H%M%S')"
        echo "$crontab_current" > "$backup_file"
        echo "Backup saved to $backup_file"
        
        echo "$new_crontab" | crontab -
        echo "Removed jobs matching pattern: $pattern"
    fi
}

# ---------- Main ----------
DRY_RUN=0

# Parse options
ARGS=()
while [[ $# -gt 0 ]]; do
    case "$1" in
        -d|--dry-run) DRY_RUN=1; shift ;;
        -h|--help) usage ;;
        --) shift; break ;;
        -*) die "Unknown option: $1" ;;
        *) ARGS+=("$1"); shift ;;
    esac
done

set -- "${ARGS[@]}"

if [[ $# -eq 0 ]]; then
    die "Missing command. Use -h for help."
fi

COMMAND="$1"
shift

case "$COMMAND" in
    list)
        cmd_list
        ;;
    add)
        [[ $# -ge 1 ]] || die "add requires a cron entry string."
        cmd_add "$*"
        ;;
    remove)
        [[ $# -ge 1 ]] || die "remove requires a pattern."
        cmd_remove "$1"
        ;;
    *)
        die "Unknown command: $COMMAND"
        ;;
esac

exit 0