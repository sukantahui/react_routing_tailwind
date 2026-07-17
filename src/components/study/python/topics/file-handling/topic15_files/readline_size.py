# readline_size.py
# Demonstrates the size parameter of readline()

import os

def create_test_file():
    """Create a file with some lines of varying lengths."""
    filename = "size_test.txt"
    with open(filename, 'w', encoding='utf-8') as f:
        f.write("Short line\n")
        f.write("This is a much longer line with many characters\n")
        f.write("Another line\n")
    print(f"✅ Created test file: {filename}")
    return filename

def readline_size_examples(filename):
    """Show how the size parameter works."""
    with open(filename, 'r', encoding='utf-8') as f:
        # Read only 5 characters from first line
        part1 = f.readline(5)
        print(f"📖 readline(5): {repr(part1)}")

        # Read the rest of the first line
        rest1 = f.readline()
        print(f"📖 readline() (rest): {repr(rest1)}")

        # Read only 10 characters from second line
        part2 = f.readline(10)
        print(f"📖 readline(10): {repr(part2)}")

        # Read the rest of the second line
        rest2 = f.readline()
        print(f"📖 readline() (rest): {repr(rest2)}")

        # Read third line fully
        line3 = f.readline()
        print(f"📖 readline(): {repr(line3)}")

def readline_size_binary(filename):
    """Show size parameter in binary mode."""
    # Create a binary file with newlines
    with open("binary_test.bin", 'wb') as f:
        f.write(b"Line 1 with data\n")
        f.write(b"Line 2 with data\n")

    print("\n🔍 Binary mode with size:")
    with open("binary_test.bin", 'rb') as f:
        part = f.readline(5)
        print(f"   readline(5): {repr(part)}")
        rest = f.readline()
        print(f"   readline(): {repr(rest)}")

    os.remove("binary_test.bin")

if __name__ == "__main__":
    filename = create_test_file()
    readline_size_examples(filename)
    readline_size_binary(filename)
    os.remove(filename)
    print("🧹 Cleaned up.")