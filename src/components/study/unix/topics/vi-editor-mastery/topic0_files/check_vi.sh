#!/bin/sh
# check_vi.sh – demonstrate ubiquity of vi
echo "=== vi / vim ubiquity check ==="
if command -v vi >/dev/null 2>&1; then
    echo "✓ vi found at: $(command -v vi)"
    vi --version 2>/dev/null | head -n1
else
    echo "✗ vi not found? This is extremely rare on Unix systems."
fi