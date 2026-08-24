# ====================================================================
# Topic 14: Set Comprehension
# File: nested_loops_comprehension.py
# Description: Multi-loop nested set comprehensions and cartesian products
# ====================================================================

# 1. Flattening a matrix of nested course categories
center_courses = [
    ["Python", "FastAPI", "PostgreSQL"],
    ["React", "Tailwind", "Python"],       # Note duplicate "Python"
    ["Machine Learning", "Data Science", "Python"]
]

all_distinct_courses = {course for category in center_courses for course in category}
print("Flattened Distinct Courses Set:", all_distinct_courses)

# 2. Cartesian Product pairs: Pairing teachers with subjects
teachers = ["Sukanta Hui", "Mamata Banerjee"]
subjects = ["Python Pro", "Financial Accounting"]

schedule_pairs = {(teacher, subject) for teacher in teachers for subject in subjects}

print("\n--- Teacher-Subject Schedule Pairs ---")
for t, s in sorted(schedule_pairs):
    print(f"Mentor: {t:20} -> Track: {s}")

# 3. Generating Pythagorean triplet hypotenuses under 25
hypotenuses = {c for a in range(1, 20) for b in range(a, 20) for c in range(b, 25) if a**2 + b**2 == c**2}
print("\nValid Distinct Hypotenuses (< 25):", hypotenuses)
