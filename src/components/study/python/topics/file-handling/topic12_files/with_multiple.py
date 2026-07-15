# with_multiple.py
# Handling multiple files with with

import os

def single_with_multi():
    """Open multiple files in a single with statement."""
    print("🔹 Single with, multiple files:")

    with open('src.txt', 'w', encoding='utf-8') as src, \
         open('dst.txt', 'w', encoding='utf-8') as dst:
        src.write("Source content.\n")
        dst.write("Destination content.\n")

    print("✅ Both files written and closed.")

    # Verify
    with open('src.txt', 'r') as f:
        print(f"   src.txt: {f.read().strip()}")
    with open('dst.txt', 'r') as f:
        print(f"   dst.txt: {f.read().strip()}")

    # Clean up
    for fname in ['src.txt', 'dst.txt']:
        if os.path.exists(fname):
            os.remove(fname)
    print("🧹 Cleaned up.")

def nested_with():
    """Use nested with statements for clarity."""
    print("\n🔹 Nested with statements:")

    with open('in.txt', 'w', encoding='utf-8') as f:
        f.write("Data to be processed.\n")

    with open('in.txt', 'r', encoding='utf-8') as src:
        with open('out.txt', 'w', encoding='utf-8') as dst:
            content = src.read()
            dst.write(f"Processed: {content}")

    print("✅ Nested with closed both files.")

    # Verify
    with open('out.txt', 'r') as f:
        print(f"   out.txt: {f.read().strip()}")

    # Clean up
    for fname in ['in.txt', 'out.txt']:
        if os.path.exists(fname):
            os.remove(fname)
    print("🧹 Cleaned up.")

if __name__ == "__main__":
    single_with_multi()
    nested_with()