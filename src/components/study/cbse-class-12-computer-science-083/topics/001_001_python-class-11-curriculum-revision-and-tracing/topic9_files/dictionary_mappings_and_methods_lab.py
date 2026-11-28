# =====================================================================
# CBSE Class 12 Computer Science (083) - Revision Lab
# Topic 9: Dictionary Key-Value Mappings: Accessing, Updating, Methods
# =====================================================================

# 1. Dictionary Creation & Key Constraints
# Keys MUST be immutable/hashable (str, int, float, tuple). Values can be any type.
student = {
    "roll": 101,
    "name": "Ananya Sharma",
    "subjects": ["CS", "Math", "Physics"],
    "marks": {"theory": 68, "practical": 29}
}

print("Original Dictionary:", student)
print(f"Direct lookup student['name']: {student['name']}")

# 2. Safe Retrieval with .get()
# student['grade'] -> Raises KeyError!
grade = student.get("grade", "Not Assigned")
print(f"Safe lookup student.get('grade'): {grade}")

# 3. Adding, Updating, and Traversing
student["school"] = "DPS Barrackpore"      # New key-value insertion
student["roll"] = 102                      # Updating existing key
print("\n--- Traversing Keys, Values & Items ---")
for key, val in student.items():
    print(f"  {key} => {val}")

# 4. Dictionary Frequency Counter Algorithm
text = "cbse class xii computer science exam"
freq = {}
for char in text:
    if char != " ":
        freq[char] = freq.get(char, 0) + 1

print("\nCharacter Frequencies:", freq)

# 5. Removal Methods: pop(), popitem(), clear()
popped_school = student.pop("school")
print(f"\nPopped 'school': {popped_school}")
popped_last = student.popitem()  # Removes and returns last inserted (key, value) pair
print(f"Popped last item: {popped_last}")
