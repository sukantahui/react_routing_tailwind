#!/bin/bash
# Debugging Complex Pipelines
# Techniques for troubleshooting multi-command workflows

echo "=== Debugging Complex Pipelines ==="
echo ""

# Create test data
echo "Creating test data..."
cat > /tmp/pipeline_input.txt << 'EOF'
2023-01-15 10:30:45 INFO: User login from 192.168.1.100
2023-01-15 10:31:22 ERROR: Database connection failed
2023-01-15 10:32:10 WARNING: High memory usage (85%)
2023-01-15 10:33:00 INFO: Backup started
2023-01-15 10:34:15 ERROR: File not found: data.txt
2023-01-15 10:35:30 INFO: User logout
2023-01-15 10:36:45 WARNING: CPU threshold exceeded
EOF

echo "Input data:"
cat /tmp/pipeline_input.txt
echo ""

echo "=== Problem: Broken Pipeline ==="
echo ""

echo "Pipeline to extract error counts by hour:"
echo "grep ERROR /tmp/pipeline_input.txt | cut -d' ' -f2 | cut -d: -f1 | sort | uniq -c"
echo ""
echo "Running pipeline:"
grep ERROR /tmp/pipeline_input.txt | cut -d' ' -f2 | cut -d: -f1 | sort | uniq -c
echo ""

echo "=== Debugging Step 1: Test each command ==="
echo ""

echo "Step 1: grep ERROR"
echo "grep ERROR /tmp/pipeline_input.txt"
grep ERROR /tmp/pipeline_input.txt
echo "Exit code: $?"
echo ""

echo "Step 2: First cut"
echo "grep ERROR /tmp/pipeline_input.txt | cut -d' ' -f2"
grep ERROR /tmp/pipeline_input.txt | cut -d' ' -f2
echo "Hmm, we're getting '10:31:22' but want '10'"
echo ""

echo "Step 3: Debug with tee"
echo "grep ERROR /tmp/pipeline_input.txt | tee /tmp/step1.out | cut -d' ' -f2 | tee /tmp/step2.out"
grep ERROR /tmp/pipeline_input.txt | tee /tmp/step1.out | cut -d' ' -f2 | tee /tmp/step2.out
echo "Step1 output: $(cat /tmp/step1.out)"
echo "Step2 output: $(cat /tmp/step2.out)"
echo ""

echo "=== Debugging Step 2: Fix the cut ==="
echo ""

echo "Problem: cut -d' ' uses single space, but file has multiple spaces"
echo "Solution 1: Use awk"
echo "grep ERROR /tmp/pipeline_input.txt | awk '{print \$2}'"
grep ERROR /tmp/pipeline_input.txt | awk '{print $2}'
echo ""
echo "Solution 2: Use tr to squeeze spaces"
echo "grep ERROR /tmp/pipeline_input.txt | tr -s ' ' | cut -d' ' -f2"
grep ERROR /tmp/pipeline_input.txt | tr -s ' ' | cut -d' ' -f2
echo ""

echo "=== Debugging Step 3: Complete pipeline ==="
echo ""

echo "Fixed pipeline:"
echo "grep ERROR /tmp/pipeline_input.txt | awk '{print \$2}' | cut -d: -f1 | sort | uniq -c"
grep ERROR /tmp/pipeline_input.txt | awk '{print $2}' | cut -d: -f1 | sort | uniq -c
echo ""

echo "=== Advanced Debugging: set -o pipefail ==="
echo ""

echo "Without pipefail, only last command's exit code matters:"
echo "grep 'NONEXISTENT' /tmp/pipeline_input.txt | awk '{print \$1}'"
grep 'NONEXISTENT' /tmp/pipeline_input.txt | awk '{print $1}'
echo "Exit code: $? (awk's exit code, not grep's)"
echo ""
echo "With pipefail:"
echo "(set -o pipefail; grep 'NONEXISTENT' /tmp/pipeline_input.txt | awk '{print \$1}'; echo \"Exit: \$?\")"
(set -o pipefail; grep 'NONEXISTENT' /tmp/pipeline_input.txt | awk '{print $1}'; echo "Exit: $?")
echo ""

echo "=== Debugging Technique: PIPESTATUS ==="
echo ""

