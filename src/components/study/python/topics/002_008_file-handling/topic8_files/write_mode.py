# write_mode.py
# Demonstrates the 'w' (write) mode

import os

def write_file(content, filename="output.txt"):
    """Write content to a file using 'w' mode (overwrites)."""
    with open(filename, 'w', encoding='utf-8') as f:
        f.write(content)
    print(f"✅ Written to '{filename}'.")
    print(f"   Content: {content[:50]}...")

if __name__ == "__main__":
    # First write
    write_file("First content: Hello from Barrackpore.\n", "demo.txt")

    # Second write - overwrites
    write_file("Second content: This overwrites the previous data.\n", "demo.txt")

    # Show the file content
    with open("demo.txt", 'r', encoding='utf-8') as f:
        print("\n📄 Final content:")
        print(f.read())

    # Clean up
    os.remove("demo.txt")
    print("🧹 Cleaned up.")