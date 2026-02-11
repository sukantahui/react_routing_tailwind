#!/bin/bash
# shellcheck_example.sh – This script triggers common ShellCheck warnings

# SC2086: unquoted variable
name="Alice"
echo Hello $name

# SC2002: useless cat
cat file.txt | grep "error"

# SC2162: read without -r
echo "Enter path:" 
read path

# SC2046: unquoted $(...)
rm -f $(find /tmp -name "*.tmp")

# SC2068: missing quotes in array expansion
arr=("one" "two three")
for i in ${arr[@]}; do
    echo $i
done

# SC2155: export + assignment in same line
export MESSAGE=$(date)

# To see warnings: shellcheck shellcheck_example.sh