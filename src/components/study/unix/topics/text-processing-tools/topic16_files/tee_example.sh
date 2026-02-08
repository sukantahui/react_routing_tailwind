#!/bin/bash
# Using tee to split output streams

echo "The tee Command: Split Output Streams"
echo "======================================"

# Create test directory
mkdir -p /tmp/tee_test
cd /tmp/tee_test

echo "1. Basic tee usage:"
echo "-------------------"
echo "Original command output:"
ls -la /etc/passwd /etc/group /nonexistent
echo -e "\nWith tee (errors to stderr still visible):"
ls -la /etc/passwd /etc/group /nonexistent 2>&1 | tee output.log
echo -e "\nSaved to output.log:"
cat output.log

echo -e "\n2. Append mode (tee -a):"
echo "--------------------------"
echo "First line" | tee append.log
echo "Second line" | tee -a append.log
echo "Third line" | tee -a append.log
echo "append.log contents:"
cat append.log

echo -e "\n3. Debugging pipeline with tee:"
echo "----------------------------------"
echo "Data processing pipeline:"
cat << 'EOF' | tee raw_data.log | grep "ERROR" | tee errors.log | wc -l
2024-01-15 INFO: System started
2024-01-15 ERROR: Disk space low
2024-01-15 WARN: High memory usage
2024-01-15 ERROR: Database connection failed
2024-01-15 INFO: Backup completed
EOF
echo -e "\nRaw data saved in raw_data.log"
echo "Errors saved in errors.log:"
cat errors.log

echo -e "\n4. Multiple tee commands:"
echo "---------------------------"
echo "Processing data through multiple stages:" | tee stage1.log | \
    sed 's/Processing/Transforming/' | tee stage2.log | \
    awk '{print toupper($0)}' | tee stage3.log
echo -e "\nStage 1:" && cat stage1.log
echo "Stage 2:" && cat stage2.log
echo "Stage 3:" && cat stage3.log

# Cleanup
cd ..
rm -rf /tmp/tee_test