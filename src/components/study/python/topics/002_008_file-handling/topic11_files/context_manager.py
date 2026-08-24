# context_manager.py
# Demonstrates the with statement (context manager)

import os

def context_manager_example():
    """Use 'with' for automatic file closing."""
    filename = "context_demo.txt"

    # with handles opening and closing automatically
    with open(filename, 'w', encoding='utf-8') as f:
        f.write("Written with a context manager.\n")
        f.write("The file will be closed automatically.\n")
        # No need to call f.close()!

    # After the with block, the file is closed
    print("✅ File automatically closed by context manager.")
    print(f"   (Note: f is not defined outside the with block)")

    # Read the file
    with open(filename, 'r', encoding='utf-8') as read_f:
        content = read_f.read()
    print(f"📄 File content:\n{content}")

    # Clean up
    os.remove(filename)
    print("🧹 Cleaned up.")

def exception_in_with():
    """Show that with closes files even with exceptions."""
    filename = "exception_with.txt"

    try:
        with open(filename, 'w', encoding='utf-8') as f:
            f.write("This is written before the exception.\n")
            raise ValueError("Simulated error inside with!")
    except ValueError:
        print("❌ Exception caught.")
        print("✅ File was still closed automatically.")

    # The file should have been closed
    # The with block ensures it

    # Clean up
    if os.path.exists(filename):
        os.remove(filename)
        print("🧹 Cleaned up.")

if __name__ == "__main__":
    context_manager_example()
    print()
    exception_in_with()