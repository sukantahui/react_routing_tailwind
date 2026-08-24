# close_errors.py
# Demonstrates errors related to closing files

import os

def error_on_closed_file():
    """Show what happens when you use a closed file."""
    print("🔴 Error: Using a closed file")

    f = open('closed_demo.txt', 'w', encoding='utf-8')
    f.write("This will be written.\n")
    f.close()

    # f is closed; trying to use it raises ValueError
    try:
        f.write("This will fail!\n")
    except ValueError as e:
        print(f"   ❌ ValueError: {e}")

    # Reading from a closed file also raises ValueError
    try:
        content = f.read()
    except ValueError as e:
        print(f"   ❌ ValueError: {e}")

    # Check if file exists
    if os.path.exists('closed_demo.txt'):
        os.remove('closed_demo.txt')
        print("🧹 Cleaned up.")

def safe_use_with_closed_check():
    """Safely check if a file is closed before using it."""
    print("\n✅ Safe: Checking `closed` before use")

    f = open('safe_demo.txt', 'w', encoding='utf-8')
    f.write("Writing...\n")

    if not f.closed:
        print("   File is open, writing more...")
        f.write("More data.\n")

    f.close()

    # Now check before using
    if not f.closed:
        f.write("This won't run.\n")
    else:
        print("   File is closed, skipping operation.")

    # Clean up
    if os.path.exists('safe_demo.txt'):
        os.remove('safe_demo.txt')
        print("🧹 Cleaned up.")

def closing_already_closed():
    """Closing a file that's already closed is safe."""
    print("\n🔵 Safe: Closing an already closed file")

    f = open('double_close.txt', 'w', encoding='utf-8')
    f.write("Data\n")
    f.close()

    # Closing again is harmless
    f.close()
    print("   ✅ Called close() twice - safe.")

    if os.path.exists('double_close.txt'):
        os.remove('double_close.txt')
        print("🧹 Cleaned up.")

if __name__ == "__main__":
    error_on_closed_file()
    safe_use_with_closed_check()
    closing_already_closed()