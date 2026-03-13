#!/bin/sh
# auto_backup_to_git.sh – Automated daily commit and push
# Intended to be run via cron.

REPO_DIR="$HOME/scripts"
cd "$REPO_DIR" || exit 1

# Stage all changes (new, modified, deleted)
git add --all

# If there's nothing to commit, exit gracefully
if git diff --cached --quiet; then
    echo "No changes to commit."
    exit 0
fi

# Commit with timestamp
git commit -m "Automated backup: $(date '+%Y-%m-%d %H:%M:%S')"

# Push to remote (if configured)
git push origin main 2>/dev/null || echo "Push failed – check remote."