# write_formatting.py
# Demonstrates formatting output with write()

import os

def format_with_fstrings():
    """Write formatted data using f-strings."""
    filename = "formatted.txt"

    students = [
        {"name": "Swadeep", "class": 10, "score": 95},
        {"name": "Tuhina", "class": 9, "score": 88},
        {"name": "Abhronila", "class": 11, "score": 92},
        {"name": "Debangshu", "class": 10, "score": 78},
    ]

    with open(filename, 'w', encoding='utf-8') as f:
        # Write header
        f.write(f"{'Name':<15} {'Class':<8} {'Score':<6}\n")
        f.write("-" * 30 + "\n")

        # Write each student
        for student in students:
            f.write(f"{student['name']:<15} {student['class']:<8} {student['score']:<6}\n")

    print(f"✅ Formatted data written to {filename}")

    with open(filename, 'r', encoding='utf-8') as f:
        print("\n📄 Formatted output:")
        print(f.read())

    os.remove(filename)
    print("🧹 Cleaned up.")

def format_with_join():
    """Write using join() for efficiency."""
    filename = "join_output.txt"

    lines = [
        "Header: Student Records",
        "-----------------------",
        "1. Swadeep - Class 10",
        "2. Tuhina - Class 9",
        "3. Abhronila - Class 11",
        "4. Debangshu - Class 10",
    ]

    with open(filename, 'w', encoding='utf-8') as f:
        f.write("\n".join(lines))

    print(f"✅ Wrote {len(lines)} lines using join()")

    with open(filename, 'r', encoding='utf-8') as f:
        print("\n📄 Content:")
        print(f.read())

    os.remove(filename)
    print("🧹 Cleaned up.")

def format_with_template():
    """Write using a template string."""
    filename = "template_output.txt"

    template = "Name: {name}, Class: {class}, Score: {score}\n"
    students = [
        {"name": "Swadeep", "class": 10, "score": 95},
        {"name": "Tuhina", "class": 9, "score": 88},
    ]

    with open(filename, 'w', encoding='utf-8') as f:
        for student in students:
            f.write(template.format(**student))

    print(f"✅ Written using template")

    with open(filename, 'r', encoding='utf-8') as f:
        print("\n📄 Content:")
        print(f.read())

    os.remove(filename)
    print("🧹 Cleaned up.")

if __name__ == "__main__":
    format_with_fstrings()
    format_with_join()
    format_with_template()