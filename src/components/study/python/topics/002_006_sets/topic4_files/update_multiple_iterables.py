# ====================================================================
# Topic 4: Adding Elements (add vs update)
# File: update_multiple_iterables.py
# Description: Demonstrating set.update() for bulk multiple-iterable ingestion
# ====================================================================

# Base set of active coaching centers in West Bengal
active_centers = {"Barrackpore", "Kolkata"}
print("Initial Active Centers:", active_centers)

# 1. Bulk addition from a List
new_districts = ["Ichapur", "Jadavpur", "Barrackpore"]
active_centers.update(new_districts)
print("\nAfter updating with list:", active_centers)

# 2. Bulk addition from a Tuple and a Range simultaneously!
# update() can accept multiple iterable arguments at once
active_centers.update(("Shyamnagar", "Kalyani"), [700120, 700032])
print("\nAfter multi-argument update():", active_centers)

# 3. Bulk addition from a String (unpacks into individual characters)
code_chars = set()
code_chars.update("PYTHON")
print("\nCharacters set from 'PYTHON':", code_chars)

# 4. Bulk addition from Dictionary keys
course_map = {"Accounting": 3500, "Taxation": 4500}
active_centers.update(course_map)  # Extracts keys
print("\nAfter updating with dictionary keys:", active_centers)
