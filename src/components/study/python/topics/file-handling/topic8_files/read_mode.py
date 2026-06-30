# read_mode.py
# Demonstrates the 'r' (read) mode

import os

def safe_read(filename):
    """Safely read a file using 'r' mode with error handling."""
    try:
        with open(filename, 'r', encoding='utf-8') as f:
            content = f.read()
            print(f"📖 Content of '{filename}':")
            print(content)
    except FileNotFoundError:
        print(f"❌ File '{filename}' not found. Please create it first.")
    except PermissionError:
        print(f"❌ Permission denied for '{filename}'.")
    except Exception as e:
        print(f"❌ Unexpected error: {e}")

if __name__ == "__main__":
    # Create a sample file first
    with open("sample.txt", 'w', encoding='utf-8') as f:
        f.write("Hello, Swadeep!\n")
        f.write("This file is read using 'r' mode.\n")

    # Read it
    safe_read("sample.txt")

    # Try reading a non-existent file
    safe_read("missing.txt")

    # Clean up
    os.remove("sample.txt")
    print("🧹 Cleaned up.")