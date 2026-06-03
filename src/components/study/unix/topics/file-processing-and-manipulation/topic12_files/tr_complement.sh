#!/bin/bash
# tr_complement.sh - Complement with -c
echo "abc123def456" | tr -c '[:digit:]' ' '   # keep only digits, replace others with space
echo "abc123def456" | tr -cd '[:digit:]'      # delete everything except digits
echo "Hello 2025" | tr -c 'a-zA-Z ' '?'