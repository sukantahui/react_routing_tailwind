# topic9_files/command_sub_basic2.sh
#!/bin/bash
# Inline command substitution

# Direct usage in echo
echo "Current directory: $(pwd)"
echo "Logged in as: $(whoami)"
echo "System uptime: $(uptime -p)"

# Using in file operations
echo "Creating backup of config files..."
tar -czf "backup-$(date +%s).tar.gz" /etc/*.conf
echo "Backup created: backup-$(date +%s).tar.gz"