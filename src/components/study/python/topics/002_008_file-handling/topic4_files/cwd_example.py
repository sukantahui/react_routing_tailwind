# cwd_example.py
# Demonstrates getting and changing the current working directory

import os

def show_cwd():
    """Print the current working directory."""
    cwd = os.getcwd()
    print(f"📂 Current working directory: {cwd}")

def change_cwd_example():
    """Change the CWD to the user's home directory (if possible) and back."""
    try:
        home = os.path.expanduser("~")
        print(f"🔄 Changing to: {home}")
        os.chdir(home)
        show_cwd()
        # Change back to original (we don't store original, so we'll just
        # revert to a known location, but in practice store the old path)
        os.chdir("..")  # just to show you can change
        print("↩️ Moved up one level")
        show_cwd()
    except FileNotFoundError:
        print("❌ Directory not found.")
    except PermissionError:
        print("❌ Permission denied.")

if __name__ == "__main__":
    show_cwd()
    change_cwd_example()