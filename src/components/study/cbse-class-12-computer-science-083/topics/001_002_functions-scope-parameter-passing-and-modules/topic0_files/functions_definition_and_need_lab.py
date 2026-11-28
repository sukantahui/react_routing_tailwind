# =====================================================================
# CBSE Class 12 Computer Science (083) - Functions Lab
# Topic 0: Understanding Functions: Need, Advantages & Definition using 'def'
# =====================================================================

# 1. Defining a Function using 'def'
def greet_student(name, grade="XII"):
    """
    Docstring: Greets a student with their registered class.
    Demonstrates basic function header, docstring, and return value.
    """
    message = f"Welcome to CBSE Class {grade} Computer Science, {name}!"
    return message

# 2. Inspecting Function Metadata & Docstring
print("--- 1. Function Call & Metadata ---")
call_result = greet_student("Priya")
print("Function Return:", call_result)
print("Function Name:", greet_student.__name__)
print("Function Docstring:", greet_student.__doc__.strip())

# 3. Void Functions (Functions returning None)
def log_attendance(roll_no, status="Present"):
    print(f"[AUDIT LOG] Roll {roll_no}: {status}")
    # No return statement provided -> returns None by default

audit_return = log_attendance(101)
print(f"Void function return value: {audit_return} (Type: {type(audit_return)})")

# 4. Modularity Advantage Demonstration: Reusable Math Engine
def calculate_cylinder_volume(radius, height):
    import math
    return math.pi * (radius ** 2) * height

r1, h1 = 3.5, 10
v1 = calculate_cylinder_volume(r1, h1)
print(f"Cylinder (r={r1}, h={h1}) -> Volume = {v1:.2f} cubic units")
