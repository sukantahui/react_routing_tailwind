# manual_close.py
# Demonstrates manual file closing with close()

import os

def manual_close_example():
    """Show manual file closing (the risky way)."""
    filename = "manual_demo.txt"

    # Open file manually
    f = open(filename, 'w', encoding='utf-8')
    f.write("This is written manually.\n")
    f.write("We must remember to close the file.\n")

    # Close manually
    f.close()
    print("✅ File closed manually.")

    # Check if it's closed
    print(f"   f.closed = {f.closed}")

    # Try to read the file
    with open(filename, 'r', encoding='utf-8') as read_f:
        content = read_f.read()
    print(f"📄 File content:\n{content}")

    # Clean up
    os.remove(filename)
    print("🧹 Cleaned up.")

def risky_manual_close():
    """Show what happens if you forget to close."""
    print("\n🔴 Risky: Forgetting to close")
    filename = "risky_demo.txt"

    # Open file but DON'T close it
    f = open(filename, 'w', encoding='utf-8')
    f.write("This file is not closed!\n")
    # f.close() is MISSING!

    # The file object is still open
    print(f"   f.closed = {f.closed} (still open!)")

    # In a real program, this would leak a file descriptor
    # We'll clean up properly here
    f.close()
    os.remove(filename)
    print("   (Cleaned up manually)")

if __name__ == "__main__":
    manual_close_example()
    risky_manual_close()
    print("🧹 All cleaned up.")