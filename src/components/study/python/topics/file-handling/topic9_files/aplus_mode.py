# aplus_mode.py
# Demonstrates the 'a+' mode: append and read

import os
import datetime

def aplus_example():
    """Show how 'a+' allows appending and reading."""
    filename = "aplus_demo.txt"

    # Start with some content
    with open(filename, 'w', encoding='utf-8') as f:
        f.write("Initial log entry: Started\n")

    # Use 'a+' to read existing and append
    with open(filename, 'a+', encoding='utf-8') as f:
        # Read existing content (pointer is at start)
        existing = f.read()
        print("📄 Existing content:")
        print(existing)

        # Append new entries (pointer is now at end)
        timestamp = datetime.datetime.now().strftime("%H:%M:%S")
        f.write(f"[{timestamp}] New event: Processing...\n")

        # Try to read again without seek (pointer is at end, so nothing)
        more = f.read()
        print(f"\n📖 Reading without seek returns: '{more}' (empty)")

        # Seek to start to see everything
        f.seek(0)
        print("\n📄 Complete content after append:")
        print(f.read())

    # Clean up
    os.remove(filename)
    print("\n🧹 Cleaned up.")

if __name__ == "__main__":
    aplus_example()