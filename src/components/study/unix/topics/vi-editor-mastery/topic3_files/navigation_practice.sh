#!/bin/bash
# navigation_practice.sh – Create a practice file with target lines for navigation
PRACTICE_FILE="/tmp/vi_nav_practice_$(date +%s).txt"

cat > "$PRACTICE_FILE" << 'EOF'
Line 1: Start here.
Line 2: Practice moving down with j.
Line 3: Then up with k.
Line 4: Move left with h, right with l.
Line 5: Now word navigation: jump over words using w and b.
Line 6: Line start with 0, line end with $.
Line 7: Go to top of file: gg.
Line 8: Go to bottom: G.
Line 9: Challenge: move to line 5, column 0, then to the word 'navigation', then to end of line.
Line 10: Practice counting: 3j, 2w, etc.
EOF

echo "=== Navigation Practice File Created ==="
echo "File: $PRACTICE_FILE"
echo "Open it with: vi $PRACTICE_FILE"
echo ""
echo "Do NOT use arrow keys. Use only h j k l w b 0 $ gg G"
echo ""
echo "When ready, press Enter to start vi..."
read -r
vi "$PRACTICE_FILE"
echo "Practice completed. Type 'cat $PRACTICE_FILE' to review."