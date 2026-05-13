#!/bin/bash
# insert_practice.sh – Create a file with structured exercises for insert mode commands
PRACTICE_FILE="/tmp/vi_insert_practice_$(date +%s).txt"

cat > "$PRACTICE_FILE" << 'EOF'
INSERT MODE PRACTICE FILE

Goal: Practice i, a, I, A, o, O

Line 1: This line has a typo: Hllo
Task: Use 'i' to insert the missing 'e' after H.

Line 2: This line nees an 'd' at the end. (nees → needs)
Task: Use 'a' to append the missing 'd'.

Line 3: At the beginning of this line, add "TODO: " using I.
Task: Use 'I' to insert at the start of the line (preserving indent if any).

Line 4: At the end of this line, add " [DONE]" using A.
Task: Use 'A' to append at the line end.

Line 5: This line is line 5.
Task: Add a new line below using o, and type "This is new below".

Line 6: This line is line 6.
Task: Add a new line above using O, and type "This is new above".

Bonus: Combine counts: 3o to add three blank lines below, then delete them (dd).

EOF

echo "=== Insert Mode Practice File Created ==="
echo "File: $PRACTICE_FILE"
echo "Open it with: vi $PRACTICE_FILE"
echo ""
echo "Follow the tasks. Remember: press ESC to return to Normal mode after each insertion."
echo ""
echo "Press Enter to start vi..."
read -r
vi "$PRACTICE_FILE"
echo "Practice completed. Review your edits with 'cat $PRACTICE_FILE'"