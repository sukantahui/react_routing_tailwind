# inplace_editing.py
# Advanced: In-place file editing with r+

import os

def replace_in_file(filename, search, replace):
    """
    Replace all occurrences of 'search' with 'replace' in the file.
    Uses 'r+' mode for in-place editing.
    """
    # Read the entire file
    with open(filename, 'r', encoding='utf-8') as f:
        content = f.read()

    # Perform replacement
    new_content = content.replace(search, replace)

    # Write back using 'w' (safer for this operation)
    # But we can also use 'r+' with truncate
    with open(filename, 'r+', encoding='utf-8') as f:
        f.write(new_content)
        f.truncate()  # Remove any extra bytes if new_content is shorter

    print(f"✅ Replaced '{search}' with '{replace}'")

def inline_edit_example():
    """Demonstrate in-place file editing."""
    filename = "edit_demo.txt"

    # Create sample file
    with open(filename, 'w', encoding='utf-8') as f:
        f.write("Student: Swadeep, Score: 85\n")
        f.write("Student: Tuhina, Score: 92\n")
        f.write("Student: Abhronila, Score: 78\n")

    print("📄 Original file:")
    with open(filename, 'r', encoding='utf-8') as f:
        print(f.read())

    # Edit in place: change "Score: 85" to "Score: 90"
    replace_in_file(filename, "Score: 85", "Score: 90")

    print("\n📄 After editing:")
    with open(filename, 'r', encoding='utf-8') as f:
        print(f.read())

    # Clean up
    os.remove(filename)
    print("\n🧹 Cleaned up.")

if __name__ == "__main__":
    inline_edit_example()