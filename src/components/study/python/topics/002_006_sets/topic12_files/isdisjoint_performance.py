# ====================================================================
# Topic 12: Set Comparison: Subset, Superset, Disjoint Sets
# File: isdisjoint_performance.py
# Description: Demonstrating set.isdisjoint() and short-circuit optimization
# ====================================================================

# Active shifts in Barrackpore coaching institute
morning_shift_staff = {"Susmita", "Mamata", "Debangshu"}
night_shift_staff   = {"Tanmay", "Bikram", "Rohan"}
mixed_shift_staff   = {"Susmita", "Rohan"}

# 1. isdisjoint() returns True if two sets share ZERO common elements
print("Are Morning and Night shifts disjoint? ->", morning_shift_staff.isdisjoint(night_shift_staff))  # True
print("Are Morning and Mixed shifts disjoint? ->", morning_shift_staff.isdisjoint(mixed_shift_staff))  # False ('Susmita' is shared)

# 2. Short-Circuiting Optimization
# isdisjoint() stops searching IMMEDIATELY upon finding the very first common element
# It is vastly faster than bool(set_a & set_b) because it does NOT construct an intermediate intersection set!

# 3. isdisjoint() with non-set iterables (List, Generator)
print("\nChecking against a list:", morning_shift_staff.isdisjoint(["Alice", "Bob"]))  # True
