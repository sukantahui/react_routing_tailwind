# mix_builtin_user.py
# Combining built-in and user-defined functions

# User-defined function
def get_average(grades):
    # Using built-in sum() and len()
    total = sum(grades)
    count = len(grades)
    average = total / count
    return average

# User-defined function to display student report
def display_report(name, grades):
    # Using built-in print()
    print(f"\n--- Report for {name} ---")
    print(f"Grades: {grades}")
    avg = get_average(grades)
    # Using built-in round()
    print(f"Average: {round(avg, 2)}")

# Sample data
students = [
    ("Abhronila", [85, 90, 88]),
    ("Debangshu", [78, 82, 79]),
    ("Tuhina", [92, 95, 91])
]

# Using built-in len() and range() to loop
for i in range(len(students)):
    name, grades = students[i]
    display_report(name, grades)