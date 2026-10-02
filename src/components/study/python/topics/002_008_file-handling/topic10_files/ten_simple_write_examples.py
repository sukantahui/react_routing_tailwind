"""
================================================================================
10 SIMPLE FILE WRITING EXAMPLES IN PYTHON
Module: 002_008_file-handling (File Handling & Persistence)
Instructor: Sukanta Hui (Coder & AccoTax, Barrackpore)
================================================================================
"""

# ==============================================================================
# EXAMPLE 1: Write a Single Line to a Fresh File
# ==============================================================================
def example_1_single_line():
    """Simple write of a single text string."""
    with open("example1_hello.txt", "w", encoding="utf-8") as f:
        f.write("Hello World! Welcome to Python File Handling at Barrackpore.\n")
    print("[Ex 1] File 'example1_hello.txt' created with 1 line.")


# ==============================================================================
# EXAMPLE 2: Write Multiple Lines using write() and Explicit '\n'
# ==============================================================================
def example_2_multiple_lines():
    """Writing multiple consecutive lines with explicit newline breaks."""
    with open("example2_students.txt", "w", encoding="utf-8") as f:
        f.write("Student 1: Mamata (Barrackpore)\n")
        f.write("Student 2: Debangshu (Jadavpur)\n")
        f.write("Student 3: Susmita (Kolkata)\n")
    print("[Ex 2] File 'example2_students.txt' written with 3 lines.")


# ==============================================================================
# EXAMPLE 3: Writing Numbers and Variables using f-strings
# ==============================================================================
def example_3_numbers_and_fstrings():
    """Converting integer and float values to strings before writing."""
    student_name = "Mahima"
    roll_number = 104
    fee_paid = 5500
    marks_percentage = 95.5

    with open("example3_receipt.txt", "w", encoding="utf-8") as f:
        # NOTICE: f.write(fee_paid) directly raises TypeError!
        # Always format numbers inside strings:
        f.write(f"Roll No: {roll_number}\n")
        f.write(f"Student: {student_name}\n")
        f.write(f"Fee Paid: ₹{fee_paid:,}\n")
        f.write(f"Score: {marks_percentage}%\n")
    print("[Ex 3] Number formatting receipt generated.")


# ==============================================================================
# EXAMPLE 4: Append Mode ('a') - Adding Records without Overwriting
# ==============================================================================
def example_4_append_mode():
    """Preserves existing data and appends new lines to the end."""
    # Step 1: Create initial file
    with open("example4_attendance.txt", "w", encoding="utf-8") as f:
        f.write("=== DAILY BATCH ATTENDANCE ===\n")
        f.write("[09:00 AM] Mamata: Present\n")

    # Step 2: Later in the day, append new entries using mode='a'
    with open("example4_attendance.txt", "a", encoding="utf-8") as f:
        f.write("[09:05 AM] Debangshu: Present\n")
        f.write("[09:10 AM] Susmita: Present\n")
    print("[Ex 4] Attendance log appended without wiping initial line.")


# ==============================================================================
# EXAMPLE 5: Write a List of Strings using writelines()
# ==============================================================================
def example_5_writelines_list():
    """Writing a pre-formatted Python list of lines at once."""
    batch_students = [
        "1. Mamata - Python Masterclass\n",
        "2. Debangshu - Data Science\n",
        "3. Susmita - Web Development\n",
        "4. Abhronila - Machine Learning\n"
    ]
    with open("example5_roster.txt", "w", encoding="utf-8") as f:
        f.writelines(batch_students)
    print("[Ex 5] List written with writelines().")


# ==============================================================================
# EXAMPLE 6: Writing a Multiline Docstring / Paragraph in One Call
# ==============================================================================
def example_6_multiline_docstring():
    """Writing a multiline block of text directly with triple quotes."""
    notice = """--------------------------------------------------
CODER & ACCOTAX NOTICE BOARD (BARRACKPORE)
Topic: Python File Handling Examination
Date: Saturday, 10:00 AM
Venue: Lab 1 & Lab 2
--------------------------------------------------
"""
    with open("example6_notice.txt", "w", encoding="utf-8") as f:
        f.write(notice)
    print("[Ex 6] Multiline notice written in a single f.write() call.")


# ==============================================================================
# EXAMPLE 7: Capturing Return Value of write() (Character Count)
# ==============================================================================
def example_7_character_count_return():
    """write() returns the exact integer count of characters written."""
    with open("example7_char_count.txt", "w", encoding="utf-8") as f:
        count1 = f.write("Coder & AccoTax\n")
        count2 = f.write("Barrackpore Hub\n")
        total = count1 + count2
        print(f"[Ex 7] Line 1 chars: {count1} | Line 2 chars: {count2} | Total: {total}")


# ==============================================================================
# EXAMPLE 8: Writing User Input Directly to a File
# ==============================================================================
def example_8_user_input_mock():
    """Simulating interactive user input writing to a personal diary."""
    user_note = "Today we mastered file modes 'w', 'a', and 'x' in Python class."
    author = "Susmita"

    with open("example8_my_diary.txt", "w", encoding="utf-8") as f:
        f.write(f"Author: {author}\n")
        f.write(f"Entry: {user_note}\n")
    print("[Ex 8] Student diary entry saved.")


# ==============================================================================
# EXAMPLE 9: Using print() with file= Parameter
# ==============================================================================
def example_9_print_to_file():
    """Using Python's print() function directly to write into a file."""
    with open("example9_print_output.txt", "w", encoding="utf-8") as f:
        # print() automatically handles string conversion and adds '\n'
        print("Student ID", "Name", "Center", sep=" | ", file=f)
        print("101", "Mamata", "Barrackpore", sep=" | ", file=f)
        print("102", "Debangshu", "Jadavpur", sep=" | ", file=f)
    print("[Ex 9] File written using print(..., file=f).")


# ==============================================================================
# EXAMPLE 10: Generating a Clean Tabular Report Card
# ==============================================================================
def example_10_tabular_report_card():
    """Writing structured columnar tabular text using string formatting."""
    marks_data = [
        {"name": "Mamata", "theory": 95, "practical": 98},
        {"name": "Debangshu", "theory": 92, "practical": 94},
        {"name": "Susmita", "theory": 88, "practical": 96}
    ]

    with open("example10_report_card.txt", "w", encoding="utf-8") as f:
        f.write("=" * 45 + "\n")
        f.write(f"{'STUDENT PERFORMANCE REPORT':^45}\n")
        f.write("=" * 45 + "\n")
        f.write(f"{'Name':<12} {'Theory':>8} {'Practical':>10} {'Total':>8}\n")
        f.write("-" * 45 + "\n")

        for item in marks_data:
            total = item["theory"] + item["practical"]
            f.write(f"{item['name']:<12} {item['theory']:>8} {item['practical']:>10} {total:>8}\n")

        f.write("=" * 45 + "\n")
    print("[Ex 10] Formatted tabular report card generated.")


if __name__ == "__main__":
    print("Executing all 10 simple file writing examples...\n")
    example_1_single_line()
    example_2_multiple_lines()
    example_3_numbers_and_fstrings()
    example_4_append_mode()
    example_5_writelines_list()
    example_6_multiline_docstring()
    example_7_character_count_return()
    example_8_user_input_mock()
    example_9_print_to_file()
    example_10_tabular_report_card()
    print("\nAll 10 examples completed successfully!")
