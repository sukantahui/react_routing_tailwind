# arguments_demo.py
# Passing arguments (actual values) to functions

def greet_student(student_name):
    print(f"Hello, {student_name}!")

def calculate_total(math_score, science_score):
    total = math_score + science_score
    print(f"Total score: {total}")

# Calling with arguments - actual values
greet_student("Swadeep")      # Argument: "Swadeep"
greet_student("Tuhina")       # Argument: "Tuhina"
greet_student("Abhronila")    # Argument: "Abhronila"

calculate_total(85, 90)       # Arguments: 85 and 90
calculate_total(78, 82)       # Different arguments produce different output