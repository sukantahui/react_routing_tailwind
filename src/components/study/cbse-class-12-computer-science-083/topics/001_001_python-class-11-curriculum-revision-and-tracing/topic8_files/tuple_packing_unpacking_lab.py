# =====================================================================
# CBSE Class 12 Computer Science (083) - Revision Lab
# Topic 8: Tuple Immutability, Tuple Packing & Unpacking, and Operations
# =====================================================================

# 1. Singleton Tuple Creation Traps
t_int = (100)       # Evaluates as integer int, NOT a tuple!
t_tuple = (100,)    # Trailing comma creates a 1-element tuple
print(f"type((100)): {type(t_int)}")
print(f"type((100,)): {type(t_tuple)}")

# 2. Tuple Packing and Unpacking
packed = 10, "Aarav", 95.5, "A1"
print(f"\nPacked tuple: {packed}, Type: {type(packed)}")

# Unpacking into individual variables
roll, name, score, grade = packed
print(f"Unpacked -> Roll: {roll}, Name: {name}, Score: {score}, Grade: {grade}")

# Unpacking with asterisk (*) operator
t_extended = (1, 2, 3, 4, 5, 6)
first, *middle, last = t_extended
print(f"first: {first}, middle (list): {middle}, last: {last}")

# 3. Tuple Immutability vs Mutable Elements
immutable_tup = (10, 20, [30, 40])
print(f"\nInitial tuple: {immutable_tup}")
# immutable_tup[0] = 99 -> TypeError: 'tuple' object does not support item assignment
immutable_tup[2].append(50)  # Legal! Mutates inner list in-place
print(f"Tuple with mutated inner list: {immutable_tup}")

# 4. Tuple Operations: count() and index()
sample_tup = (10, 20, 30, 20, 40, 20)
print(f"sample_tup.count(20): {sample_tup.count(20)}")
print(f"sample_tup.index(30): {sample_tup.index(30)}")
# sample_tup.index(999) -> Raises ValueError!
