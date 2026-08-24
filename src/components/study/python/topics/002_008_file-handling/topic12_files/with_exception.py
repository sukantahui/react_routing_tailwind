# with_exception.py
# Exception handling with with

import os

def exception_without_with():
    """Exception handling without with (risky)."""
    print("🔴 Without with (risky):")
    filename = "ex_demo.txt"

    try:
        f = open(filename, 'w', encoding='utf-8')
        f.write("Writing...")
        raise ValueError("Simulated error!")
    except ValueError as e:
        print(f"   Exception: {e}")
        # But f is still open! We need to close it.
    finally:
        try:
            f.close()
            print("✅ File closed in finally.")
        except UnboundLocalError:
            pass

    if os.path.exists(filename):
        os.remove(filename)

def exception_with_with():
    """Exception handling with with (safe)."""
    print("\n✅ With (safe):")
    filename = "ex_with.txt"

    try:
        with open(filename, 'w', encoding='utf-8') as f:
            f.write("Writing...")
            raise ValueError("Simulated error!")
    except ValueError as e:
        print(f"   Exception: {e}")
        print("   File was already closed by with.")

    # File should not exist (or be empty) because it was closed
    # after the exception. But if we try to read it:
    if os.path.exists(filename):
        with open(filename, 'r') as f:
            print(f"   File exists with content: {f.read()}")
        os.remove(filename)
    else:
        print("   File was closed and may have been emptied, but it exists?")
        # In practice, the file might be created but empty.
        # Clean up if it exists
        if os.path.exists(filename):
            os.remove(filename)

if __name__ == "__main__":
    exception_without_with()
    print()
    exception_with_with()
    print("🧹 Cleaned up.")