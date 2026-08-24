# open_errors.py
# Demonstrates error handling when opening files

import os

def handle_open_errors():
    """Show how to gracefully handle open() errors."""
    filename = "missing_file.txt"

    # FileNotFoundError
    try:
        with open(filename, 'r', encoding='utf-8') as f:
            content = f.read()
    except FileNotFoundError:
        print(f"❌ File '{filename}' not found.")
    except PermissionError:
        print(f"❌ Permission denied for '{filename}'.")
    except Exception as e:
        print(f"❌ Unexpected error: {e}")

    # PermissionError (simulate by trying to open a directory as a file)
    try:
        # On Unix, /tmp exists; on Windows, C:\ might work
        dir_path = "/tmp" if os.name == 'posix' else "C:\\"
        with open(dir_path, 'r', encoding='utf-8') as f:
            content = f.read()
    except PermissionError:
        print(f"❌ Cannot open directory as a file: {dir_path}")
    except IsADirectoryError:
        print(f"❌ Is a directory: {dir_path}")
    except Exception as e:
        print(f"❌ Unexpected: {e}")

    # Other errors: e.g., invalid mode
    try:
        with open("dummy.txt", "invalid_mode", encoding='utf-8') as f:
            pass
    except ValueError as e:
        print(f"❌ Invalid mode: {e}")

if __name__ == "__main__":
    handle_open_errors()