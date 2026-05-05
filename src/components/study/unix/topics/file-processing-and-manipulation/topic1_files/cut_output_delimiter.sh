#!/bin/bash
# cut_output_delimiter.sh - Change output separator
cat > data.csv <<EOF
Name,Age,City
Swadeep,20,Barrackpore
Tuhina,21,Shyamnagar
EOF

echo "=== Default output delimiter (same as input) ==="
cut -d',' -f1,3 data.csv

echo -e "\n=== Change output delimiter to '|' ==="
cut -d',' -f1,3 --output-delimiter='|' data.csv

echo -e "\n=== Change output delimiter to space ==="
cut -d',' -f2,3 --output-delimiter=' ' data.csv

echo -e "\n=== Multiple character delimiter? Not possible. Use sed after cut. ==="
cut -d',' -f1-3 --output-delimiter=' -> ' data.csv

# Cleanup
rm data.csv