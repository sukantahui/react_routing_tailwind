# ====================================================================
# Topic 11: Symmetric Difference Deep Dive
# File: symmetric_difference_basics.py
# Description: Demonstrating set.symmetric_difference() and '^' operator
# ====================================================================

# Batch A: Students attending Morning Class in Barrackpore
morning_batch = {"Susmita", "Debangshu", "Mamata", "Abhronila"}

# Batch B: Students attending Evening Class in Barrackpore
evening_batch = {"Mamata", "Abhronila", "Rohan", "Pooja"}

print("Morning Batch:", morning_batch)
print("Evening Batch:", evening_batch)

# 1. Non-mutating Symmetric Difference using '^' operator
# Retains students who attend ONLY Morning OR ONLY Evening (NOT both)
exclusive_students = morning_batch ^ evening_batch
print("\n1. Exclusive Single-Session Students (A ^ B):", exclusive_students)

# 2. Mathematical equivalence: (A | B) - (A & B)
math_equivalent = (morning_batch | evening_batch) - (morning_batch & evening_batch)
print("2. Math Verification ((A | B) - (A & B)):", math_equivalent)
print("Are they identical? ->", exclusive_students == math_equivalent)

# 3. Commutative Property: A ^ B == B ^ A
print("3. Commutative Check (A ^ B == B ^ A):", morning_batch ^ evening_batch == evening_batch ^ morning_batch)

# 4. Method Syntax with List argument: .symmetric_difference()
guest_candidates = ["Susmita", "Tanmay", "Bikram"]
method_result = morning_batch.symmetric_difference(guest_candidates)
print("\n4. Method Syntax .symmetric_difference(list):", method_result)
