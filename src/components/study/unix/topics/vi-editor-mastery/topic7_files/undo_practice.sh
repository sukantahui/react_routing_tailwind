#!/bin/bash
# undo_practice.sh – Practice file for undo and redo
PRACTICE_FILE="/tmp/vi_undo_practice_$(date +%s).txt"

cat > "$PRACTICE_FILE" << 'EOF'
UNDO AND REDO PRACTICE

Follow these tasks in order. Use only Normal mode commands.

Task 1: Basic undo
   Line 1: Type "first change" (press i, type, ESC)
   Line 2: Type "second change"
   Line 3: Type "third change"
   Now press u three times. Each press should remove one line.
   Then press Ctrl+R three times to bring them back.

Task 2: U (line undo)
   Line: This line will be modified.
   Change it to "Modified once".
   Then change it to "Modified twice".
   Then press U. It should return to the original line.
   Make another change, then u (normal undo) – see the difference.

Task 3: Count with u
   Make three changes (e.g., add three different words on separate lines).
   Press 3u. All three changes should be undone.
   Press 3Ctrl+R to redo all three.

Task 4: Undo after save
   Make a change. Save with :w.
   Make another change. Press u. It should undo only the last change (not the one before save).
   Press u again to undo the pre‑save change? Should be possible in vim.

Bonus: Try U on a line after moving away and back. It still restores the line.

EOF

echo "=== Undo/Redo Practice ==="
echo "Practice file: $PRACTICE_FILE"
echo ""
echo "Open with vi and follow the tasks."
echo "Remember: ESC to Normal mode before u / Ctrl+R."
echo ""
echo "Press Enter to start vi..."
read -r
vi "$PRACTICE_FILE"
echo "Practice completed."