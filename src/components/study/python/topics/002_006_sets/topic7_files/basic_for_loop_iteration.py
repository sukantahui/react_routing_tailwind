# ====================================================================
# Topic 7: Iterating Through Sets
# File: basic_for_loop_iteration.py
# Description: Demonstrating set iteration protocols and for-loop traversal
# ====================================================================

# Set of active training locations in West Bengal
active_locations = {"Barrackpore", "Kolkata", "Ichapur", "Jadavpur"}

print("--- Standard For-Loop Iteration ---")
for location in active_locations:
    print(f"Center Location: {location}")

# 2. Iteration protocol under the hood (__iter__ and __next__)
print("\n--- Manual Iterator Traversal ---")
iterator = iter(active_locations)
try:
    while True:
        item = next(iterator)
        print("Fetched via next():", item)
except StopIteration:
    print("Iterator exhausted cleanly (StopIteration raised).")

# 3. Sorted iteration without mutating the set
print("\n--- Alphabetically Sorted Iteration ---")
for location in sorted(active_locations):
    print(f"Sorted Center: {location}")
