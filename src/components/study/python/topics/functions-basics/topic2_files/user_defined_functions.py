# user_defined_functions.py
# Creating our own functions for specific tasks

# Function to greet a student
def greet(student_name):
    print(f"Hello, {student_name}! Welcome to class.")

# Function to calculate area of a rectangle
def calculate_area(length, width):
    area = length * width
    print(f"Area: {area} square units")
    return area

# Function to check if a number is even
def is_even(number):
    if number % 2 == 0:
        return True
    else:
        return False

# Using our user-defined functions
greet("Swadeep")
greet("Tuhina")

calculate_area(5, 3)

num = 7
if is_even(num):
    print(f"{num} is even")
else:
    print(f"{num} is odd")