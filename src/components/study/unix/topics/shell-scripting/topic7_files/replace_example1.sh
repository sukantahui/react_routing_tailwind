#!/bin/bash
# String Replacement Examples
# Topic 7: String Manipulation

echo "=== STRING REPLACEMENT EXAMPLES ==="
echo

# Example 1: Replace first occurrence
text="The quick brown fox jumps over the lazy dog"
echo "Example 1: Replace first 'the' with 'a'"
echo "Original: $text"
echo "Modified: ${text/the/a}"
echo

# Example 2: Replace all occurrences
echo "Example 2: Replace all spaces with underscores"
echo "Original: $text"
echo "Modified: ${text// /_}"
echo

# Example 3: Replace at beginning only (prefix)
filename="backup_2024_12_15.tar.gz"
echo "Example 3: Replace 'backup' with 'archive' at beginning"
echo "Original: $filename"
echo "Modified: ${filename/#backup/archive}"
echo

# Example 4: Replace at end only (suffix)
echo "Example 4: Replace '.gz' with '.zip' at end"
echo "Original: $filename"
echo "Modified: ${filename/%.gz/.zip}"
echo

# Example 5: Practical - Sanitize filename
bad_filename="My Document (Final Version).pdf"
echo "Example 5: Sanitize filename"
echo "Original: $bad_filename"

# Remove spaces
sanitized="${bad_filename// /_}"
# Remove parentheses
sanitized="${sanitized//[()]/}"
# Convert to lowercase
sanitized="${sanitized,,}"

echo "Sanitized: $sanitized"
echo

# Example 6: Replace with pattern
log_entry="ERROR: Connection timeout at 192.168.1.100"
echo "Example 6: Mask IP addresses"
echo "Original: $log_entry"

# Simple IP masking (for demonstration)
masked="${log_entry//[0-9]/X}"
echo "Masked: $masked"
echo

# Example 7: Multiple replacements in sequence
message="Hello WORLD! Today is 2024-12-15"
echo "Example 7: Multiple transformations"
echo "Original: $message"

# Convert to lowercase
step1="${message,,}"
# Replace spaces with hyphens
step2="${step1// /-}"
# Remove punctuation
step3="${step2//[!]/}"

echo "Step 1 (lowercase): $step1"
echo "Step 2 (hyphens): $step2"
echo "Step 3 (no punctuation): $step3"