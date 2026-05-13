#!/bin/bash
# global_sub_practice.sh – Practice file for global substitution with ranges
PRACTICE_FILE="/tmp/vi_global_sub_practice_$(date +%s).txt"

cat > "$PRACTICE_FILE" << 'EOF'
GLOBAL SUBSTITUTION PRACTICE

Task 1: Replace all 'temp' with 'final' in the entire file
   temp line 1
   temp line 2
   temp line 3
   Use :%s/temp/final/g

Task 2: Replace only in lines 2 to 4
   line 1: keep original
   line 2: replace me
   line 3: replace me too
   line 4: replace me as well
   line 5: keep original
   Command: :2,4s/replace/CHANGED/g

Task 3: Use visual selection to replace
   Select lines 2-3 visually (V then j), then :s/foo/bar/g
   Line 2: foo bar
   Line 3: foo baz
   (The range '('<,'>) will appear automatically)

Task 4: Replace with confirmation (gc)
   Line: cat cat cat
   Use :%s/cat/dog/gc (answer y to first, n to second, a to all)

Task 5: Replace using a different delimiter (paths)
   Line: C:\temp\file.txt
   Command: :%s#C:\\temp#/tmp#g

Bonus: Conditional substitution on lines containing 'error'
   error: invalid input
   info: processed
   error: timeout
   Use :g/error/s/invalid/wrong/g

EOF

echo "=== Global Substitution Practice ==="
echo "Practice file: $PRACTICE_FILE"
echo ""
echo "Open with vi and follow the tasks."
echo "Commands: :%s/old/new/g, :1,5s/..., :'<,'>s/..., :g/pattern/s/..."
echo ""
echo "Press Enter to start vi..."
read -r
vi "$PRACTICE_FILE"
echo "Practice completed."