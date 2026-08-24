# automatic_close.py
# Demonstrates automatic closing with try-finally

import os

def try_finally_close():
    """Use try-finally to ensure file is closed."""
    filename = "try_finally_demo.txt"

    f = None
    try:
        f = open(filename, 'w', encoding='utf-8')
        f.write("This is written with try-finally.\n")
        # Simulate an exception
        # raise ValueError("Something went wrong!")
    finally:
        if f is not None:
            f.close()
            print("✅ File closed in finally block.")
        else:
            print("   File was never opened.")

    # Check if it's closed
    try:
        print(f"   f.closed = {f.closed} (if f exists)")
    except UnboundLocalError:
        print("   f was never assigned.")

    # Clean up
    if os.path.exists(filename):
        with open(filename, 'r', encoding='utf-8') as read_f:
            content = read_f.read()
        print(f"📄 File content:\n{content}")
        os.remove(filename)
        print("🧹 Cleaned up.")

def exception_demo():
    """Show that file is closed even when an exception occurs."""
    filename = "exception_demo.txt"

    try:
        f = open(filename, 'w', encoding='utf-8')
        f.write("This will be written, then exception is raised.\n")
        raise RuntimeError("Simulated error!")
    except RuntimeError:
        print("❌ Exception caught! File may still be open.")
        # In a real program, we should close in finally
    finally:
        try:
            f.close()
            print("✅ File closed in finally.")
        except UnboundLocalError:
            pass

    # Clean up
    if os.path.exists(filename):
        os.remove(filename)
        print("🧹 Cleaned up.")

if __name__ == "__main__":
    try_finally_close()
    print()
    exception_demo()