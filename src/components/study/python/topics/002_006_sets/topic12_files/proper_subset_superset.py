# ====================================================================
# Topic 12: Set Comparison: Subset, Superset, Disjoint Sets
# File: proper_subset_superset.py
# Description: Demonstrating Strict / Proper Subset (<) and Proper Superset (>)
# ====================================================================

set_a = {1, 2}
set_b = {1, 2}
set_c = {1, 2, 3}

# 1. Standard Subset (<=) vs Proper Subset (<)
# Proper subset requires A to be a subset of B AND A != B (A is strictly smaller)
print("set_a <= set_b (Standard Subset):", set_a <= set_b)  # True (equal sets are subsets)
print("set_a <  set_b (Proper Subset):  ", set_a <  set_b)  # False (equal sets cannot be proper subsets)
print("set_a <  set_c (Proper Subset):  ", set_a <  set_c)  # True (set_a is strictly smaller)

# 2. Standard Superset (>=) vs Proper Superset (>)
print("\nset_c >= set_a (Standard Superset):", set_c >= set_a)  # True
print("set_c >  set_a (Proper Superset):  ", set_c >  set_a)  # True (set_c has extra elements)
print("set_b >  set_a (Proper Superset):  ", set_b >  set_a)  # False (identical size)

# 3. There are NO named methods for strict proper subsets!
# You MUST use the '<' and '>' operators for strict comparisons.
print("\nNote: Python provides issubset (<=) and issuperset (>=), but '<' and '>' are operator-only!")
