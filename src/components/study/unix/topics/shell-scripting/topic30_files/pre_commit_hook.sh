#!/bin/sh
# pre_commit_hook.sh – Git pre-commit hook to validate shell scripts
# Place in .git/hooks/pre-commit and make executable.

echo "🔍 Running pre-commit shell script validation..."

# Check each staged .sh file for syntax errors
for file in $(git diff --cached --name-only --diff-filter=ACM | grep '\.sh$'); do
    if [ -f "$file" ]; then
        bash -n "$file"
        if [ $? -ne 0 ]; then
            echo "❌ Syntax error in $file. Commit aborted."
            exit 1
        fi
    fi
done

echo "✅ All shell scripts look good."
exit 0