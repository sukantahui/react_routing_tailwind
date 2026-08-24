# file_object_attributes.py
# Shows attributes of a file object

import os

def inspect_attributes():
    """Print attributes of an open file."""
    filename = "attr_demo.txt"

    with open(filename, 'w', encoding='utf-8') as f:
        # Write something
        f.write("Sample content.\n")

        # Inspect attributes
        print("📋 File Object Attributes:")
        print(f"  .closed   = {f.closed}")
        print(f"  .mode     = {f.mode}")
        print(f"  .name     = {f.name}")
        print(f"  .encoding = {f.encoding}")
        print(f"  .errors   = {f.errors}")
        print(f"  .newlines = {f.newlines}")
        print(f"  .buffer   = {f.buffer}")

    # After closing
    print("\n📋 After closing:")
    with open(filename, 'r', encoding='utf-8') as f:
        print(f"  .closed before close = {f.closed}")
        # After exit, it's closed
    # We can't access f outside the with, but we can check if we kept a reference

    # Let's keep a reference
    f = open(filename, 'r', encoding='utf-8')
    print(f"  .closed before manual close = {f.closed}")
    f.close()
    print(f"  .closed after manual close  = {f.closed}")

    # Clean up
    os.remove(filename)
    print("\n🧹 Cleaned up.")

if __name__ == "__main__":
    inspect_attributes()