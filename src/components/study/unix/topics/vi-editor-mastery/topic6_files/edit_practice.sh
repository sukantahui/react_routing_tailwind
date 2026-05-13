#!/bin/bash
# edit_practice.sh – Practice file for x, dd, yy, p
PRACTICE_FILE="/tmp/vi_edit_practice_$(date +%s).txt"

cat > "$PRACTICE_FILE" << 'EOF'
BASIC EDITING PRACTICE (x, dd, yy, p)

Task 1: Delete a character
   Line: Helllo world
   Goal: Use x to delete the extra 'l' so it becomes "Hello world".
   (cursor on the second 'l')

Task 2: Delete a line
   Line to delete: Remove this whole line using dd.
   Line to keep: Keep this line.

Task 3: Yank and paste a line
   Line A: This line will be copied.
   Line B: This line will receive a copy below it.
   Goal: Yank line A (yy), move to line B, paste below (p).

Task 4: Move a line using dd and p
   Line to move: Move me to the bottom.
   Other line 1.
   Other line 2.
   Goal: Delete the first line (dd), go to bottom (G), paste (p).

Task 5: Duplicate a line
   Duplicate me: Make 3 copies of this line below using yy and count with p.
   Goal: yy to yank, then 3p to paste three times.

Task 6: Swap two characters
   Line: tehs
   Goal: Use xp to swap 'e' and 'h' to make "thes".

Bonus: Try P (uppercase) to paste above instead of below.

EOF

echo "=== Basic Editing Practice ==="
echo "Practice file: $PRACTICE_FILE"
echo ""
echo "Open the file with vi and complete each task."
echo "Use only x, dd, yy, p (and P)."
echo ""
echo "Press Enter to start vi..."
read -r
vi "$PRACTICE_FILE"
echo "Practice completed. Check your work with: cat $PRACTICE_FILE"