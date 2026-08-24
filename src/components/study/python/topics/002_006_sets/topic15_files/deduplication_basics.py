# ====================================================================
# Topic 15: Removing Duplicates Using Sets
# File: deduplication_basics.py
# Description: Standard list(set(data)) deduplication and timing complexity
# ====================================================================

# Raw student attendance log in Barrackpore Computer Science Center
raw_attendance_log = [
    "Susmita", "Mamata", "Debangshu", "Susmita",
    "Abhronila", "Mamata", "Rohan", "Debangshu", "Susmita"
]

print(f"Total Raw Attendance Scans: {len(raw_attendance_log)}")
print("Raw Stream:", raw_attendance_log)

# 1. Standard Deduplication using list(set(iterable)) in O(N) time
unique_students = list(set(raw_attendance_log))

print(f"\nUnique Attended Students ({len(unique_students)}):", unique_students)
print("Note: Fast O(N) completion, but original entry order is scrambled!")

# 2. Extracting unique characters from a string
messy_string = "mississippi_barrackpore_kolkata"
unique_characters = "".join(sorted(set(messy_string)))
print("\nUnique Sorted Characters:", unique_characters)
