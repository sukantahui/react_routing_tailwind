# ====================================================================
# Topic 1: Creating Sets (Set Literal vs Constructor)
# File: create_constructor_demo.py
# Description: Demonstrating set() constructor across various data iterables
# ====================================================================

# 1. From a List with duplicate admission numbers
raw_admissions = [101, 102, 105, 101, 103, 102, 108, 105]
unique_admissions = set(raw_admissions)
print("Unique Admissions:", unique_admissions)

# 2. From a String (extracts distinct characters)
city_text = "Barrackpore, Kolkata"
unique_characters = set(city_text)
print("\nDistinct characters count in text:", len(unique_characters))
print("Distinct characters:", unique_characters)

# 3. From a Tuple
exam_centers = ("Barrackpore", "Ichapur", "Jadavpur", "Barrackpore")
center_set = set(exam_centers)
print("\nUnique Exam Centers:", center_set)

# 4. From a Range Generator
odd_numbers = set(range(1, 20, 2))
print("\nOdd Numbers (1 to 19):", odd_numbers)
