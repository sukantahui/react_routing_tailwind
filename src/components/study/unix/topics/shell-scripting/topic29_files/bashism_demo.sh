#!/bin/bash
# bashism_demo.sh – Contains features NOT portable to /bin/sh

# 1. Array
fruits=("apple" "banana" "cherry")
echo "First fruit: ${fruits[0]}"

# 2. [[ ]] with regex
if [[ "hello123" =~ [0-9]+ ]]; then
    echo "Contains digits"
fi

# 3. += append to variable
msg="Hello"
msg+=" World"
echo "$msg"

# 4. Uppercase transformation
name="swadeep"
echo "${name^^}"