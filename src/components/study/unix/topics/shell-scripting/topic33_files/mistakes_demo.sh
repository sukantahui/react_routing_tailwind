#!/bin/bash
# mistakes_demo.sh – A script full of classic beginner errors
# DO NOT USE THIS AS A TEMPLATE!

# 1. Unquoted variable
dir=/tmp/my folder
mkdir $dir          # Breaks – tries to create /tmp/my and folder

# 2. Using [ ] with > inside
count=5
if [ $count > 3 ]; then   # > is output redirection, creates file named "3"
    echo "count > 3"
fi

# 3. Parsing ls
for file in $(ls *.txt); do
    echo "Processing $file"   # Fails if filenames contain spaces
done

# 4. Backticks and missing error handling
output=`grep root /etc/passwd`
echo "Found: $output"        # No check if grep succeeded

# 5. Forgetting to exit on error
cd /nonexistent
rm -rf *                    # If cd fails, this runs in current directory!

echo "Done"