#!/bin/bash
# Permission demonstration script

echo "Checking current permissions..."
ls -l "$0"

echo -e "\nAdding execute permission..."
chmod +x "$0"

echo -e "\nPermissions after change:"
ls -l "$0"

echo -e "\nNumeric permission examples:"
echo "chmod 755 - Owner: rwx, Group: r-x, Others: r-x"
echo "chmod 700 - Owner: rwx, Group: ---, Others: ---"
echo "chmod 644 - Owner: rw-, Group: r--, Others: r--"