# functional_realworld.py
# 1. Extract and clean data
raw_data = ["  apple ", "BANANA", "  CHERRY  ", "date"]
cleaned = list(map(lambda s: s.strip().lower(), raw_data))
print(cleaned)

# 2. Filter valid email addresses (simple check)
emails = ["a@b.com", "invalid", "c@d.com", "no-at"]
valid = list(filter(lambda e: '@' in e, emails))
print(valid)

# 3. Convert list of dicts to list of values
students = [{"name": "Swadeep", "age": 17}, {"name": "Tuhina", "age": 16}]
names = list(map(lambda s: s["name"], students))
print(names)

# 4. Use with range
squares_of_first_10 = list(map(lambda x: x**2, range(1, 11)))
print(squares_of_first_10)