# file_object_context.py
# Demonstrates the with statement and file object

import os

def context_manager_demo():
    """Show how with handles the file object."""
    filename = "context_demo.txt"

    # Using with
    with open(filename, 'w', encoding='utf-8') as f:
        print(f"Inside with: f.closed = {f.closed}")
        f.write("Hello, context manager!\n")

    # Outside with, file is closed automatically
    # Trying to use f outside would raise error, but we don't have f in scope

    # We can also use it for reading
    with open(filename, 'r', encoding='utf-8') as f:
        content = f.read()
    print(f"📄 Content: {content}")

    # Multiple files in one with
    with open("multi1.txt", 'w', encoding='utf-8') as f1, \
         open("multi2.txt", 'w', encoding='utf-8') as f2:
        f1.write("First file")
        f2.write("Second file")

    # Clean up
    for fname in [filename, "multi1.txt", "multi2.txt"]:
        if os.path.exists(fname):
            os.remove(fname)
    print("🧹 Cleaned up.")

if __name__ == "__main__":
    context_manager_demo()