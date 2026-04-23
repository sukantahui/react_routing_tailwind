# return_single.py
# Functions that return a single value

def add(a, b):
    """Returns the sum of two numbers."""
    return a + b

def is_even(number):
    """Returns True if number is even, False otherwise."""
    return number % 2 == 0

def get_greeting(name):
    """Returns a personalized greeting string."""
    return f"Hello, {name}!"

# Using the returned values
sum_result = add(10, 5)
print(f"Sum: {sum_result}")  # 15

print(f"Is 7 even? {is_even(7)}")   # False
print(f"Is 8 even? {is_even(8)}")   # True

message = get_greeting("Swadeep")
print(message)  # Hello, Swadeep!

# Returned value can be used directly in expressions
total = add(3, add(2, 1))   # nested call: add(2,1)=3, add(3,3)=6
print(total)  # 6