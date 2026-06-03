#!/bin/bash
# chmod_basics.sh - Demonstrate basic chmod usage

mkdir -p /tmp/chmod_demo
cd /tmp/chmod_demo

echo "=== Creating test files ==="
echo "Hello" > file1.txt
echo "World" > file2.txt
touch script.sh
echo '#!/bin/bash\necho "Running"' > script.sh

echo -e "\n=== Initial permissions ==="
ls -l file1.txt file2.txt script.sh

echo -e "\n=== Add execute for owner on script ==="
chmod u+x script.sh
ls -l script.sh

echo -e "\n=== Remove write for group and others on file1 ==="
chmod go-w file1.txt
ls -l file1.txt

echo -e "\n=== Set exact permissions 644 on file2 (rw-r--r--) ==="
chmod 644 file2.txt
ls -l file2.txt

echo -e "\n=== Add execute for everyone on script (a+x) ==="
chmod a+x script.sh
ls -l script.sh

echo -e "\n=== Copy permissions from file1 to file2 ==="
chmod --reference=file1.txt file2.txt
ls -l file1.txt file2.txt

# Cleanup
cd /tmp
rm -rf /tmp/chmod_demo