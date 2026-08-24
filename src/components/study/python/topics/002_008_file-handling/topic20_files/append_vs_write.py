# append_vs_write.py
# Side-by-side comparison of append and write

import os

def compare_append_write():
    """Show the difference between 'w' and 'a' modes."""
    filename = "compare.txt"

    # Write mode - overwrites
    print("🔹 Write mode ('w'):")
    with open(filename, 'w', encoding='utf-8') as f:
        f.write("First write\n")
    print("   First write: 'First write'")
    with open(filename, 'w', encoding='utf-8') as f:
        f.write("Second write (overwrote!)\n")
    print("   Second write: 'Second write (overwrote!)'")

    with open(filename, 'r', encoding='utf-8') as f:
        print(f"   Result: {f.read().strip()}")

    print("\n🔹 Append mode ('a'):")
    with open(filename, 'w', encoding='utf-8') as f:
        f.write("First line\n")
    print("   First: 'First line'")

    with open(filename, 'a', encoding='utf-8') as f:
        f.write("Second line\n")
    print("   Second: 'Second line'")

    with open(filename, 'a', encoding='utf-8') as f:
        f.write("Third line\n")
    print("   Third: 'Third line'")

    with open(filename, 'r', encoding='utf-8') as f:
        print(f"   Result:\n{f.read()}")

    os.remove(filename)
    print("🧹 Cleaned up.")

if __name__ == "__main__":
    compare_append_write()