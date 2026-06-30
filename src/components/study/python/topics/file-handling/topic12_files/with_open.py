# with_open.py
# Basic usage of with open()

import os

def basic_with_open():
    """Demonstrate basic with open() usage."""
    filename = "with_demo.txt"

    # Write with with
    with open(filename, 'w', encoding='utf-8') as f:
        f.write("Written with 'with' statement.\n")
        f.write("The file will close automatically.\n")
    print("✅ File written and closed automatically.")

    # Read with with
    with open(filename, 'r', encoding='utf-8') as f:
        content = f.read()
    print(f"📄 Content:\n{content}")

    # The file object is not accessible outside the block
    # If you try to access f here, you'll get a NameError
    # try:
    #     f.read()
    # except NameError:
    #     print("❌ f is not defined outside the with block.")

    # Clean up
    os.remove(filename)
    print("🧹 Cleaned up.")

if __name__ == "__main__":
    basic_with_open()