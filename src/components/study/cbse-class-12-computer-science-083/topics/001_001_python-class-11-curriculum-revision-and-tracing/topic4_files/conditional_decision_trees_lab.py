# =====================================================================
# CBSE Class 12 Computer Science (083) - Revision Lab
# Topic 4: Conditional Execution: Nested if-elif-else Decision Trees
# =====================================================================

# 1. Single-way, Two-way, and Multi-way Branching
marks = 88

if marks >= 90:
    grade = 'A1'
elif marks >= 80:
    grade = 'A2'
elif marks >= 70:
    grade = 'B1'
elif marks >= 60:
    grade = 'B2'
elif marks >= 33:
    grade = 'Passed'
else:
    grade = 'Essential Repeat'

print(f"Marks: {marks} -> Awarded Grade: {grade}")

# 2. Nested Decision Tree: Leap Year Algorithm
def is_leap_year(year):
    if year % 4 == 0:
        if year % 100 == 0:
            if year % 400 == 0:
                return True
            else:
                return False
        else:
            return True
    else:
        return False

test_years = [1900, 2000, 2024, 2025, 2026]
for y in test_years:
    print(f"Year {y} is Leap Year? {is_leap_year(y)}")

# 3. Dangling-Else Pitfall & Indentation Semantics
# In Python, indentation dictates which 'if' an 'else' belongs to!
x = 10
y = 5

print("\n--- Indentation Scenarios ---")
if x > 5:
    if y > 10:
        print("x > 5 and y > 10")
    else:
        print("x > 5 and y <= 10 (else binds to INNER if)")

# 4. Ternary Conditional Expression
age = 18
eligibility = "Eligible to Vote" if age >= 18 else "Minor"
print(f"\nAge {age}: {eligibility}")
