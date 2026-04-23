# return_multiple.py
# Returning multiple values from a function

def get_min_max(numbers):
    """Returns the minimum and maximum of a list."""
    return min(numbers), max(numbers)   # returns a tuple

def divide_with_remainder(a, b):
    """Returns quotient and remainder as two values."""
    quotient = a // b
    remainder = a % b
    return quotient, remainder

def get_student_info():
    """Returns multiple details about a student."""
    name = "Tuhina"
    age = 16
    city = "Shyamnagar"
    return name, age, city

# Unpacking multiple return values
scores = [85, 92, 78, 90, 88]
lowest, highest = get_min_max(scores)
print(f"Lowest: {lowest}, Highest: {highest}")

q, r = divide_with_remainder(17, 5)
print(f"17 ÷ 5 = {q} remainder {r}")

# Assign to a single variable (gets a tuple)
result = get_student_info()
print(result)  # ('Tuhina', 16, 'Shyamnagar')
print(type(result))  # <class 'tuple'>

# Unpack into variables
name, age, city = get_student_info()
print(f"{name} is {age} years old from {city}")