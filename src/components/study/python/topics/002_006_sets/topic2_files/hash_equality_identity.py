# ====================================================================
# Topic 2: Unique Nature of Sets
# File: hash_equality_identity.py
# Description: The Two-Step Uniqueness Rule: hash(a) == hash(b) AND a == b
# ====================================================================

# Step 1: Hash equality
val1 = 42
val2 = 42.0

print(f"hash({val1}) = {hash(val1)}")
print(f"hash({val2}) = {hash(val2)}")
print(f"Are values equal (val1 == val2)? -> {val1 == val2}")
print(f"Are identities identical (val1 is val2)? -> {val1 is val2}")

# Result in set: Treated as the same element!
sample_set = {val1, val2}
print("Set containing both 42 and 42.0:", sample_set)
print("Length:", len(sample_set))

# Step 2: String case sensitivity
s1 = "Barrackpore"
s2 = "barrackpore"

print(f"\nhash('{s1}') = {hash(s1)}")
print(f"hash('{s2}') = {hash(s2)}")
print(f"Equality ('{s1}' == '{s2}') -> {s1 == s2}")

# Case-sensitive difference -> Both are retained!
city_set = {s1, s2}
print("City Set:", city_set)
print("Length:", len(city_set))
