# ====================================================================
# Topic 1: Creating Sets (Set Literal vs Constructor)
# File: create_literal_demo.py
# Description: Demonstrating set literal syntax and heterogeneous elements
# ====================================================================

# 1. Creating sets with set literal curly braces {}
prime_numbers = {2, 3, 5, 7, 11, 13, 17, 19}
print("Prime Numbers Set:", prime_numbers)
print("Type:", type(prime_numbers))

# 2. String literal sets
student_names = {"Mamata", "Susmita", "Debangshu", "Abhronila"}
print("\nStudent Names:", student_names)

# 3. Heterogeneous immutable types inside set literal
center_info = {"Barrackpore", 700120, True, 4.95, ("Center", 1)}
print("\nCenter Details (Heterogeneous):", center_info)

# 4. Trailing commas & single element set literals
single_item_set = {"Python-3.13"}
print("\nSingle Element Set:", single_item_set)
print("Length:", len(single_item_set))
