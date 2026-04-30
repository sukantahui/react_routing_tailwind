#!/bin/bash
# octal_vs_symbolic.sh - Compare octal and symbolic modes

mkdir -p /tmp/perm_demo
cd /tmp/perm_demo

echo "=== Create a test file ==="
echo "data" > sample.txt
ls -l sample.txt

echo -e "\n=== Using octal: 755 (rwxr-xr-x) ==="
chmod 755 sample.txt
ls -l sample.txt
stat -c "Octal: %a" sample.txt

echo -e "\n=== Using symbolic: u=rwx,go=rx ==="
chmod u=rwx,go=rx sample.txt
ls -l sample.txt

echo -e "\n=== Add write for group (g+w) ==="
chmod g+w sample.txt
ls -l sample.txt

echo -e "\n=== Remove read from others (o-r) ==="
chmod o-r sample.txt
ls -l sample.txt

echo -e "\n=== Set exact 640 (rw-r-----) using octal ==="
chmod 640 sample.txt
ls -l sample.txt

echo -e "\n=== Recursive on directory ==="
mkdir -p subdir
touch subdir/{a,b,c}.txt
chmod -R 700 subdir
ls -ld subdir
ls -l subdir/

cd /tmp
rm -rf /tmp/perm_demo