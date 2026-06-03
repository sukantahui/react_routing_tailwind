#!/bin/bash
# csv_to_sql.sh - Convert CSV to SQL INSERT statements
cat > students.csv <<EOF
name,age,grade
Swadeep,20,A
Tuhina,21,A+
Abhronila,19,B
EOF

echo "=== Original CSV ==="
cat students.csv

echo -e "\n=== Generate SQL INSERT statements ==="
# Skip header line (first line) and wrap each row
tail -n +2 students.csv | while IFS=',' read -r name age grade; do
    echo "INSERT INTO students (name, age, grade) VALUES ('$name', $age, '$grade');"
done

# Alternative one-liner using sed (without loop)
echo -e "\n=== Using sed (faster for large files) ==="
sed -n '2,$ s/^\([^,]*\),\([^,]*\),\([^,]*\)$/INSERT INTO students (name, age, grade) VALUES ('\''\1'\'', \2, '\''\3'\'');/p' students.csv

# Cleanup
rm students.csv