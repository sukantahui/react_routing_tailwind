# Pattern 2: Advanced validation with multiple constraints

def get_student_grade():
    """Get a valid student grade (0-100) with detailed error messages"""
    while True:
        print("\n" + "=" * 50)
        print("Enter a student grade (0-100) or 'quit' to exit")
        user_input = input("Grade: ").strip()

        # Allow user to exit
        if user_input.lower() == "quit":
            print("Exiting grade entry...")
            return None

        try:
            # Try to convert to float (allow decimal grades)
            grade = float(user_input)

            # Multiple validation checks
            if grade < 0:
                raise ValueError("Grade cannot be negative!")
            elif grade > 100:
                raise ValueError("Grade cannot exceed 100!")

            # Additional business logic
            if grade >= 90:
                category = "A (Excellent)"
            elif grade >= 75:
                category = "B (Good)"
            elif grade >= 60:
                category = "C (Average)"
            elif grade >= 40:
                category = "D (Pass)"
            else:
                category = "F (Fail)"

            # Success!
            print(f"✓ Valid grade entered: {grade}")
            print(f"  Grade Category: {category}")
            return grade

        except ValueError as e:
            print(f"✗ Error: {e}")
            print("  Please enter a number between 0 and 100")

        except Exception as e:
            print(f"✗ Unexpected error: {type(e).__name__}")
            print("  Please try again")


# Test with various inputs
print("=== Student Grade Validator ===\n")
get_student_grade()
