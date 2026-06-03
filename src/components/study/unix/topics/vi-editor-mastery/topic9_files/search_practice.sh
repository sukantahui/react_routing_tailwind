#!/bin/bash
# search_practice.sh – Practice file for search and line replace
PRACTICE_FILE="/tmp/vi_search_practice_$(date +%s).txt"

cat > "$PRACTICE_FILE" << 'EOF'
SEARCH AND REPLACE PRACTICE

Task 1: Basic search
   Here is a line with the word important.
   Another line also has important.
   Use /important to find it. Press n to jump to the second occurrence.

Task 2: Backward search
   Use ?important to search backward from the bottom of the file.

Task 3: Replace first occurrence on line
   Line: foo bar foo
   Goal: Change only the first foo to baz using :s/foo/baz/
   Result: baz bar foo

Task 4: Replace all on line
   Line: foo bar foo
   Goal: Change all foo to baz using :s/foo/baz/g
   Result: baz bar baz

Task 5: Replace with confirmation
   Line: cat cat cat
   Use :s/cat/dog/gc. Answer y to first, n to second, a to third (or y to all).
   Observe the difference.

Task 6: Case‑insensitive search
   Set :set ignorecase
   Search for /THE. It should match 'the', 'The', 'THE'.
   Then :set noignorecase to revert.

Task 7: Whole‑word search
   Search for /\<the\> in a line that contains 'the' and 'then'. Should match only 'the'.

Bonus: Highlight search with :set hlsearch and clear with :noh.

EOF

echo "=== Search and Replace Practice ==="
echo "Practice file: $PRACTICE_FILE"
echo ""
echo "Open with vi and follow the tasks."
echo "Commands: /pattern, n, N, :s/old/new/g, :set hlsearch, :noh"
echo ""
echo "Press Enter to start vi..."
read -r
vi "$PRACTICE_FILE"
echo "Practice completed."