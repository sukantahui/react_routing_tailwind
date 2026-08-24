# return_realworld.py
# Real-world applications of return statements

# 1. GPA calculator
def calculate_gpa(grades):
    """Takes list of letter grades, returns GPA as float."""
    grade_points = {
        'A': 4.0, 'A-': 3.7,
        'B+': 3.3, 'B': 3.0, 'B-': 2.7,
        'C+': 2.3, 'C': 2.0, 'C-': 1.7,
        'D': 1.0, 'F': 0.0
    }
    total = 0
    for grade in grades:
        total += grade_points.get(grade, 0.0)
    return total / len(grades) if grades else 0.0

student_grades = ['A', 'B+', 'A-', 'B']
gpa = calculate_gpa(student_grades)
print(f"GPA: {gpa:.2f}")

# 2. Safe division (avoid ZeroDivisionError)
def safe_divide(a, b):
    """Returns quotient if b != 0, else returns None."""
    if b == 0:
        return None
    return a / b

result = safe_divide(10, 0)
if result is None:
    print("Cannot divide by zero!")
else:
    print(f"Result: {result}")

# 3. Parsing user input
def parse_command(input_str):
    """Returns a tuple (command, args) or (None, None) on failure."""
    parts = input_str.strip().split()
    if not parts:
        return None, None
    command = parts[0]
    args = parts[1:]
    return command, args

cmd, args = parse_command("greet Swadeep Barrackpore")
print(f"Command: {cmd}, Args: {args}")

# 4. Returning multiple related values (using a dict)
def analyze_list(numbers):
    """Returns a dict with statistical summary."""
    if not numbers:
        return {"error": "Empty list"}
    return {
        "count": len(numbers),
        "sum": sum(numbers),
        "mean": sum(numbers) / len(numbers),
        "min": min(numbers),
        "max": max(numbers)
    }

stats = analyze_list([10, 20, 30, 40, 50])
print(f"Mean: {stats['mean']}, Min: {stats['min']}, Max: {stats['max']}")

# 5. Early return pattern (validation)
def register_user(username, password, email):
    """Returns True if registration successful, False otherwise."""
    if len(username) < 3:
        print("Username too short")
        return False
    if len(password) < 6:
        print("Password too weak")
        return False
    if '@' not in email:
        print("Invalid email")
        return False
    # All validations passed
    print(f"User {username} registered!")
    return True

success = register_user("ab", "pass123", "a@b.com")   # fails
print(f"Success: {success}")