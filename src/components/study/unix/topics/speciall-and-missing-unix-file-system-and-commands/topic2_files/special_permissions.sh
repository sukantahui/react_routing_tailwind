#!/bin/bash
# special_permissions.sh - Demonstrate setuid, setgid, sticky bit

mkdir -p /tmp/special_demo
cd /tmp/special_demo

echo "=== setuid (u+s) - runs with owner's privileges ==="
echo '#!/bin/bash\necho "Effective UID: $EUID"' > checksuid.sh
chmod 755 checksuid.sh
echo "Before setuid:"
./checksuid.sh
sudo chown root checksuid.sh 2>/dev/null || echo "Need sudo for root owner"
chmod u+s checksuid.sh 2>/dev/null
echo "After setuid (if owned by root, will show 0):"
./checksuid.sh || echo "Note: setuid on scripts may be ignored for security"

echo -e "\n=== setgid on directory (g+s) -> new files inherit group ==="
mkdir shared
chmod 2770 shared   # setgid + rwxrwx---
chgrp $(id -gn) shared 2>/dev/null
touch shared/newfile.txt
ls -ld shared
ls -l shared/

echo -e "\n=== Sticky bit on directory (chmod +t) ==="
mkdir public
chmod 1777 public   # sticky + rwxrwxrwt
# Create files as different users (simulate)
touch public/file_owner
chmod 1777 public
ls -ld public

echo -e "\n=== Sticky bit prevents non-owners from deleting ==="
echo "Only owner, directory owner, or root can delete files in /tmp (which has sticky bit)."
ls -ld /tmp

cd /tmp
rm -rf /tmp/special_demo