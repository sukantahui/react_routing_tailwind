# ====================================================================
# Topic 3: Unordered and Unindexed Collections
# File: unordered_demo.py
# Description: Demonstrating why sets do NOT maintain insertion order
# ====================================================================

# 1. Insertion order is NOT guaranteed
city_set = set()
city_set.add("Kolkata")
city_set.add("Barrackpore")
city_set.add("Ichapur")
city_set.add("Jadavpur")

print("Added Order: Kolkata -> Barrackpore -> Ichapur -> Jadavpur")
print("Set Iteration Output:", city_set)

# 2. Integer hashing quirk in CPython
# Small integers hash to themselves: hash(5) == 5
# This creates an illusion of ordering for small positive numbers, but it is NOT guaranteed!
number_set = {5, 1, 9, 3, 7, 2}
print("\nNumber Set {5, 1, 9, 3, 7, 2}:", number_set)

# 3. String hashing behavior (affected by randomized hash seeds)
char_set = {"Alpha", "Beta", "Gamma", "Delta", "Epsilon"}
print("\nString Set:", char_set)
