# writelines_no_newline.py
# Demonstrates the importance of newlines

import os

def without_newlines():
    """Write lines without newlines (bad)."""
    filename = "no_newlines.txt"

    lines = ["Line 1", "Line 2", "Line 3"]  # No newlines!

    with open(filename, 'w', encoding='utf-8') as f:
        f.writelines(lines)

    print("📄 Without newlines:")
    with open(filename, 'r', encoding='utf-8') as f:
        content = f.read()
    print(f"Content: {repr(content)}")
    print(f"Displayed:\n{content}")

    os.remove(filename)

def with_newlines():
    """Write lines with newlines (correct)."""
    filename = "with_newlines.txt"

    lines = ["Line 1\n", "Line 2\n", "Line 3\n"]

    with open(filename, 'w', encoding='utf-8') as f:
        f.writelines(lines)

    print("\n✅ With newlines:")
    with open(filename, 'r', encoding='utf-8') as f:
        content = f.read()
    print(f"Content: {repr(content)}")
    print(f"Displayed:\n{content}")

    os.remove(filename)

def adding_newlines_with_comprehension():
    """Add newlines using list comprehension."""
    filename = "comprehension.txt"
    data = ["Apple", "Banana", "Cherry"]

    lines = [f"{item}\n" for item in data]

    with open(filename, 'w', encoding='utf-8') as f:
        f.writelines(lines)

    print("\n📄 With list comprehension:")
    with open(filename, 'r', encoding='utf-8') as f:
        print(f.read())

    os.remove(filename)

if __name__ == "__main__":
    without_newlines()
    with_newlines()
    adding_newlines_with_comprehension()
    print("🧹 Cleaned up.")