# lambda_basic.py
# Basic lambda functions and usage

# Simple lambda assigned to a variable (not typical but educational)
square = lambda x: x ** 2
print(square(5))  # 25

# Lambda with multiple arguments
add = lambda a, b: a + b
print(add(3, 7))  # 10

# Lambda with a conditional expression
max_val = lambda a, b: a if a > b else b
print(max_val(10, 20))  # 20

# Lambda without assignment – used immediately
print((lambda x, y: x * y)(4, 5))  # 20

# Lambda returning a string
greet = lambda name: f"Hello, {name}!"
print(greet("Swadeep"))

# Lambda can be used with default arguments
increment = lambda x, step=1: x + step
print(increment(10))      # 11
print(increment(10, 3))   # 13