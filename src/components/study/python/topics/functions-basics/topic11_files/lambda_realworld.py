# lambda_realworld.py
# Real-world usage of lambdas

# 1. Sorting with custom keys
students = [
    {"name": "Swadeep", "age": 17},
    {"name": "Tuhina", "age": 16},
    {"name": "Abhronila", "age": 15},
    {"name": "Debangshu", "age": 17}
]

# Sort by age (ascending)
sorted_by_age = sorted(students, key=lambda s: s["age"])
print("Sorted by age:", sorted_by_age)

# Sort by name (descending)
sorted_by_name = sorted(students, key=lambda s: s["name"], reverse=True)
print("Sorted by name desc:", sorted_by_name)

# 2. Filtering with filter()
numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
evens = list(filter(lambda x: x % 2 == 0, numbers))
print("Even numbers:", evens)

# 3. Transforming with map()
celsius = [0, 10, 20, 30, 40]
fahrenheit = list(map(lambda c: (c * 9/5) + 32, celsius))
print("Fahrenheit:", fahrenheit)

# 4. Using with reduce (from functools)
from functools import reduce
product = reduce(lambda a, b: a * b, [1, 2, 3, 4])
print("Product of list:", product)  # 24

# 5. Using as key in max/min
richest = max(students, key=lambda s: s["age"])
print("Oldest student:", richest)

# 6. In GUI callbacks (conceptual)
# button = Button(text="Click", command=lambda: print("Clicked!"))

# 7. Lambda to create simple data transformations
names = ["swadeep", "tuhina", "abhronila"]
capitalized = list(map(lambda name: name.capitalize(), names))
print("Capitalized:", capitalized)