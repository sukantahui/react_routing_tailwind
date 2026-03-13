#!/bin/bash
# Creating and Installing Scripts

echo "=== Professional Script Installation Guide ==="
echo ""

# Create a sample useful script
create_sample_script() {
    local script_name="$1"
    
    cat > "$script_name" << 'EOF'
#!/bin/bash
# backup_files.sh - Professional backup script
# Usage: backup_files [source_dir] [backup_name]

set -e  # Exit on error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Default values
SOURCE_DIR="${1:-.}"
BACKUP_NAME="${2:-backup_$(date +%Y%m%d_%H%M%S)}"
BACKUP_DIR="$HOME/backups"

# Create backup directory if it doesn't exist
mkdir -p "$BACKUP_DIR"

# Validate source directory
if [ ! -d "$SOURCE_DIR" ]; then
    echo -e "${RED}Error: Source directory '$SOURCE_DIR' not found${NC}" >&2
    exit 1
fi

echo -e "${YELLOW}Starting backup...${NC}"
echo "Source: $SOURCE_DIR"
echo "Backup: $BACKUP_DIR/$BACKUP_NAME.tar.gz"

# Create backup
tar czf "$BACKUP_DIR/$BACKUP_NAME.tar.gz" -C "$(dirname "$SOURCE_DIR")" "$(basename "$SOURCE_DIR")"

# Check if backup was successful
if [ $? -eq 0 ]; then
    BACKUP_SIZE=$(du -h "$BACKUP_DIR/$BACKUP_NAME.tar.gz" | cut -f1)
    echo -e "${GREEN}✓ Backup created successfully${NC}"
    echo "Location: $BACKUP_DIR/$BACKUP_NAME.tar.gz"
    echo "Size: $BACKUP_SIZE"
    echo "Timestamp: $(date)"
else
    echo -e "${RED}✗ Backup failed${NC}" >&2
    exit 1
fi

# Show recent backups
echo ""
echo -e "${YELLOW}Recent backups:${NC}"
ls -lh "$BACKUP_DIR"/*.tar.gz 2>/dev/null | tail -5 || echo "No backups found"
EOF
}

echo "1. Creating a professional backup script..."
create_sample_script "/tmp/backup_files.sh"
chmod +x /tmp/backup_files.sh

echo "   Script created at /tmp/backup_files.sh"
echo "   Testing the script:"
echo "   -------------------"
/tmp/backup_files.sh /tmp "test_backup"
echo ""

echo "2. Making scripts globally available"
echo ""
echo "   Option A: Install to /usr/local/bin (requires sudo)"
echo "   sudo cp /tmp/backup_files.sh /usr/local/bin/backup_files"
echo "   Then run: backup_files"
echo ""
echo "   Option B: Install to ~/bin (user directory)"
echo "   mkdir -p ~/bin"
echo "   cp /tmp/backup_files.sh ~/bin/backup_files"
echo "   Add to ~/.bashrc: export PATH=\"\$PATH:\$HOME/bin\""
echo ""

echo "3. Creating a proper installation script"
cat > /tmp/install_backup.sh << 'EOF'
#!/bin/bash
# install_backup.sh - Installation script

SCRIPT_NAME="backup_files"
INSTALL_DIR="$HOME/bin"
SCRIPT_SRC="/tmp/backup_files.sh"

# Check if source script exists
if [ ! -f "$SCRIPT_SRC" ]; then
    echo "Error: Source script $SCRIPT_SRC not found"
    exit 1
fi

# Create installation directory if it doesn't exist
mkdir -p "$INSTALL_DIR"

# Copy script
cp "$SCRIPT_SRC" "$INSTALL_DIR/$SCRIPT_NAME"
chmod +x "$INSTALL_DIR/$SCRIPT_NAME"

# Check if ~/bin is in PATH
if echo "$PATH" | tr ':' '\n' | grep -q "^$INSTALL_DIR$"; then
    echo "✓ $INSTALL_DIR is already in PATH"
else
    echo "⚠ $INSTALL_DIR is not in PATH"
    echo ""
    echo "Add this line to your ~/.bashrc or ~/.bash_profile:"
    echo "  export PATH=\"\$PATH:$INSTALL_DIR\""
    echo ""
    echo "Then run: source ~/.bashrc"
fi

echo ""
echo "✓ Installation complete!"
echo "You can now run: $SCRIPT_NAME"
EOF

chmod +x /tmp/install_backup.sh

echo "   Installation script created: /tmp/install_backup.sh"
echo "   Run it with: ./install_backup.sh"
echo ""

echo "4. Creating a man page for the script"
mkdir -p /tmp/man/man1
cat > /tmp/man/man1/backup_files.1 << 'EOF'
.TH BACKUP_FILES 1 "2024" "1.0" "Backup Utility"
.SH NAME
backup_files \- create compressed backups of directories
.SH SYNOPSIS
.B backup_files
[\fISOURCE_DIR\fP] [\fIBACKUP_NAME\fP]
.SH DESCRIPTION
.B backup_files
creates a compressed tar archive of the specified directory.
If no arguments are provided, it backs up the current directory.
.SH OPTIONS
.TP
.B SOURCE_DIR
Directory to backup (default: current directory)
.TP
.B BACKUP_NAME
Name for the backup file (default: backup_YYYYMMDD_HHMMSS)
.SH EXAMPLES
.TP
Backup current directory:
backup_files
.TP
Backup specific directory:
backup_files /path/to/directory
.TP
Backup with custom name:
backup_files /path/to/directory my_backup
.SH FILES
.TP
.I ~/backups/
Default backup location
.SH AUTHOR
Written by Shell Scripting Student
EOF

echo "   Man page created at /tmp/man/man1/backup_files.1"
echo "   View with: man -M /tmp/man backup_files"
echo ""

echo "5. Creating desktop integration (optional)"
cat > /tmp/backup_files.desktop << 'EOF'
[Desktop Entry]
Name=Backup Files
Comment=Create compressed backups
Exec=backup_files %F
Icon=document-save
Terminal=true
Type=Application
Categories=Utility;FileTools;
MimeType=inode/directory;
EOF

echo "   Desktop entry created for GUI integration"
echo ""

echo "6. Testing the installed script"
echo "   ----------------------------"
echo "   Creating test directory..."
mkdir -p /tmp/test_data
echo "File 1" > /tmp/test_data/file1.txt
echo "File 2" > /tmp/test_data/file2.txt

echo "   Running backup..."
/tmp/backup_files.sh /tmp/test_data "classroom_test"
echo ""

echo "=== Professional Installation Checklist ==="
echo "✓ Script has proper shebang (#!/bin/bash)"
echo "✓ Script is executable (chmod +x)"
echo "✓ Script has error handling (set -e)"
echo "✓ Script has usage instructions"
echo "✓ Script installed to appropriate directory"
echo "✓ Directory added to PATH"
echo "✓ Optional: Man page created"
echo "✓ Optional: Desktop integration"
echo ""
echo "=== Best Practices ==="
echo "• Use ~/bin for personal scripts"
echo "• Use /usr/local/bin for system-wide scripts"
echo "• Always include help/usage information"
echo "• Test scripts before installing"
echo "• Version control your scripts"
echo "• Document with comments and man pages"

# Cleanup
rm -rf /tmp/test_data
rm -f /tmp/backup_files.sh /tmp/install_backup.sh
rm -rf /tmp/man
rm -f /tmp/backup_files.desktop