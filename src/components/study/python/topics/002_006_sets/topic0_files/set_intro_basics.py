# ====================================================================
# Topic 0: Introduction to Sets in Python
# File: set_intro_basics.py
# Description: Demonstrating fundamental set creation, uniqueness & types
# ====================================================================

# 1. Creating a set with literals
student_ids = {101, 102, 103, 104, 105}
print("Student ID Set:", student_ids)
print("Type of student_ids:", type(student_ids))
print("Total unique students:", len(student_ids))

# 2. Sets automatically eliminate duplicate values
batch_attendance = {"Mamata", "Susmita", "Debangshu", "Mamata", "Susmita", "Abhronila"}
print("\nAttendance with duplicates entered:", batch_attendance)
print("Unique attendees count:", len(batch_attendance))

# 3. Heterogeneous elements in a set (must be hashable/immutable)
mixed_set = {"Kolkata", 700120, 98.5, True, ("Batch", "A")}
print("\nMixed-type Set:", mixed_set)

# 4. Checking membership (O(1) average time complexity)
search_city = "Kolkata"
if search_city in mixed_set:
    print(f"'{search_city}' is present in the set!")