echo "Check all exit codes in pipeline:"
echo "grep ERROR /tmp/pipeline_input.txt | cut -d: -f1 | wc -l"
grep ERROR /tmp/pipeline_input.txt | cut -d: -f1 | wc -l
echo "PIPESTATUS: ${PIPESTATUS[@]}"
echo ""

echo "=== Debugging Technique: Add debugging statements ==="
echo ""

echo "Add awk print to see data flow:"
echo "grep ERROR /tmp/pipeline_input.txt | awk '{print \"DEBUG1: \", \$0}' | awk '{print \$2}' | awk '{print \"DEBUG2: \", \$0}'"
grep ERROR /tmp/pipeline_input.txt | \
    awk '{print "DEBUG1: ", $0}' | \
    awk '{print $2}' | \
    awk '{print "DEBUG2: ", $0}'
echo ""

echo "=== Debugging Technique: Use temporary files ==="
echo ""

echo "For complex pipelines, save intermediate results:"
echo "grep ERROR /tmp/pipeline_input.txt > /tmp/temp1"
grep ERROR /tmp/pipeline_input.txt > /tmp/temp1
echo "cat /tmp/temp1"
cat /tmp/temp1
echo ""
echo "awk '{print \$2}' /tmp/temp1 > /tmp/temp2"
awk '{print $2}' /tmp/temp1 > /tmp/temp2
echo "cat /tmp/temp2"
cat /tmp/temp2
echo ""
echo "cut -d: -f1 /tmp/temp2 > /tmp/temp3"
cut -d: -f1 /tmp/temp2 > /tmp/temp3
echo "cat /tmp/temp3"
cat /tmp/temp3
echo ""
echo "sort /tmp/temp3 | uniq -c"
sort /tmp/temp3 | uniq -c
echo ""

echo "=== Debugging Technique: Simplify and rebuild ==="
echo ""

echo "Start with minimal working pipeline:"
echo "grep ERROR /tmp/pipeline_input.txt"
grep ERROR /tmp/pipeline_input.txt
echo ""
echo "Add one step:"
echo "grep ERROR /tmp/pipeline_input.txt | awk '{print \$2}'"
grep ERROR /tmp/pipeline_input.txt | awk '{print $2}'
echo ""
echo "Add next step:"
echo "grep ERROR /tmp/pipeline_input.txt | awk '{print \$2}' | cut -d: -f1"
grep ERROR /tmp/pipeline_input.txt | awk '{print $2}' | cut -d: -f1
echo ""
echo "Complete pipeline:"
echo "grep ERROR /tmp/pipeline_input.txt | awk '{print \$2}' | cut -d: -f1 | sort | uniq -c"
grep ERROR /tmp/pipeline_input.txt | awk '{print $2}' | cut -d: -f1 | sort | uniq -c
echo ""

echo "=== Common Pipeline Problems ==="
echo ""
echo "1. Missing/extra spaces in cut -d' '"
echo "2. Field numbers wrong (print \$2 vs \$3)"
echo "3. sort before uniq -c"
echo "4. grep -c vs wc -l"
echo "5. Exit code from wrong command"
echo "6. Buffering issues (use stdbuf)"
echo ""

echo "=== Pipeline Optimization ==="
echo ""
echo "Combine awk operations:"
echo "Instead of: grep ERROR | awk '{print \$2}' | cut -d: -f1"
echo "Use: awk '/ERROR/ {split(\$2, a, \":\"); print a[1]}'"
awk '/ERROR/ {split($2, a, ":"); print a[1]}' /tmp/pipeline_input.txt | sort | uniq -c
echo ""
echo "Or even:"
echo "awk '/ERROR/ {split(\$2, a, \":\"); count[a[1]]++} END {for(h in count) print count[h], h}'"
awk '/ERROR/ {split($2, a, ":"); count[a[1]]++} END {for(h in count) print count[h], h}' /tmp/pipeline_input.txt
echo ""

echo "=== Debugging Summary ==="
echo "1. Test each command separately"
echo "2. Use tee to save intermediate results"
echo "3. Check PIPESTATUS for exit codes"
echo "4. Add debugging prints with awk"
echo "5. Simplify and rebuild step by step"
echo "6. Consider combining operations in single tool"