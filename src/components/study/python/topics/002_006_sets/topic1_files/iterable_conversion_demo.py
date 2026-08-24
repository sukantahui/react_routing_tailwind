# ====================================================================
# Topic 1: Creating Sets (Set Literal vs Constructor)
# File: iterable_conversion_demo.py
# Description: Advanced conversions from Dictionaries, Bytes & Generators
# ====================================================================

# 1. Converting Dictionary (Keys, Values, Items)
course_fees = {
    "Python Pro": 4500,
    "Data Science": 6500,
    "Web Dev": 4500,
    "Tally Prime": 3500
}

# set(dict) takes KEYS by default
key_set = set(course_fees)
print("Unique Course Names (Keys):", key_set)

# set(dict.values()) takes VALUES
unique_fee_tiers = set(course_fees.values())
print("Unique Fee Tiers in ₹ (Values):", unique_fee_tiers)

# set(dict.items()) takes (KEY, VALUE) tuples
entry_set = set(course_fees.items())
print("Dictionary Key-Value Pair Tuples Set:", entry_set)

# 2. From Generator Expressions
squares_set = set(x**2 for x in range(-5, 6))
print("\nUnique Squares of (-5 to 5):", squares_set)

# 3. From Byte Strings
raw_bytes = b"ABRACADABRA"
unique_byte_values = set(raw_bytes)
print("\nUnique ASCII byte values in 'ABRACADABRA':", unique_byte_values)
