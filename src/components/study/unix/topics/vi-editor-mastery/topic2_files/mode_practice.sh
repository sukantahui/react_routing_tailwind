#!/bin/bash
# mode_practice.sh – Interactive practice for vi modes
PRACTICE_FILE="/tmp/vi_mode_practice_$(date +%s).txt"

cat > "$PRACTICE_FILE" << 'EOF'
Line 1: This is a practice file.
Line 2: Learn vi modes.
Line 3: Normal = commands, Insert = type, Command = : 
EOF

echo "=== vi Mode Practice ==="
echo "Practice file created: $PRACTICE_FILE"
echo ""
echo "Follow these steps:"
echo "1. Type: vi $PRACTICE_FILE"
echo "2. You are in Normal mode. Press i → you see '-- INSERT --'"
echo "3. Type 'Hello ' at the beginning of line 1"
echo "4. Press ESC to return to Normal mode"
echo "5. Press o (lowercase O) → opens new line below cursor and enters Insert mode"
echo "6. Type 'New line added'"
echo "7. Press ESC, then :wq to save and quit"
echo ""
echo "Now open the file again with vi to verify changes."
echo "When ready, press Enter to start vi..."
read -r
vi "$PRACTICE_FILE"
echo "Practice completed. Check your changes with: cat $PRACTICE_FILE"