#!/bin/bash
# batch_html_edit.sh - Convert HTML to Markdown (simplified)
mkdir -p html_pages
cat > html_pages/page1.html <<EOF
<html><body><h1>Welcome</h1><p>Hello world</p></body></html>
EOF
cat > html_pages/page2.html <<EOF
<html><body><h1>About</h1><p>This is a test</p></body></html>
EOF

echo "=== Original HTML files ==="
cat html_pages/*.html

echo -e "\n=== Convert <h1> to # , <p> to plain text ==="
for file in html_pages/*.html; do
    sed -i 's/<h1>/# /g' "$file"
    sed -i 's/<\/h1>//g' "$file"
    sed -i 's/<p>//g' "$file"
    sed -i 's/<\/p>//g' "$file"
    sed -i 's/<[^>]*>//g' "$file"  # remove any remaining tags
done

echo -e "\n=== Converted Markdown files ==="
cat html_pages/*.html

# Cleanup
rm -rf html_pages