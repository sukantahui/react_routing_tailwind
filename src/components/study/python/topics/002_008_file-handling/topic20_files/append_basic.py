# append_basic.py
# Demonstrates basic appending with 'a' mode

import os

def basic_append_example():
    """Show basic appending to a file."""
    filename = "append_demo.txt"

    # First write some content
    with open(filename, 'w', encoding='utf-8') as f:
        f.write("Initial content: Line 1\n")
    print("✅ Initial file created")

    # Append more content
    with open(filename, 'a', encoding='utf-8') as f:
        f.write("Appended: Line 2\n")
        f.write("Appended: Line 3\n")
    print("✅ Appended lines 2 and 3")

    # Read the file
    with open(filename, 'r', encoding='utf-8') as f:
        content = f.read()
    print(f"\n📄 Final content:\n{content}")

    # Clean up
    os.remove(filename)
    print("🧹 Cleaned up.")

def append_creates_file():
    """Show that 'a' creates the file if it doesn't exist."""
    filename = "new_file.txt"

    # File doesn't exist yet
    if not os.path.exists(filename):
        print("📁 File doesn't exist yet")

    # Open in 'a' mode - creates the file
    with open(filename, 'a', encoding='utf-8') as f:
        f.write("This file was created by append mode.\n")

    print(f"✅ File created: {filename}")

    # Verify
    with open(filename, 'r', encoding='utf-8') as f:
        print(f"📄 Content: {f.read()}")

    os.remove(filename)
    print("🧹 Cleaned up.")

if __name__ == "__main__":
    basic_append_example()
    append_creates_file()