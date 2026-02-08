#!/bin/bash
# Advanced redirection techniques

echo "Advanced Redirection Patterns"
echo "============================="

# Create test directory
mkdir -p /tmp/adv_redir
cd /tmp/adv_redir

echo "1. Redirect Both stdout and stderr (&>):"
echo "----------------------------------------"
ls . /nonexistent &> both.log
echo "Both stdout and stderr in same file:"
cat both.log

echo -e "\n2. Redirect stderr to stdout (2>&1):"
echo "---------------------------------------"
ls . /nonexistent > combined.log 2>&1
echo "Combined output (traditional method):"
cat combined.log

echo -e "\n3. Pipe Both stdout and stderr (|&):"
echo "--------------------------------------"
ls . /nonexistent |& grep "ls:" | head -2

echo -e "\n4. Redirect to Multiple Files with tee:"
echo "-----------------------------------------"
echo "Testing tee command" | tee tee1.log tee2.log
echo "tee1.log:"
cat tee1.log
echo "tee2.log:"
cat tee2.log

echo -e "\n5. Grouping Commands for Single Redirection:"
echo "-----------------------------------------------"
{
    echo "Start of group"
    ls .
    echo "Middle of group"
    ls /nonexistent
    echo "End of group"
} > group_output.log 2>&1
echo "Group output (last 5 lines):"
tail -5 group_output.log

echo -e "\n6. Using exec for Permanent Redirection:"
echo "------------------------------------------"
exec 3> custom_fd.log
echo "This goes to file descriptor 3" >&3
echo "This also goes to fd 3" >&3
exec 3>&-  # Close fd 3
echo "custom_fd.log contents:"
cat custom_fd.log

# Cleanup
cd ..
rm -rf /tmp/adv_redir