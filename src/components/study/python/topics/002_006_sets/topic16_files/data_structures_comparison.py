# ====================================================================
# Topic 16: Sets vs Lists vs Tuples
# File: data_structures_comparison.py
# Description: Feature-by-feature side-by-side comparison of core containers
# ====================================================================

# 1. LIST: Mutable, Ordered, Allows Duplicates, Indexable
student_list = ["Susmita", "Debangshu", "Susmita", "Mamata"]
student_list.append("Abhronila")
student_list[0] = "Susmita Roy"
print("1. LIST:", student_list)
print("   Index 0:", student_list[0])
print("   Allows Duplicates?", len(student_list) != len(set(student_list)))

# 2. TUPLE: Immutable, Ordered, Allows Duplicates, Indexable, Hashable
student_tuple = ("Susmita", "Debangshu", "Susmita", "Mamata")
print("\n2. TUPLE:", student_tuple)
print("   Index 1:", student_tuple[1])
print("   Hashable?", isinstance(hash(student_tuple), int))

# 3. SET: Mutable, Unordered, NO Duplicates, NOT Indexable, Set Algebra
student_set = {"Susmita", "Debangshu", "Susmita", "Mamata"}
student_set.add("Abhronila")
print("\n3. SET:", student_set)
print("   Duplicates Collapsed?", len(student_set) == 3)
print("   Membership Test ('Mamata' in student_set):", "Mamata" in student_set)
