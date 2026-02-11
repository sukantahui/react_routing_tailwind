#!/bin/bash
# git_status_prompt.sh – Display Git branch in the shell prompt
# Source this file from .bashrc to enable.

git_branch() {
    # Quietly get the current Git branch name
    git symbolic-ref --short HEAD 2>/dev/null || return 1
}

# Customise PS1 – works in bash; for POSIX sh, use PS1 directly
if [ -n "$BASH" ]; then
    PS1='\u@\h:\w $(git_branch && echo " (")$(git_branch)\[\033[00m\]) \$ '
fi