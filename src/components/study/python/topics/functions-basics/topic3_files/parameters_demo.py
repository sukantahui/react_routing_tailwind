# parameters_demo.py
# Demonstrating function parameters (placeholders)

def greet_student(student_name):
    """'student_name' is a parameter - a placeholder"""
    print(f"Hello, {student_name}!")

def calculate_total(math_score, science_score):
    """Two parameters: math_score and science_score"""
    total = math_score + science_score
    print(f"Total score: {total}")

# Parameters are defined, but we haven't called the functions yet
# The next file will show how to pass arguments