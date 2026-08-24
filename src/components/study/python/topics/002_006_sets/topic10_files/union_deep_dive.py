# ====================================================================
# Topic 10: Union, Intersection, Difference Deep Dive
# File: union_deep_dive.py
# Description: In-depth exploration of set.union() and '|' operator
# ====================================================================

# Enrolled batches in Barrackpore and Kolkata centers
barrackpore_students = {"Susmita", "Debangshu", "Mamata"}
kolkata_students     = {"Mamata", "Abhronila", "Rohan"}
online_students      = {"Pooja", "Debangshu", "Bikram"}

# 1. Non-mutating Union using '|' operator
all_in_person = barrackpore_students | kolkata_students
print("All In-Person Students (A | B):", all_in_person)

# 2. Multi-set Union with operator chaining
all_batches = barrackpore_students | kolkata_students | online_students
print("All Batches Combined (A | B | C):", all_batches)

# 3. Union method with mixed iterables (Tuple + List)
guest_list = ["Sneha", "Tanmay"]
vip_tuple = ("Arjun",)
expanded_cohort = barrackpore_students.union(guest_list, vip_tuple)
print("\nExpanded Cohort via .union(*iterables):", expanded_cohort)

# 4. In-Place Union using '|=' operator (mutates barrackpore_students)
barrackpore_students |= {"New_Student_Ichapur"}
print("After In-Place Union (|=):", barrackpore_students)
