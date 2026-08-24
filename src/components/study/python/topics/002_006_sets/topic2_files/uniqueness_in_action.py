# ====================================================================
# Topic 2: Unique Nature of Sets
# File: uniqueness_in_action.py
# Description: Demonstrating automatic duplicate pruning across various data types
# ====================================================================

# 1. Automatic duplicate removal with integers and floats
numbers = {10, 20, 30, 20, 10, 40, 50, 30}
print("Unique Integer Set:", numbers)
print("Original elements count: 8 -> Unique set count:", len(numbers))

# 2. Duplicate string handling
students = {"Susmita", "Mamata", "Debangshu", "Susmita", "Abhronila", "Mamata"}
print("\nUnique Student Names:", students)

# 3. Numeric equivalence: 1 vs 1.0 vs True
mixed_ones = {1, 1.0, True, 1 + 0j}
print("\nSet with {1, 1.0, True, 1 + 0j}:", mixed_ones)
print("Length:", len(mixed_ones))  # Exactly 1 because 1 == 1.0 == True and hash values match!

# 4. Zero equivalence: 0 vs 0.0 vs False
mixed_zeros = {0, 0.0, False}
print("\nSet with {0, 0.0, False}:", mixed_zeros)
print("Length:", len(mixed_zeros))  # Exactly 1
