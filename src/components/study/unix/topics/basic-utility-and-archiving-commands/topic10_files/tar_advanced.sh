#!/bin/bash
# tar_advanced.sh - Incremental and differential backups

echo "=== Advanced Tar Techniques ==="

# Setup test directory
mkdir -p webapp/{css,js,images}
echo "body { margin:0; }" > webapp/css/style.css
echo "alert('Hello');" > webapp/js/app.js
echo "logo" > webapp/images/logo.png
touch -t 202503010000 webapp/old_image.png

echo -e "\n1. Full backup:"
tar -czf full_backup.tar.gz webapp
ls -lh full_backup.tar.gz

echo -e "\n2. Incremental backup using --listed-incremental:"
tar -czf level0.tar.gz -g snapshot.snar webapp
echo "Level 0 backup created"

# Make changes
echo "New file" > webapp/js/new_script.js
echo "Updated CSS" >> webapp/css/style.css

echo -e "\n3. Incremental (level 1) backup:"
tar -czf level1.tar.gz -g snapshot.snar webapp
ls -lh level*.tar.gz

echo -e "\n4. Differential backup (using find -newer):"
touch reference.timestamp
tar -czf differential.tar.gz --newer=reference.timestamp webapp 2>/dev/null
ls -lh differential.tar.gz

echo -e "\n5. Restore from incremental backups:"
mkdir restore_test
tar -xzf level0.tar.gz -C restore_test
tar -xzf level1.tar.gz -C restore_test
echo "Restored with changes"
ls -l restore_test/webapp/js/

echo -e "\n6. Archive and compress in parallel:"
if command -v pigz &>/dev/null; then
    tar -cf - webapp | pigz -9 > parallel.tar.gz
    echo "Used pigz for parallel compression"
else
    echo "pigz not installed, skipping"
fi

# Cleanup
rm -rf webapp full_backup.tar.gz level*.tar.gz differential.tar.gz snapshot.snar restore_test reference.timestamp parallel.tar.gz