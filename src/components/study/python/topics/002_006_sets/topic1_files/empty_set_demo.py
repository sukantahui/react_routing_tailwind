# ====================================================================
# Topic 1: Creating Sets (Set Literal vs Constructor)
# File: empty_set_demo.py
# Description: Demonstrating why {} is a Dictionary and set() is a Set
# ====================================================================

# 1. The Common Gotcha
ambiguous_var = {}
print("Variable with {}:", ambiguous_var)
print("Type of {}:", type(ambiguous_var))  # <class 'dict'>
print("Is {} an instance of dict?", isinstance(ambiguous_var, dict))  # True
print("Is {} an instance of set?", isinstance(ambiguous_var, set))    # False

# 2. Correct Way: The set() constructor
proper_empty_set = set()
print("\nVariable with set():", proper_empty_set)
print("Type of set():", type(proper_empty_set))  # <class 'set'>
print("Length of set():", len(proper_empty_set))  # 0

# 3. Dynamic population
proper_empty_set.add("Python")
proper_empty_set.add("FastAPI")
proper_empty_set.add("Python")  # Duplicate ignored
print("\nPopulated Set:", proper_empty_set)
