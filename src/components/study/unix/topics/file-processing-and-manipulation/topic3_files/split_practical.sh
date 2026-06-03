#!/bin/bash
# split_practical.sh - Real‑world: parallel processing + reassembly
# Create a large CSV of student records
cat > students.csv <<EOF
Name,Score
Swadeep,85
Tuhina,92
Abhronila,78
Debangshu,88
EOF
# Duplicate to 1000 lines for demo (but keep small for speed)
for i in {1..250}; do cat students.csv; done > large_students.csv

echo "=== Large file has $(wc -l < large_students.csv) lines ==="

echo -e "\n=== Split into 200-line chunks ==="
split -l 200 large_students.csv batch_

echo "Chunks created: $(ls batch_* | wc -l) files"

echo -e "\n=== Simulate parallel processing: add header to each chunk ==="
for f in batch_*; do
    (echo "ID,Name,Score" | cat - "$f" > "$f.tmp" && mv "$f.tmp" "$f") &
done
wait

echo -e "\n=== Verify first chunk content ==="
head -3 batch_aa

echo -e "\n=== Reassemble all chunks ==="
cat batch_* > reassembled.csv
echo "Reassembled file has $(wc -l < reassembled.csv) lines"

# Cleanup
rm students.csv large_students.csv batch_* reassembled.csv