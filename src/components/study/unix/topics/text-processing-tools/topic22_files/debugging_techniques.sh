#!/bin/bash
# Debugging Techniques for Shell Scripts
# Systematic approach to finding and fixing errors

echo "=== Systematic Debugging Techniques ==="
echo ""

# Create a problematic script
cat > /tmp/broken_script.sh << 'EOF'
#!/bin/bash
# This script has multiple bugs
# Purpose: Process student data and calculate averages

input_file="$1"
threshold="$2"

# Bug 1: Unquoted variable
echo Processing $input_file

# Bug 2: No error checking
grades=$(cat $input_file)

# Bug 3: Wrong field number
total=0
count=0
for grade in $grades; do
    # Bug 4: Arithmetic in wrong context
    student_grade=$grade
    total=$total + $student_grade
    count=$((count + 1))
done

# Bug 5: Division by zero possible
average=$((total / count))

# Bug 6: Wrong comparison syntax
if [ $average > $threshold ]; then
    echo "Average $average exceeds threshold $threshold"
else
    echo "Average $average is below threshold $threshold"
fi
EOF

chmod +x /tmp/broken_script.sh

# Create test data
echo -e "85\n92\n78\n88\n95" > /tmp/grades.txt

echo "Broken script created: /tmp/broken_script.sh"
echo "Test data: /tmp/grades.txt"
echo ""
echo "=== Step 1: Run the script ==="
echo ""

echo "./tmp/broken_script.sh /tmp/grades.txt 85"
./tmp/broken_script.sh /tmp/grades.txt 85
echo "Exit code: $?"
echo ""

echo "=== Step 2: Enable tracing with set -x ==="
echo ""

cat > /tmp/debug_script1.sh << 'EOF'
#!/bin/bash
set -x  # Enable tracing
input_file="$1"
echo Processing $input_file
set +x  # Disable tracing
EOF

chmod +x /tmp/debug_script1.sh
echo "./tmp/debug_script1.sh 'file with spaces.txt'"
./tmp/debug_script1.sh 'file with spaces.txt'
echo ""

echo "=== Step 3: Check syntax with shellcheck ==="
echo ""

echo "If shellcheck is installed:"
echo "shellcheck /tmp/broken_script.sh"
if command -v shellcheck &> /dev/null; then
    shellcheck /tmp/broken_script.sh
else
    echo "shellcheck not installed. Install with: sudo apt-get install shellcheck"
fi
echo ""

echo "=== Step 4: Add debugging prints ==="
echo ""

cat > /tmp/debug_script2.sh << 'EOF'
#!/bin/bash
input_file="$1"
threshold="$2"

echo "DEBUG: input_file='$input_file'"
echo "DEBUG: threshold='$threshold'"

# Test file existence
if [ ! -f "$input_file" ]; then
    echo "ERROR: File not found: $input_file" >&2
    exit 1
fi

# Read file safely
grades=$(cat "$input_file")
echo "DEBUG: grades='$grades'"

# Process grades
total=0
count=0
for grade in $grades; do
    echo "DEBUG: Processing grade: $grade"
    # Validate numeric grade
    if ! [[ "$grade" =~ ^[0-9]+$ ]]; then
        echo "WARNING: Skipping non-numeric grade: $grade" >&2
        continue
    fi
    total=$((total + grade))
    count=$((count + 1))
    echo "DEBUG: total=$total, count=$count"
done

echo "DEBUG: Final total=$total, count=$count"

# Check for division by zero
if [ $count -eq 0 ]; then
    echo "ERROR: No valid grades found" >&2
    exit 1
fi

average=$((total / count))
echo "DEBUG: average=$average"

# Correct comparison
if [ $average -gt $threshold ]; then
    echo "Average $average exceeds threshold $threshold"
else
    echo "Average $average is below threshold $threshold"
fi
EOF

chmod +x /tmp/debug_script2.sh
echo ""
echo "Fixed script output:"
./tmp/debug_script2.sh /tmp/grades.txt 85
echo ""

echo "=== Step 5: Use tee to debug pipelines ==="
echo ""

echo "Complex pipeline debugging:"
echo "cat /tmp/grades.txt | awk '{print \"DEBUG: \", \$0} {sum+=\$1} END{print sum}'"
cat /tmp/grades.txt | awk '{print "DEBUG: ", $0} {sum+=$1} END{print "Sum:", sum}'
echo ""

echo "Or with tee to save intermediate results:"
echo "cat /tmp/grades.txt | tee /tmp/step1.out | awk '{sum+=\$1} END{print sum}' | tee /tmp/step2.out"
cat /tmp/grades.txt | tee /tmp/step1.out | awk '{sum+=$1} END{print "Sum:", sum}' | tee /tmp/step2.out
echo "Step1 output: $(cat /tmp/step1.out)"
echo "Step2 output: $(cat /tmp/step2.out)"
echo ""

echo "=== Step 6: Check exit codes ==="
echo ""

cat > /tmp/exit_test.sh << 'EOF'
#!/bin/bash
# Demonstrate exit code checking
echo "Testing command that fails:"
grep "nonexistent" /tmp/grades.txt
echo "Exit code: $?"
echo ""
echo "Testing command that succeeds:"
grep "85" /tmp/grades.txt
echo "Exit code: $?"
EOF

chmod +x /tmp/exit_test.sh
./tmp/exit_test.sh
echo ""

echo "=== Step 7: Use strace for system-level debugging ==="
echo ""

echo "If strace is installed:"
echo "strace -e open,read ls /tmp/grades.txt 2>&1 | head -20"
if command -v strace &> /dev/null; then
    strace -e open,read ls /tmp/grades.txt 2>&1 | head -20
else
    echo "strace not installed. Install with: sudo apt-get install strace"
fi
echo ""

echo "=== Debugging Summary ==="
echo "1. set -x / set +x for command tracing"
echo "2. Add echo statements for variable inspection"
echo "3. Use shellcheck for static analysis"
echo "4. Check exit codes with \$?"
echo "5. Use tee to save intermediate pipeline results"
echo "6. Test with small data first"
echo "7. Create minimal reproducible test cases"