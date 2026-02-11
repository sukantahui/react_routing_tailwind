#!/bin/bash
# Variable expansion in here documents
student="Swadeep"
city="Barrackpore"

echo "With variable expansion:"
cat <<EOF
Student: $student
City: $city
Date: $(date)
EOF

echo -e "\nWithout variable expansion:"
cat <<'EOF'
Student: $student
City: $city
Date: $(date)
EOF