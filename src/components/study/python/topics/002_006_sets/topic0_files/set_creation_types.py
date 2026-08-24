# ====================================================================
# Topic 0: Introduction to Sets in Python
# File: set_creation_types.py
# Description: The Empty Set Trap ({ } vs set()) & Type Constructor Nuances
# ====================================================================

# 1. THE CRITICAL BEGINNER TRAP: Creating an empty set
empty_curly = {}
print("Type of {}:", type(empty_curly))  # Output: <class 'dict'> (NOT set!)

# Correct way to create an empty set
true_empty_set = set()
print("Type of set():", type(true_empty_set))  # Output: <class 'set'>
print("Length of true_empty_set:", len(true_empty_set))

# 2. Creating sets from various iterables
# From a string (breaks into unique characters)
char_set = set("Barrackpore")
print("\nUnique characters from 'Barrackpore':", char_set)

# From a tuple
branch_tuple = ("Kolkata", "Barrackpore", "Ichapur", "Jadavpur", "Kolkata")
branch_set = set(branch_tuple)
print("Branches Set:", branch_set)

# From a dictionary (extracts only the KEYS by default)
student_marks = {"Susmita": 92, "Debangshu": 88, "Mamata": 95}
student_name_set = set(student_marks)
print("Student Names Set (from Dict keys):", student_name_set)

# From a range
even_digit_set = set(range(0, 10, 2))
print("Even digits set:", even_digit_set)
