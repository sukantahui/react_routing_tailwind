# change_cwd.py
# Demonstrates changing the current working directory

import os

def change_cwd_example():
    """Change the CWD and show the difference."""
    original_cwd = os.getcwd()
    print(f"📍 Original CWD: {original_cwd}")

    # Try to change to a directory that likely exists (user's home)
    home = os.path.expanduser("~")
    try:
        os.chdir(home)
        print(f"🔄 Changed CWD to: {os.getcwd()}")
    except FileNotFoundError:
        print(f"❌ Directory not found: {home}")
    except PermissionError:
        print(f"❌ Permission denied: {home}")

    # Change to a parent directory
    try:
        os.chdir("..")  # Go up one level
        print(f"🔄 Changed CWD to: {os.getcwd()}")
    except Exception as e:
        print(f"❌ Error: {e}")

    # Restore original CWD
    try:
        os.chdir(original_cwd)
        print(f"↩️ Restored CWD to: {os.getcwd()}")
    except Exception as e:
        print(f"❌ Could not restore: {e}")

    # Demonstrate a temporary CWD change with a context manager pattern
    # (Note: this is a manual implementation; see the tip in the lesson)
    print("\n🔁 Temporary CWD change (manual):")
    old_cwd = os.getcwd()
    try:
        os.chdir("/tmp")  # Usually exists on Unix
        print(f"   Inside temp: {os.getcwd()}")
    except Exception:
        pass
    finally:
        os.chdir(old_cwd)
        print(f"   Restored: {os.getcwd()}")

if __name__ == "__main__":
    change_cwd_example()