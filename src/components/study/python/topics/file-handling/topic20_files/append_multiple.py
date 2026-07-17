# append_multiple.py
# Demonstrates appending multiple lines

import os

def append_multiple_lines():
    """Append multiple lines using writelines()."""
    filename = "multiple.txt"

    # Initial content
    with open(filename, 'w', encoding='utf-8') as f:
        f.write("Initial content\n")
    print("✅ Initial content written")

    # Multiple lines to append
    new_lines = [
        "Appended line 1\n",
        "Appended line 2\n",
        "Appended line 3\n",
        "Appended line 4\n",
    ]

    with open(filename, 'a', encoding='utf-8') as f:
        f.writelines(new_lines)

    print("✅ Appended 4 lines")

    # Read and display
    with open(filename, 'r', encoding='utf-8') as f:
        print(f"\n📄 Content:\n{f.read()}")

    os.remove(filename)

def append_from_list_of_data():
    """Append data from a list, adding newlines."""
    filename = "data_append.txt"

    # Start fresh
    with open(filename, 'w', encoding='utf-8') as f:
        f.write("Student List:\n")
        f.write("-" * 20 + "\n")

    students = ["Swadeep", "Tuhina", "Abhronila", "Debangshu"]

    # Append each student with a newline
    with open(filename, 'a', encoding='utf-8') as f:
        f.writelines([f"{student}\n" for student in students])

    print(f"✅ Appended {len(students)} students")

    with open(filename, 'r', encoding='utf-8') as f:
        print(f"\n📄 Content:\n{f.read()}")

    os.remove(filename)

if __name__ == "__main__":
    append_multiple_lines()
    append_from_list_of_data()
    print("🧹 Cleaned up.")