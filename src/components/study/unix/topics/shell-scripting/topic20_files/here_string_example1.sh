#!/bin/bash
# Basic here string examples

# Count characters in a string
wc -c <<< "Hello from Ichapur"

# Convert to uppercase
tr 'a-z' 'A-Z' <<< "bash scripting"

# Search for pattern
grep "script" <<< "This is about bash scripting"