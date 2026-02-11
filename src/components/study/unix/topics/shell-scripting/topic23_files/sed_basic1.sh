#!/bin/bash
# Basic sed operations for Barrackpore College data processing

echo "=== Basic sed Examples ==="
echo

# Create sample file
cat > sample.txt << 'EOF'
Student Records - Barrackpore College
======================================
1. Tuhina Das - Computer Science - 92%
2. Swadeep Roy - Mathematics - 88%
3. Abhronila Sen - Physics - 95%
4. Debangshu Ghosh - Chemistry - 87%
5. John Doe - Unknown - 75%
EOF

echo "Original file:"
cat sample.txt
echo

echo "1. Replace first occurrence:"
sed 's/ - /, /' sample.txt
echo

echo "2. Replace all occurrences (global):"
sed 's/ - /, /g' sample.txt
echo

echo "3. Delete lines containing 'Unknown':"
sed '/Unknown/d' sample.txt
echo

echo "4. Extract lines 2-4:"
sed -n '2,4p' sample.txt
echo

echo "5. Append text after line 3:"
sed '3a\--- Intermediate Report ---' sample.txt
echo

echo "6. Insert text before line 3:"
sed '3i\--- Start of Data ---' sample.txt
echo

echo "7. Change line 5:"
sed '5c\5. Anonymous Student - Undeclared - 70%' sample.txt
echo

echo "8. Multiple commands (using -e):"
sed -e 's/Barrackpore/BPC/' -e 's/%/ percent/' sample.txt
echo

echo "9. In-place edit with backup:"
cp sample.txt sample_backup.txt
sed -i.bak 's/College/University/' sample_backup.txt
echo "Backup created: sample_backup.txt.bak"
echo "Modified:"
cat sample_backup.txt