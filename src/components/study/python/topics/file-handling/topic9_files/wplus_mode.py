# wplus_mode.py
# Demonstrates the 'w+' mode: write with truncation, then read

import os

def wplus_example():
    """Show how 'w+' truncates and allows reading what was written."""
    filename = "wplus_demo.txt"

    # 'w+' creates/overwrites and allows reading
    with open(filename, 'w+', encoding='utf-8') as f:
        # Write some data
        f.write("Data written with 'w+' mode.\n")
        f.write("This file was truncated first.\n")

        # Seek to start to read what we wrote
        f.seek(0)
        content = f.read()
        print("📄 Content written and read back:")
        print(content)

        # Write more data (after reading, pointer is at the end)
        f.write("\nAdditional data after reading.\n")

        # Read everything again
        f.seek(0)
        print("\n📄 Final content:")
        print(f.read())

    # Check if the file still exists (it does)
    if os.path.exists(filename):
        print(f"\n✅ File '{filename}' exists.")

    # Clean up
    os.remove(filename)
    print("🧹 Cleaned up.")

if __name__ == "__main__":
    wplus_example()