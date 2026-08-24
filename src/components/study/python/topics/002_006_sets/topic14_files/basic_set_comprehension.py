# ====================================================================
# Topic 14: Set Comprehension
# File: basic_set_comprehension.py
# Description: Demonstrating set comprehension syntax and automatic deduplication
# ====================================================================

# 1. Mathematical Set Comprehension: Squares of numbers
numbers = [-3, -2, -1, 0, 1, 2, 3]
squares_set = {x**2 for x in numbers}

print("Original Numbers:", numbers)
print("Set Comprehension {x**2 for x in numbers}:", squares_set)
print("Notice how (-3)**2 and (3)**2 collapse to a single 9!\n")

# 2. Transforming string items: Normalizing uppercase city names
raw_cities = ["barrackpore", "KOLKATA", "ichapur", "Barrackpore", "kolkata"]
normalized_cities = {city.strip().capitalize() for city in raw_cities}

print("Raw Input Cities:", raw_cities)
print("Clean Normalized Cities Set:", normalized_cities)

# 3. Comparing with verbose traditional for-loop
traditional_set = set()
for city in raw_cities:
    traditional_set.add(city.strip().capitalize())

print("Traditional For-Loop Match:", traditional_set == normalized_cities)
