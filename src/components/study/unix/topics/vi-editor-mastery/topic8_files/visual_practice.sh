#!/bin/bash
# visual_practice.sh – Practice file for visual mode (v, V, Ctrl+v)
PRACTICE_FILE="/tmp/vi_visual_practice_$(date +%s).txt"

cat > "$PRACTICE_FILE" << 'EOF'
VISUAL MODE PRACTICE

Task 1: Character visual (v)
   This is a sentence where you need to make the word "sentence" uppercase.
   Move to the 's' of "sentence", press v, then e (to end of word), then U (uppercase).
   Result: "SENTENCE"

Task 2: Line visual (V)
   Line A (delete this line using V and d)
   Line B (keep this)
   Use V to select the first line, then d to delete it.

Task 3: Block visual (Ctrl+v) – add '# ' comment
   Line 1: Command 1
   Line 2: Command 2
   Line 3: Command 3
   Use Ctrl+v, select the first column of all three lines (use j to extend selection), then press I (capital I), type '# ' (hash space), then ESC.

Task 4: Block visual – delete a column
   Column1,Value1
   Column2,Value2
   Column3,Value3
   Use Ctrl+v to select the comma column (from the first comma to the last), then d to delete commas.

Task 5: Indent with V
   Line to indent: Indent me one level.
   Line to indent: Also indent me.
   Use V to select both lines, then > (shift right). Press . to indent again.

Bonus: Change case of a word with v and ~
   tHis word has wrong case.
   Move to 'H', v to 's', then ~ to toggle case repeatedly.

EOF

echo "=== Visual Mode Practice ==="
echo "Practice file: $PRACTICE_FILE"
echo ""
echo "Open with vi and follow the tasks."
echo "Remember: v, V, Ctrl+v, then d, y, U, u, ~, >, <, I, A."
echo ""
echo "Press Enter to start vi..."
read -r
vi "$PRACTICE_FILE"
echo "Practice completed."