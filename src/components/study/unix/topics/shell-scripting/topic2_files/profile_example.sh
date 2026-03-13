#!/bin/sh
# ~/.profile - Bourne shell compatible profile
# Executed by login shells when .bash_profile doesn't exist
# Good for cross-shell compatibility

# ========== CROSS-SHELL ENVIRONMENT ==========
# These settings work in bash, sh, dash, ksh, etc.

# Set PATH so it includes user's private bin if it exists
if [ -d "$HOME/bin" ]; then
    PATH="$HOME/bin:$PATH"
fi

if [ -d "$HOME/.local/bin" ]; then
    PATH="$HOME/.local/bin:$PATH"
fi

# Set default editor (works across shells)
if [ -n "$(command -v vim)" ]; then
    EDITOR=vim
elif [ -n "$(command -v vi)" ]; then
    EDITOR=vi
elif [ -n "$(command -v nano)" ]; then
    EDITOR=nano
fi
export EDITOR

# Locale settings
export LANG=en_US.UTF-8
export LC_ALL=en_US.UTF-8

# History settings for shells that support it
if [ -n "$BASH_VERSION" ]; then
    HISTSIZE=1000
    HISTFILESIZE=2000
    HISTCONTROL=ignoreboth
    export HISTSIZE HISTFILESIZE HISTCONTROL
fi

# ========== APPLICATION PATHS ==========
# Java
if [ -d "/usr/lib/jvm/java-11-openjdk-amd64" ]; then
    JAVA_HOME="/usr/lib/jvm/java-11-openjdk-amd64"
    PATH="$JAVA_HOME/bin:$PATH"
    export JAVA_HOME
fi

# Go
if [ -d "$HOME/go" ]; then
    GOPATH="$HOME/go"
    PATH="$PATH:$GOPATH/bin"
    export GOPATH
fi

# ========== SHELL-SPECIFIC SOURCING ==========
# Source bashrc if we're in bash
if [ -n "$BASH_VERSION" ]; then
    if [ -f "$HOME/.bashrc" ]; then
        . "$HOME/.bashrc"
    fi
fi

# Source zshrc if we're in zsh
if [ -n "$ZSH_VERSION" ]; then
    if [ -f "$HOME/.zshrc" ]; then
        . "$HOME/.zshrc"
    fi
fi

# ========== WELCOME MESSAGE ==========
# Only show in interactive shells
case "$-" in
    *i*)
        echo "Welcome to $(hostname) - $(date)"
        echo "Shell: $SHELL"
        ;;
esac

# ========== EXPORT PATH LAST ==========
export PATH

# ========== LOCAL PROFILE ==========
# Source local profile if exists
if [ -f "$HOME/.profile_local" ]; then
    . "$HOME/.profile_local"
fi