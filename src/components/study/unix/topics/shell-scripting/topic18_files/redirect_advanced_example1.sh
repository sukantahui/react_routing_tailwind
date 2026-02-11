#!/bin/bash
# Sophisticated I/O redirection for production systems

echo "=== Advanced Redirection Techniques ==="

# 1. File descriptor manipulation
echo "1. File Descriptor Duplication"
# Save original stdout to fd 3
exec 3>&1

# Redirect stdout to file, but stderr still goes to terminal
echo "This goes to file" > /tmp/output.txt
echo "This goes to terminal (stderr)" >&2

# Restore stdout
echo "This goes to terminal (stdout restored)" >&3

# 2. Multiple redirections
echo -e "\n2. Multiple Redirections"
# stdout to file1, stderr to file2
{
    echo "Normal message"
    echo "Error message" >&2
} > /tmp/file1.txt 2> /tmp/file2.txt

echo "file1.txt:"
cat /tmp/file1.txt
echo -e "\nfile2.txt:"
cat /tmp/file2.txt

# 3. Process substitution
echo -e "\n3. Process Substitution"
echo "Comparing directory listings:"
diff <(ls /tmp) <(ls /var/tmp) | head -5

echo -e "\nProcessing command output as file:"
grep -c "file" <(find /tmp -type f -name "*.txt" 2>/dev/null)

# 4. tee for splitting streams
echo -e "\n4. Using tee to Split Output"
echo "Deployment output being sent to multiple locations..."
{
    echo "=== Deployment Started ==="
    date
    echo "Current user: $(whoami)"
    echo "Disk space:"
    df -h /
    echo "=== Deployment Ended ==="
} 2>&1 | tee /tmp/deploy.log | tee >(grep -i "error" > /tmp/errors.txt) > >(grep -i "disk" > /tmp/disk_info.txt)

echo -e "\nDeploy log:"
cat /tmp/deploy.log
echo -e "\nErrors captured:"
cat /tmp/errors.txt
echo -e "\nDisk info captured:"
cat /tmp/disk_info.txt

# 5. Redirecting to/from multiple files
echo -e "\n5. Redirecting to Multiple Files"
# Use tee to write to multiple files
echo "Important log entry" | tee /tmp/log1.txt /tmp/log2.txt /tmp/log3.txt >/dev/null

echo "Written to 3 files:"
echo "log1.txt:" && cat /tmp/log1.txt
echo "log2.txt:" && cat /tmp/log2.txt
echo "log3.txt:" && cat /tmp/log3.txt

# 6. Custom file descriptors
echo -e "\n6. Custom File Descriptors"
# Open fd 4 for reading, fd 5 for writing
exec 4</etc/passwd
exec 5>/tmp/custom_output.txt

# Read from fd 4, write to fd 5
head -3 <&4 >&5

# Close file descriptors
exec 4<&-
exec 5>&-

echo "Custom output written to /tmp/custom_output.txt:"
cat /tmp/custom_output.txt

# 7. Redirection with exec
echo -e "\n7. Permanent Redirection with exec"
# Redirect all subsequent output to log file
exec > /tmp/exec_demo.log 2>&1

echo "This goes to log file"
echo "So does this"
ls /nonexistent  # Error also goes to log

# Restore original stdout/stderr
exec >&3 2>&1

echo -e "\nCheck /tmp/exec_demo.log for captured output"

# Cleanup
rm -f /tmp/output.txt /tmp/file1.txt /tmp/file2.txt /tmp/deploy.log \
      /tmp/errors.txt /tmp/disk_info.txt /tmp/log1.txt /tmp/log2.txt \
      /tmp/log3.txt /tmp/custom_output.txt /tmp/exec_demo.log