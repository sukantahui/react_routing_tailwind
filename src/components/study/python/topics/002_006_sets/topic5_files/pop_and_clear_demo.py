# ====================================================================
# Topic 5: Removing Elements (remove, discard, pop, clear)
# File: pop_and_clear_demo.py
# Description: Demonstrating set.pop() arbitrary removal and set.clear()
# ====================================================================

cities = {"Kolkata", "Barrackpore", "Ichapur", "Jadavpur"}
print("Initial Cities Set:", cities)

# 1. set.pop() - Removes and returns an arbitrary element
popped_item_1 = cities.pop()
print(f"\n1st Popped Element: '{popped_item_1}'")
print("Remaining Set:", cities)

popped_item_2 = cities.pop()
print(f"2nd Popped Element: '{popped_item_2}'")
print("Remaining Set:", cities)

# 2. set.pop() on an empty set raises KeyError
empty_demo = set()
try:
    empty_demo.pop()
except KeyError as error:
    print("\n[KeyError with pop() on empty set]:", error)

# 3. set.clear() - Removes all elements in-place
cities.clear()
print("\nAfter cities.clear():", cities)
print("Type after clear():", type(cities))
print("Length after clear():", len(cities))
