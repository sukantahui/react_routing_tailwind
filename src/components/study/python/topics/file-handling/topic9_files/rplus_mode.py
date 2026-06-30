# rplus_mode.py
# Demonstrates the 'r+' mode: read and write without truncation

import os

def rplus_example():
    """Show how 'r+' allows reading and writing without truncation."""
    filename = "rplus_demo.txt"

    # Create a sample file
    with open(filename, 'w', encoding='utf-8') as f:
        f.write("Line 1: Original content\n")
        f.write("Line 2: Original content\n")
        f.write("Line 3: Original content\n")

    print("📄 Original file content:")
    with open(filename, 'r', encoding='utf-8') as f:
        print(f.read())

    # Now use 'r+' to read and modify
    with open(filename, 'r+', encoding='utf-8') as f:
        # Read the first line
        line = f.readline()
        print(f"\n📖 Read line: {line.strip()}")

        # Move pointer back to start of line 2 (after first line)
        f.seek(len(line))

        # Overwrite line 2
        f.write("Line 2: MODIFIED with r+\n")

        # Read the rest to see changes
        f.seek(0)  # go to start
        print("\n📄 After modification:")
        print(f.read())

    # Clean up
    os.remove(filename)
    print("\n🧹 Cleaned up.")

if __name__ == "__main__":
    rplus_example()