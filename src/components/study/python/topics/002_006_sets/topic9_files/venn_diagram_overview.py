# ====================================================================
# Topic 9: Mathematical Set Operations Overview
# File: venn_diagram_overview.py
# Description: Demonstrating the 4 core mathematical set operations
# ====================================================================

# Set A: Students enrolled in Python Pro course in Barrackpore
set_a = {"Susmita", "Debangshu", "Mamata", "Abhronila"}

# Set B: Students enrolled in Machine Learning course in Kolkata
set_b = {"Mamata", "Abhronila", "Rohan", "Pooja"}

print("Set A (Python Pro):", set_a)
print("Set B (Machine Learning):", set_b)

# 1. UNION (A | B) -> All unique students in either course
union_res = set_a | set_b
print("\n1. UNION (A | B):", union_res)

# 2. INTERSECTION (A & B) -> Students taking BOTH courses
intersection_res = set_a & set_b
print("2. INTERSECTION (A & B):", intersection_res)

# 3. DIFFERENCE (A - B) -> Students taking ONLY Python Pro
difference_res = set_a - set_b
print("3. DIFFERENCE (A - B):", difference_res)

# 4. SYMMETRIC DIFFERENCE (A ^ B) -> Students taking EXACTLY ONE course
sym_diff_res = set_a ^ set_b
print("4. SYMMETRIC DIFFERENCE (A ^ B):", sym_diff_res)
