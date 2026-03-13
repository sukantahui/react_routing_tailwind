#!/bin/bash
# logger_command.sh – send messages to syslog

# Tag each message with script name and PID
tag="backup_script[$$]"

logger -t "$tag" "Starting nightly backup"
rsync -av /home /backup/
if [ $? -eq 0 ]; then
    logger -t "$tag" -p user.info "Backup successful"
else
    logger -t "$tag" -p user.err "Backup failed – see details"
fi