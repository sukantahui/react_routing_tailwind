# mode_comparison.py
# Compares r+, w+, and a+ side by side

import os

def compare_modes():
    """Show the behavior of each read+write mode."""
    filename = "compare_demo.txt"

    # -------- r+ --------
    print("🔹 MODE 'r+' (file must exist, no truncate)")
    with open(filename, 'w', encoding='utf-8') as f:
        f.write("Line A\nLine B\nLine C\n")

    with open(filename, 'r+', encoding='utf-8') as f:
        f.readline()  # skip line A
        f.write("Line B modified\n")
        f.seek(0)
        print(f.read())

    # -------- w+ --------
    print("\n🔹 MODE 'w+' (creates/overwrites, truncates)")
    with open(filename, 'w+', encoding='utf-8') as f:
        f.write("Fresh content with w+\n")
        f.seek(0)
        print(f.read())

    # -------- a+ --------
    print("\n🔹 MODE 'a+' (creates/appends, preserves)")
    with open(filename, 'a+', encoding='utf-8') as f:
        f.write("Appended line with a+\n")
        f.seek(0)
        print(f.read())

    # Clean up
    os.remove(filename)
    print("\n🧹 Cleaned up.")

if __name__ == "__main__":
    compare_modes()