#!/bin/bash
# paste_multifile.sh - Pasting more than two files
cat > math.txt <<EOF
Algebra
Geometry
Calculus
EOF

cat > physics.txt <<EOF
Mechanics
Thermodynamics
Optics
EOF

cat > cs.txt <<EOF
Programming
Algorithms
Databases
EOF

echo "=== Paste three files ==="
paste math.txt physics.txt cs.txt

echo -e "\n=== With semicolon delimiter ==="
paste -d ';' math.txt physics.txt cs.txt

# Cleanup
rm math.txt physics.txt cs.txt