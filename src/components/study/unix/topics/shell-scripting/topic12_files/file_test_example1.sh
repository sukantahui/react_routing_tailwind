#!/bin/bash
# Check if configuration file exists
CONFIG_FILE="/etc/myapp/config.json"

if [ -f "$CONFIG_FILE" ]; then
    echo "Configuration file found. Loading settings..."
    source "$CONFIG_FILE"
else
    echo "Error: Configuration file not found at $CONFIG_FILE"
    echo "Creating default configuration..."
    create_default_config
fi