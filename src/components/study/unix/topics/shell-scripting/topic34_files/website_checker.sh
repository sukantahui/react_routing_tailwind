#!/bin/bash
# website_checker.sh – Check HTTP status of a URL
# Usage: ./website_checker.sh <URL> [expected_status]
# Example: ./website_checker.sh https://example.com 200

set -euo pipefail

URL="${1:-}"
EXPECTED="${2:-200}"

if [[ -z "$URL" ]]; then
    echo "Usage: $0 <URL> [expected_status]" >&2
    exit 1
fi

# Check if curl is available
if ! command -v curl >/dev/null 2>&1; then
    echo "Error: curl is not installed." >&2
    exit 1
fi

# Get HTTP status code (follow redirects)
status=$(curl -L -s -o /dev/null -w "%{http_code}" "$URL")

if [[ "$status" == "$EXPECTED" ]]; then
    echo "✅ $URL is OK (status $status)"
    exit 0
else
    echo "❌ $URL returned $status (expected $EXPECTED)" >&2
    exit 1
fi