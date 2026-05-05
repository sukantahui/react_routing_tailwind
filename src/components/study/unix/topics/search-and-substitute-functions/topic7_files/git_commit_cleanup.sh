#!/bin/bash
# git_commit_cleanup.sh - Clean up commit messages (simulated)
cat > commits.txt <<EOF
fix: typo in docs
feat: add new feature
bugfix: resolve issue #123
WIP: working on stuff
EOF

echo "=== Original commit messages ==="
cat commits.txt

echo -e "\n=== Standardize prefixes ==="
sed -i 's/^bugfix:/fix:/' commits.txt
sed -i 's/^WIP:/chore(wip):/' commits.txt

echo -e "\n=== Capitalize first letter after prefix ==="
sed -E 's/^([a-z]+\(?[a-z]*\)?:) ([a-z])/\1 \U\2/' commits.txt

echo -e "\n=== Final cleaned messages ==="
cat commits.txt

# Cleanup
rm commits.txt