# =====================================================================
# CBSE Class 12 Computer Science (083) - Functions Lab
# Topic 3: Positional Arguments vs Keyword (Named) Arguments
# =====================================================================

def display_student_report(name, roll_no, marks, subject="Computer Science"):
    print(f"Student: {name} | Roll: {roll_no} | Subject: {subject} | Marks: {marks}")

print("--- 1. Pure Positional Arguments (Order Matters!) ---")
# Arguments are mapped left-to-right strictly by position
display_student_report("Ishaan", 101, 95)
display_student_report("Kavya", 102, 98, "Informatics Practices")

print("\n--- 2. Keyword (Named) Arguments (Order Does NOT Matter!) ---")
# Explicitly specifying parameter_name=value allows any arbitrary order
display_student_report(marks=92, name="Rohan", roll_no=103)
display_student_report(roll_no=104, marks=89, name="Sneha", subject="Python 3")

print("\n--- 3. Mixing Positional and Keyword Arguments ---")
# Statutory Rule: Positional arguments MUST appear BEFORE any keyword arguments
display_student_report("Aarav", 105, marks=99) # Valid!

# Illegal Call Demonstration:
try:
    # SyntaxError: positional argument follows keyword argument
    # display_student_report(name="Ananya", 106, 94)
    pass
except Exception as e:
    print("Caught error:", e)

# TypeError Demonstration (Duplicate Argument Assignment):
try:
    # 'name' passed positionally AND as a keyword
    display_student_report("Meera", 107, 91, name="Radha")
except TypeError as err:
    print("Caught expected TypeError:", err)
