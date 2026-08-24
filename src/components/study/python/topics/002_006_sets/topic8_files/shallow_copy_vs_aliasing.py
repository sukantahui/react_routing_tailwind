# ====================================================================
# Topic 8: Set Length and Basic Operations
# File: shallow_copy_vs_aliasing.py
# Description: Demonstrating set aliasing (=) vs shallow copy (.copy() / set())
# ====================================================================

# Original center list
original_centers = {"Barrackpore", "Kolkata"}
print("Original Centers (Initial):", original_centers)

# 1. ALIASING (Assignment '=' copies only the pointer/reference)
alias_centers = original_centers
alias_centers.add("Ichapur")

print("\n--- After Mutating Alias ---")
print("alias_centers:", alias_centers)
print("original_centers (Accidentally Mutated!):", original_centers)
print("Are they the exact same object? ->", alias_centers is original_centers)

# 2. SHALLOW COPY (Creates an independent set object)
original_centers = {"Barrackpore", "Kolkata"}
cloned_centers = original_centers.copy()
cloned_centers.add("Jadavpur")

print("\n--- After Mutating Shallow Copy ---")
print("cloned_centers:", cloned_centers)
print("original_centers (Safe and Untouched!):", original_centers)
print("Are they different objects? ->", cloned_centers is not original_centers)
