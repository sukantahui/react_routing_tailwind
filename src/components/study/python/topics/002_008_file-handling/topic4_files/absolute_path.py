# absolute_path.py
# Demonstrates constructing and using absolute paths

import os

def get_absolute_path(relative_path):
    """Convert a relative path to an absolute path."""
    abs_path = os.path.abspath(relative_path)
    print(f"🔍 '{relative_path}' → '{abs_path}'")
    return abs_path

def check_file_exists(filename):
    """Check if a file exists and print its absolute path."""
    if os.path.exists(filename):
        print(f"✅ File exists: {os.path.abspath(filename)}")
    else:
        print(f"❌ File not found: {filename}")

if __name__ == "__main__":
    # Create a dummy file for demonstration
    with open("demo.txt", "w") as f:
        f.write("This is a test file.")

    print("📌 Absolute path examples:")
    get_absolute_path("demo.txt")
    get_absolute_path("..")
    get_absolute_path("~/Documents")  # Note: ~ is not expanded by abspath

    # Expand user home manually
    home_expanded = os.path.expanduser("~/Documents")
    print(f"\nHome expanded: {home_expanded}")
    print(f"Absolute: {os.path.abspath(home_expanded)}")

    check_file_exists("demo.txt")
    check_file_exists("nonexistent.txt")

    # Clean up
    os.remove("demo.txt")