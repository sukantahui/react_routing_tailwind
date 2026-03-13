#!/bin/bash
# ~/.bash_profile - Bash configuration for login shells
# Executed only for login shells (SSH, console login, bash --login)

# ========== ENVIRONMENT VARIABLES ==========
# These should be set in login shells so they're available everywhere

# Editor preference
export EDITOR='vim'
export VISUAL='vim'

# Add user local bin to PATH if it exists
if [ -d "$HOME/.local/bin" ]; then
    export PATH="$HOME/.local/bin:$PATH"
fi

# Add custom scripts directory to PATH
if [ -d "$HOME/bin" ]; then
    export PATH="$HOME/bin:$PATH"
fi

# Python virtualenvwrapper
export WORKON_HOME="$HOME/.virtualenvs"
export VIRTUALENVWRAPPER_PYTHON=/usr/bin/python3
if [ -f /usr/local/bin/virtualenvwrapper.sh ]; then
    source /usr/local/bin/virtualenvwrapper.sh
fi

# Go language
export GOPATH="$HOME/go"
export PATH="$PATH:$GOPATH/bin"

# Node Version Manager (nvm)
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"

# Java
export JAVA_HOME=/usr/lib/jvm/java-11-openjdk-amd64

# ========== SECURITY SETTINGS ==========
# Set secure umask (read/write for user, read for group/others)
umask 022

# ========== LOCALE SETTINGS ==========
export LANG='en_US.UTF-8'
export LC_ALL='en_US.UTF-8'

# ========== APPLICATION-SPECIFIC ==========
# Docker
export DOCKER_BUILDKIT=1

# PostgreSQL
export PGDATA="$HOME/postgres_data"

# ========== SOURCE .bashrc ==========
# Always source .bashrc for consistent shell experience
if [ -f ~/.bashrc ]; then
    . ~/.bashrc
fi

# ========== LOGIN-SPECIFIC ACTIONS ==========
# Display system information on login
if [ -t 0 ]; then
    echo "Welcome back, $(whoami)!"
    echo "System: $(uname -srm)"
    echo "Uptime: $(uptime -p)"
    echo ""
fi

# ========== LOCAL LOGIN SETTINGS ==========
# Source local bash_profile if exists
if [ -f ~/.bash_profile_local ]; then
    . ~/.bash_profile_local
fi