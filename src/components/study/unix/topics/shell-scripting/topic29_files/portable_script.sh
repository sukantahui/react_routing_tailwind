#!/bin/sh
# portable_script.sh – A fully POSIX‑compliant argument processor

usage() {
    echo "Usage: $0 [-v] [-f file] [-n count]" >&2
    exit 1
}

verbose=0
file=""
count=1

while getopts vf:n: opt; do
    case "$opt" in
        v) verbose=1 ;;
        f) file="$OPTARG" ;;
        n) count="$OPTARG" ;;
        *) usage ;;
    esac
done
shift $((OPTIND - 1))

if [ "$verbose" -eq 1 ]; then
    echo "Verbose mode ON"
fi

printf "File: %s, Count: %d\n" "$file" "$count"
printf "Remaining arguments: %s\n" "$*"