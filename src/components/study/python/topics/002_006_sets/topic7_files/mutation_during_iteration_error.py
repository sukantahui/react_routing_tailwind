# ====================================================================
# Topic 7: Iterating Through Sets
# File: mutation_during_iteration_error.py
# Description: Demonstrating RuntimeError on set mutation during iteration & proper fixes
# ====================================================================

# 1. THE CATASTROPHIC BUG: Mutating set while iterating over it
numbers = {1, 2, 3, 4, 5, 6}
print("Original Numbers:", numbers)

try:
    for num in numbers:
        if num % 2 == 0:
            numbers.remove(num)  # Modifies hash bucket table during active loop!
except RuntimeError as error:
    print("\n[RuntimeError Trapped]:", error)
    print("Reason: Modifying set size invalidates internal bucket offsets!")

# 2. PROPER FIX 1: Iterating over a shallow copy
numbers_fix1 = {1, 2, 3, 4, 5, 6}
for num in numbers_fix1.copy():  # or list(numbers_fix1)
    if num % 2 == 0:
        numbers_fix1.remove(num)
print("\nFix 1 (Loop over copy) -> Odd Numbers:", numbers_fix1)

# 3. PROPER FIX 2: Using a clean Set Comprehension
numbers_fix2 = {1, 2, 3, 4, 5, 6}
numbers_fix2 = {num for num in numbers_fix2 if num % 2 != 0}
print("Fix 2 (Set Comprehension) -> Odd Numbers:", numbers_fix2)
