#!/bin/bash
# wc_words_chars.sh - Count words (-w) and characters (-m)
cat > essay.txt <<EOF
The UNIX philosophy is to write programs that do one thing and do it well.
wc (word count) is a perfect example - it counts lines, words, and characters.
EOF

echo "=== Word count (-w) ==="
wc -w essay.txt

echo -e "\n=== Character count (-m) ==="
wc -m essay.txt

echo -e "\n=== Both in one command ==="
wc -wm essay.txt

# Cleanup
rm essay.txt