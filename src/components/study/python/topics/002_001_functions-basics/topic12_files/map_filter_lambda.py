# map_filter_lambda.py
numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

# Chain: filter even then square
result = list(map(lambda x: x**2, filter(lambda x: x % 2 == 0, numbers)))
print(f"Even numbers squared: {result}")

# Chain: square then filter > 20
result2 = list(filter(lambda x: x > 20, map(lambda x: x**2, numbers)))
print(f"Squares > 20: {result2}")

# Using list comprehensions (more Pythonic)
result3 = [x**2 for x in numbers if x % 2 == 0]
print(f"Same result with comprehension: {result3}")