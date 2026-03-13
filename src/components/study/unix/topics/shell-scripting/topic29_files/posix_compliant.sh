#!/bin/sh
# posix_compliant.sh – Portable equivalent of bashism_demo.sh

# 1. No arrays – use positional parameters or separate vars
fruit1="apple"; fruit2="banana"; fruit3="cherry"
echo "First fruit: $fruit1"

# 2. Regex – use case statement
case "hello123" in
    *[0-9]*) echo "Contains digits" ;;
esac

# 3. Append – reassign
msg="Hello"
msg="$msg World"
echo "$msg"

# 4. Uppercase – use tr (if available) or manual mapping
name="swadeep"
echo "$name" | tr '[:lower:]' '[:upper:]'