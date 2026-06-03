# runtime_errors.py
# Common runtime errors in functions

# 1. NameError – using undefined variable
def show():
    print(undefined_var)  # NameError

# Uncomment to see error:
# show()

# 2. TypeError – wrong argument type
def add(a, b):
    return a + b
# add(5, "10")  # TypeError: unsupported operand type

# 3. UnboundLocalError – local variable referenced before assignment
count = 0
def increment_bad():
    count += 1  # UnboundLocalError: local 'count' referenced before assignment

# 4. RecursionError – infinite recursion
def infinite():
    return infinite()  # RecursionError

# 5. AttributeError – calling method on None
def get_data():
    return None
# result = get_data()
# result.append(5)  # AttributeError: 'NoneType' object has no attribute 'append'

print("Runtime errors occur during execution.")