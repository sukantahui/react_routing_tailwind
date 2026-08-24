# ====================================================================
# Topic 13: Frozen Sets (Immutable Sets)
# File: frozenset_basics.py
# Description: Demonstrating frozenset creation, immutability, and hashability
# ====================================================================

# 1. Creating a frozenset from an iterable
immutable_cities = frozenset(["Barrackpore", "Kolkata", "Ichapur", "Jadavpur"])
print("Frozen Set:", immutable_cities)
print("Type:", type(immutable_cities))
print("Length:", len(immutable_cities))

# 2. Immutability: Mutating methods (.add, .remove, .pop, .clear) do NOT exist!
try:
    immutable_cities.add("Shyamnagar")  # AttributeError!
except AttributeError as error:
    print("\n[AttributeError on .add()]:", error)

# 3. Hashability: frozensets HAVE a fixed __hash__() value!
print(f"\nHash Value of frozenset: {hash(immutable_cities)}")
print("Because frozenset is hashable, it can be used as a Dictionary Key or Set Element!")

# 4. Mathematical Operations still work!
other_cities = frozenset(["Kolkata", "Salt Lake", "New Town"])
print("\nUnion with another frozenset:", immutable_cities | other_cities)
print("Intersection with another frozenset:", immutable_cities & other_cities)
