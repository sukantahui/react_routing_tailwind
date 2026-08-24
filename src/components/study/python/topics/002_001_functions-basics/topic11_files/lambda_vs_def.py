# lambda_vs_def.py
# Comparing lambda with regular def functions

# Regular function
def multiply_def(x, y):
    return x * y

# Lambda equivalent
multiply_lambda = lambda x, y: x * y

print(multiply_def(4, 5))   # 20
print(multiply_lambda(4, 5))# 20

# When lambda is not enough – need statements
def safe_divide_def(a, b):
    if b == 0:
        return None
    return a / b

# Lambda with conditional expression (works but less readable)
safe_divide_lambda = lambda a, b: None if b == 0 else a / b

print(safe_divide_def(10, 2))   # 5.0
print(safe_divide_lambda(10, 0)) # None

# Multiple statements – impossible in lambda
def log_and_return_def(x):
    print(f"Processing {x}")
    return x * 2

# Can't do this in a lambda (print is expression, but return? no)
log_lambda = lambda x: (print(f"Processing {x}"), x * 2)[1]  # hacky, not recommended
print(log_lambda(5))

# Recommendation: use def when:
# - You need multiple lines
# - You need statements (if, while, for, return)
# - The function is reused often
# - You need a docstring