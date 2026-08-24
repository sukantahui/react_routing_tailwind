# return_none.py
# Functions without return or with empty return

def no_return():
    """This function has no return statement."""
    x = 5
    y = 10
    z = x + y
    # No return → returns None

def empty_return():
    """This function uses 'return' without a value."""
    print("Doing some work...")
    return   # returns None
    print("This line never runs")

def explicit_none():
    """Explicitly returns None."""
    return None

# Call functions and see what they return
result1 = no_return()
result2 = empty_return()
result3 = explicit_none()

print(f"no_return() returns: {result1}")        # None
print(f"empty_return() returns: {result2}")     # None
print(f"explicit_none() returns: {result3}")    # None

# Checking if a value is None
def find_student(students, name):
    """Returns student dict if found, else None."""
    for student in students:
        if student['name'] == name:
            return student
    return None   # explicit None

students = [
    {"name": "Swadeep", "age": 17},
    {"name": "Abhronila", "age": 15}
]

found = find_student(students, "Debangshu")
if found is None:
    print("Student not found!")
else:
    print(f"Found: {found}")