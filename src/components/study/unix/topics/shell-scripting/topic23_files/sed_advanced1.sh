#!/bin/bash
# Advanced sed examples for Naihati school data processing

echo "=== Advanced sed Techniques ==="
echo

# Create sample CSV
cat > students.csv << 'EOF'
ID,Name,Department,Score,Email
101,Tuhina Das,Computer Science,92,tuhina@barrackpore.edu
102,Swadeep Roy,Mathematics,88,swadeep@barrackpore.edu
103,Abhronila Sen,Physics,95,abhronila@naihati.edu
104,Debangshu Ghosh,Chemistry,87,debangshu@shyamnagar.edu
105,John Doe,Unknown,75,john@example.com
EOF

echo "Original CSV:"
cat students.csv
echo

echo "1. Swap first two fields:"
sed 's/^\([^,]*\),\([^,]*\)/\2,\1/' students.csv
echo

echo "2. Convert to uppercase:"
sed 's/[a-z]/\U&/g' students.csv
echo

echo "3. Add quotes around names:"
sed 's/,\([^,]*\),/,"\1",/2' students.csv
echo

echo "4. Extract email domains:"
sed 's/.*@\(.*\)$/\1/' students.csv | tail -n +2
echo

echo "5. Conditional replacement (score > 90):"
sed '/9[0-9]%/s/\(.*\) - \(.*\)/\1 - EXCELLENT - \2/' students.csv 2>/dev/null || echo "Score format different"
echo

echo "6. Number lines:"
sed = students.csv | sed 'N;s/\n/, /'
echo

echo "7. Remove trailing commas:"
echo "field1,field2,field3," | sed 's/,*$//'
echo

echo "8. Complex pattern (students with @barrackpore.edu):"
sed -n '/@barrackpore\.edu/{s/\(.*\),.*,\(.*\)@barrackpore\.edu/\1 (\2)/p}' students.csv
echo

echo "9. Multi-line pattern (using hold space):"
cat > multi.txt << 'EOF'
Start
Tuhina: 92
Swadeep: 88
End
EOF
sed -n '/Tuhina:/{N;s/Tuhina: \(.*\)\nSwadeep: \(.*\)/Tuhina+\Swadeep: \1+\2/p}' multi.txt