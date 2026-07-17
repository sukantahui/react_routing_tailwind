# write_multiple.py
# Demonstrates writing multiple lines

import os

def write_multiple_lines():
    """Write multiple lines using write() with newlines."""
    filename = "lines.txt"

    with open(filename, 'w', encoding='utf-8') as f:
        f.write("Line 1: Student Swadeep\n")
        f.write("Line 2: Student Tuhina\n")
        f.write("Line 3: Student Abhronila\n")
        f.write("Line 4: Student Debangshu\n")

    print(f"✅ Wrote 4 lines to {filename}")

    # Show the content
    with open(filename, 'r', encoding='utf-8') as f:
        print("\n📄 File content:")
        print(f.read())

    os.remove(filename)
    print("🧹 Cleaned up.")

def write_with_loop():
    """Write lines in a loop."""
    filename = "loop_output.txt"

    students = ["Swadeep", "Tuhina", "Abhronila", "Debangshu"]

    with open(filename, 'w', encoding='utf-8') as f:
        for i, name in enumerate(students, 1):
            f.write(f"Student {i}: {name}\n")

    print(f"✅ Wrote {len(students)} lines in loop")

    # Show the content
    with open(filename, 'r', encoding='utf-8') as f:
        print("\n📄 File content:")
        print(f.read())

    os.remove(filename)
    print("🧹 Cleaned up.")

if __name__ == "__main__":
    write_multiple_lines()
    write_with_loop()