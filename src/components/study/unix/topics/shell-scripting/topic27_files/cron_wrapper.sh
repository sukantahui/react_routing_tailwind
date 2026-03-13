#!/bin/bash
# cron_wrapper.sh – source user profile then run real job
# Use this as the cron command to get a full environment

source "$HOME/.bash_profile" 2>/dev/null || source "$HOME/.profile"

# Now run the actual script with absolute path
/path/to/real_script.sh "$@"