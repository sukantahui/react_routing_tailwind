# exclusive_mode.py
# Demonstrates the 'x' (exclusive creation) mode

import os
import time

def create_unique_file(filename):
    """Create a new file using 'x' mode; handle if it exists."""
    try:
        with open(filename, 'x', encoding='utf-8') as f:
            f.write("This file was created exclusively.\n")
            f.write(f"Creation time: {time.ctime()}\n")
        print(f"✅ Created new file: {filename}")
    except FileExistsError:
        print(f"❌ File '{filename}' already exists. Not overwritten.")
    except Exception as e:
        print(f"❌ Error: {e}")

if __name__ == "__main__":
    # Try creating a new file
    create_unique_file("new_file.txt")

    # Try creating it again (will fail)
    create_unique_file("new_file.txt")

    # Use timestamp to create unique files
    timestamp = time.strftime("%Y%m%d_%H%M%S")
    unique_file = f"backup_{timestamp}.txt"
    create_unique_file(unique_file)

    # List created files
    print("\n📁 Created files:")
    for f in ["new_file.txt", unique_file]:
        if os.path.exists(f):
            print(f"  - {f}")

    # Clean up
    for f in ["new_file.txt", unique_file]:
        if os.path.exists(f):
            os.remove(f)
    print("🧹 Cleaned up.")