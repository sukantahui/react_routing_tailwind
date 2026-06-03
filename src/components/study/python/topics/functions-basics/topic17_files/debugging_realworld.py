# debugging_realworld.py
# Real-world debugging scenarios

# Scenario 1: Off-by-one error in function
def sum_of_squares(n):
    """Return sum of squares from 1 to n (inclusive)."""
    total = 0
    for i in range(n):  # Bug: range(n) gives 0..n-1
        total += i * i
    return total

print(f"Sum of squares 1..5 (should be 55): {sum_of_squares(5)}")  # 30, not 55

# Fixed version:
def sum_of_squares_fixed(n):
    total = 0
    for i in range(1, n + 1):
        total += i * i
    return total

print(f"Fixed: {sum_of_squares_fixed(5)}")  # 55

# Scenario 2: Mutable default argument bug
def add_item(item, basket=[]):
    basket.append(item)
    return basket

print(add_item("apple"))   # ['apple']
print(add_item("banana"))  # ['apple', 'banana'] – unexpected!

# Fixed version:
def add_item_fixed(item, basket=None):
    if basket is None:
        basket = []
    basket.append(item)
    return basket

print(add_item_fixed("apple"))   # ['apple']
print(add_item_fixed("banana"))  # ['banana']

# Scenario 3: Using `input()` returns string, not int
def get_double():
    num = input("Enter a number: ")
    return num * 2  # string repetition, not multiplication

# print(get_double())  # Enter 5 → "55"

# Fixed:
def get_double_fixed():
    num = int(input("Enter a number: "))
    return num * 2

# Scenario 4: Missing return statement
def get_greeting(name):
    print(f"Hello, {name}")  # No return

result = get_greeting("Swadeep")
print(result)  # None – likely not intended

print("\nDebugging strategies used:")
print("- Print intermediate values")
print("- Check edge cases (empty lists)")
print("- Understand default argument behavior")
print("- Verify return values")