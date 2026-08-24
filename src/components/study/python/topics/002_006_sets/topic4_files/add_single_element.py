# ====================================================================
# Topic 4: Adding Elements (add vs update)
# File: add_single_element.py
# Description: Demonstrating set.add() for single-item in-place mutation
# ====================================================================

# 1. Starting with an empty set or existing set
student_skills = {"Python", "Git"}
print("Initial Skills Set:", student_skills)

# 2. Adding a single string element using .add()
student_skills.add("TailwindCSS")
print("\nAfter student_skills.add('TailwindCSS'):", student_skills)

# 3. Adding another single element
student_skills.add("FastAPI")
print("After student_skills.add('FastAPI'):", student_skills)

# 4. Adding a duplicate element (ignored silently without error)
student_skills.add("Python")
print("After student_skills.add('Python') (Duplicate):", student_skills)
print("Length remains unchanged:", len(student_skills))

# 5. Adding a composite immutable element (Tuple)
student_skills.add(("SQL", "PostgreSQL"))
print("\nAfter adding tuple ('SQL', 'PostgreSQL'):", student_skills)

# 6. Returns None (In-place mutation)
result = student_skills.add("Docker")
print("Return value of set.add():", result)  # Output: None
