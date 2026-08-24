# open_modes.py
# Demonstrates different file modes

import os

def demo_modes():
    """Show the effect of various open modes."""
    filename = "modes_demo.txt"

    # Write mode 'w' - creates/overwrites
    with open(filename, 'w', encoding='utf-8') as f:
        f.write("Line 1: Initial content\n")
    print("✅ 'w' created file with one line.")

    # Append mode 'a' - adds to end
    with open(filename, 'a', encoding='utf-8') as f:
        f.write("Line 2: Appended\n")
    print("✅ 'a' appended a line.")

    # Read mode 'r' - reads
    with open(filename, 'r', encoding='utf-8') as f:
        content = f.read()
    print("📄 Content after append:")
    print(content)

    # Exclusive creation 'x' - fails if file exists
    try:
        with open(filename, 'x', encoding='utf-8') as f:
            f.write("This will not be written.")
    except FileExistsError:
        print("❌ 'x' mode raised FileExistsError (as expected).")

    # Read + write 'r+' - read and write from start
    with open(filename, 'r+', encoding='utf-8') as f:
        f.write("Overwritten first line\n")
        f.seek(0)  # go back to start
        print("📄 After r+ overwrite:")
        print(f.read())

    # Clean up
    os.remove(filename)
    print("🧹 Cleaned up.")

if __name__ == "__main__":
    demo_modes()