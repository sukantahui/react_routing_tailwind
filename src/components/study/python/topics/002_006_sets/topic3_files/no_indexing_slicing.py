# ====================================================================
# Topic 3: Unordered and Unindexed Collections
# File: no_indexing_slicing.py
# Description: Demonstrating TypeError on indexing/slicing & workaround strategies
# ====================================================================

programming_languages = {"Python", "JavaScript", "Rust", "Go", "TypeScript"}

# 1. Attempting index access (s[0]) raises TypeError
print("Current Set:", programming_languages)

try:
    first_lang = programming_languages[0]
except TypeError as error:
    print("\n[TypeError Caught]:", error)
    print("Reason: Sets have no index positions (0, 1, 2...) in memory!")

# 2. Attempting slicing (s[1:3]) raises TypeError
try:
    sub_languages = programming_languages[1:3]
except TypeError as error:
    print("\n[TypeError Caught]:", error)

# 3. Proper Workaround 1: Converting to a sorted list
sorted_list = sorted(programming_languages)
print("\nWorkaround 1 (Sorted List):", sorted_list)
print("First Element from sorted list:", sorted_list[0])

# 4. Proper Workaround 2: Extracting an arbitrary element with next(iter())
any_element = next(iter(programming_languages))
print("\nWorkaround 2 (Arbitrary next element):", any_element)
