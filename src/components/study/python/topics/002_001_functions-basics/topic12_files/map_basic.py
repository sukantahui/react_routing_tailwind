# map_basic.py
numbers = [1, 2, 3, 4, 5]

# Using lambda with map
squared = list(map(lambda x: x ** 2, numbers))
print(f"Squares: {squared}")

# Multiple iterables
list1 = [1, 2, 3]
list2 = [10, 20, 30]
sums = list(map(lambda a, b: a + b, list1, list2))
print(f"Sums: {sums}")

# String transformation
names = ["swadeep", "tuhina", "abhronila"]
capitalized = list(map(lambda s: s.capitalize(), names))
print(f"Capitalized: {capitalized}")