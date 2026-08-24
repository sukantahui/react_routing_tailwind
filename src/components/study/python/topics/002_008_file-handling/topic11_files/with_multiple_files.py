# with_multiple_files.py
# Demonstrates managing multiple files with with

import os

def multiple_files_single_with():
    """Open multiple files in a single with statement."""
    print("🔹 Multiple files in one with:")

    with open('src.txt', 'w', encoding='utf-8') as src, \
         open('dst.txt', 'w', encoding='utf-8') as dst:
        src.write("This is the source content.\n")
        dst.write("This will be overwritten.\n")

    print("✅ Both files written.")

    # Both files are automatically closed

def multiple_files_nested():
    """Open multiple files using nested with statements."""
    print("\n🔹 Nested with statements:")

    with open('src.txt', 'r', encoding='utf-8') as src:
        content = src.read()
        print(f"   Source content: {content.strip()}")

        with open('dst.txt', 'w', encoding='utf-8') as dst:
            dst.write(f"Copied: {content}")

    print("✅ Both files closed (nested).")

def copy_file_example():
    """Copy a file using with for both files."""
    print("\n🔹 Copying file with with:")

    # Create a source file
    with open('source.txt', 'w', encoding='utf-8') as f:
        f.write("Line 1: Hello Swadeep\n")
        f.write("Line 2: Hello Tuhina\n")
        f.write("Line 3: Hello Abhronila\n")

    # Copy it
    with open('source.txt', 'r', encoding='utf-8') as src, \
         open('copy.txt', 'w', encoding='utf-8') as dst:
        for line in src:
            dst.write(line)

    print("✅ File copied successfully.")

    # Verify
    with open('copy.txt', 'r', encoding='utf-8') as f:
        content = f.read()
    print(f"📄 Copy content:\n{content}")

    # Clean up
    for fname in ['src.txt', 'dst.txt', 'source.txt', 'copy.txt']:
        if os.path.exists(fname):
            os.remove(fname)
    print("🧹 Cleaned up.")

if __name__ == "__main__":
    multiple_files_single_with()
    multiple_files_nested()
    copy_file_example()