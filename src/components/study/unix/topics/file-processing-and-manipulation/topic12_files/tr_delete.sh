#!/bin/bash
# tr_delete.sh - Delete characters with -d
echo "Hello 123 World!" | tr -d '0-9'      # remove digits
echo "Hello 123 World!" | tr -d ' '        # remove spaces
echo "Hello, World!" | tr -d '[:punct:]'   # remove punctuation