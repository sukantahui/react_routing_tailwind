# lambda_with_args.py
# Lambdas with multiple arguments and advanced patterns

# Multiple arguments
area = lambda length, width: length * width
print(area(5, 3))  # 15

# Variable arguments (*args)
sum_all = lambda *args: sum(args)
print(sum_all(1, 2, 3, 4))  # 10

# Keyword arguments (**kwargs) – works but rarely used
print_values = lambda **kwargs: [print(f"{k}={v}") for k, v in kwargs.items()]
print_values(name="Tuhina", age=16)

# Lambda returning a lambda (currying)
multiply_by = lambda factor: lambda x: x * factor
double = multiply_by(2)
triple = multiply_by(3)
print(double(5))   # 10
print(triple(5))   # 15

# Lambda with unpacking
pair = (3, 4)
add_pair = lambda p: p[0] + p[1]
print(add_pair(pair))  # 7

# Better: unpack in arguments
add_unpack = lambda x, y: x + y
print(add_unpack(*pair))  # 7