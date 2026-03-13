#!/bin/bash
# Command grouping for variable persistence in Naihati

echo "=== Naihati Configuration Management ==="

# Initialize variables
config_loaded=false
config_version=""
services_running=0

# Group commands that update multiple variables together
{
    echo "Loading configuration..."
    
    # Simulate config loading
    config_loaded=true
    config_version="2.1.4"
    
    echo "Checking services..."
    
    # Count running services
    services_running=$(ps aux | grep -c "[s]ervice_")
    
    echo "Configuration loaded successfully"
}

# All variable changes persist
echo -e "\nConfiguration Status:"
echo "Config loaded: $config_loaded"
echo "Config version: $config_version"
echo "Services running: $services_running"

# Example of grouping with conditional execution
echo -e "\n=== Conditional Command Group ==="

if { 
    echo "Checking prerequisites..."
    [ -f "/etc/config.txt" ] && 
    [ -x "/usr/bin/processor" ] && 
    [ "$(id -u)" -eq 0 ]
}; then
    echo "All prerequisites met!"
else
    echo "Missing prerequisites!" >&2
    exit 1
fi