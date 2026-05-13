#!/bin/bash
# exit_practice.sh – Guided practice for vi exit commands
PRACTICE_FILE="/tmp/vi_exit_practice_$(date +%s).txt"

cat > "$PRACTICE_FILE" << 'EOF'
This is a practice file for learning vi exit commands.

Task 1: Open this file with vi, make NO changes, then quit using :q

Task 2: Open again, add a line of text (press i, type something), then quit WITHOUT saving using :q!

Task 3: Open again, add a line of text, then save and quit using :wq

Task 4: Open again, add a line of text, then save and quit using :x

Task 5: Open again, add a line of text, then save and quit using ZZ (remember: from Normal mode)

Task 6: Open again, make no changes, then save and quit using ZZ (it should not write)

EOF

echo "=== vi Exit Practice ==="
echo "Practice file created: $PRACTICE_FILE"
echo ""
echo "Follow the tasks in order. Each task builds muscle memory."
echo ""
echo "Press Enter to begin Task 1..."
read -r

echo "Task 1: Open file, make NO changes, quit with :q"
echo "Opening vi... Press ESC then :q when done (no changes)"
sleep 2
vi "$PRACTICE_FILE"
echo "Task 1 complete."

echo "Press Enter for Task 2..."
read -r
echo "Task 2: Add text, then quit WITHOUT saving using :q!"
echo "Opening vi... Type something, then ESC :q! Enter"
sleep 2
vi "$PRACTICE_FILE"
echo "Task 2 complete."

echo "Press Enter for Task 3..."
read -r
echo "Task 3: Add text, save and quit with :wq"
sleep 2
vi "$PRACTICE_FILE"
echo "Task 3 complete."

echo "Press Enter for Task 4..."
read -r
echo "Task 4: Add text, save and quit with :x"
sleep 2
vi "$PRACTICE_FILE"
echo "Task 4 complete."

echo "Press Enter for Task 5..."
read -r
echo "Task 5: Add text, save and quit with ZZ (from Normal mode, press ZZ)"
sleep 2
vi "$PRACTICE_FILE"
echo "Task 5 complete."

echo "Press Enter for Task 6..."
read -r
echo "Task 6: Open, make NO changes, quit with ZZ (should not write)"
sleep 2
vi "$PRACTICE_FILE"
echo "Task 6 complete."

echo ""
echo "Practice finished. You have used all exit commands."
echo "Delete practice file: rm $PRACTICE_FILE"