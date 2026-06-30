# read_full.py
# Demonstrates reading the entire file with read()

import os

def create_sample_file(filename="sample.txt"):
    """Create a small sample file."""
    with open(filename, 'w', encoding='utf-8') as f:
        f.write("Line 1: Hello Swadeep\n")
        f.write("Line 2: Hello Tuhina\n")
        f.write("Line 3: Hello Abhronila\n")
        f.write("Line 4: Hello Debangshu\n")
    print(f"✅ Created sample file: {filename}")

def read_entire_file(filename):
    """Read the entire file and display its content."""
    with open(filename, 'r', encoding='utf-8') as f:
        content = f.read()
    print(f"📄 Content of '{filename}' ({len(content)} characters):")
    print(content)
    print(f"   Type: {type(content)}")

def read_empty_file():
    """Read an empty file."""
    filename = "empty.txt"
    open(filename, 'w').close()  # Create empty file

    with open(filename, 'r', encoding='utf-8') as f:
        content = f.read()
    print(f"\n📄 Empty file: '{content}' (length {len(content)})")
    os.remove(filename)

if __name__ == "__main__":
    create_sample_file()
    read_entire_file("sample.txt")
    read_empty_file()
    os.remove("sample.txt")
    print("🧹 Cleaned up.")