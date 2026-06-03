#!/bin/bash
# interpreting_output.sh - Understand why df and du differ

mkdir -p /tmp/du_df_diff
cd /tmp/du_df_diff

echo "=== Create a small filesystem in a file (loopback) ==="
dd if=/dev/zero of=disk.img bs=1M count=50 2>/dev/null
mkfs.ext4 -F disk.img 2>/dev/null
mkdir -p mnt
sudo mount -o loop disk.img mnt 2>/dev/null || echo "Requires sudo to mount; skipping mount demo"

echo "=== df on the mount point ==="
df -h mnt 2>/dev/null

echo "=== Populate with files ==="
sudo chown $USER mnt 2>/dev/null
mkdir mnt/data
dd if=/dev/zero of=mnt/data/bigfile bs=1M count=20 2>/dev/null

echo -e "\n=== du on the mount point ==="
du -sh mnt

echo -e "\n=== df on the mount point (now includes metadata and reserved blocks) ==="
df -h mnt

echo -e "\n=== Simulate open deleted file ==="
touch mnt/delete_me.txt
tail -f mnt/delete_me.txt > /dev/null 2>&1 &
TAIL_PID=$!
rm mnt/delete_me.txt
echo "File deleted but still open by tail (PID $TAIL_PID)"
df -h mnt | grep -E "Mounted|mnt"
kill $TAIL_PID 2>/dev/null
sudo umount mnt 2>/dev/null
rm disk.img
cd /tmp
rm -rf /tmp/du_df_diff