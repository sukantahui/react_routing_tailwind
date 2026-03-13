#!/bin/sh
# clone_and_setup.sh – One‑command environment setup
# Usage: ./clone_and_setup.sh <git-repo-url>

if [ $# -ne 1 ]; then
    echo "Usage: $0 <git-repo-url>"
    exit 1
fi

REPO_URL="$1"
PROJECT_DIR="$(basename "$REPO_URL" .git)"

echo "📦 Cloning $REPO_URL ..."
git clone "$REPO_URL" || exit 1

cd "$PROJECT_DIR" || exit 1

# Make all utility scripts executable
chmod +x *.sh 2>/dev/null

# Symlink into ~/.local/bin for easy access
mkdir -p "$HOME/.local/bin"
for script in *.sh; do
    name="${script%.sh}"
    ln -sf "$(pwd)/$script" "$HOME/.local/bin/$name"
done

echo "✅ Setup complete. Scripts are in ~/.local/bin"