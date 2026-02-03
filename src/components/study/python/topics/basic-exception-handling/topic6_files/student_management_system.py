# Pattern 3: Menu system with validation

def student_management_system():
    """A menu-driven student management system"""
    students = []

    while True:
        print("\n" + "=" * 50)
        print("STUDENT MANAGEMENT SYSTEM")
        print("1. Add Student")
        print("2. View All Students")
        print("3. Calculate Class Average")
        print("4. Exit")

        choice = input("Enter your choice (1-4): ").strip()

        try:
            # Convert choice to integer
            choice_int = int(choice)

            # Validate menu range
            if choice_int < 1 or choice_int > 4:
                print("Error: Choice must be between 1 and 4!")
                continue

            # Handle menu options
            if choice_int == 1:
                add_student(students)
            elif choice_int == 2:
                view_students(students)
            elif choice_int == 3:
                calculate_average(students)
            elif choice_int == 4:
                print("Thank you for using the Student Management System!")
                break

        except ValueError:
            print(f"Error: '{choice}' is not a valid number!")
        except Exception as e:
            print(f"Unexpected error: {type(e).__name__}")


def add_student(students):
    """Add a student with validation"""
    print("\n--- Add New Student ---")

    while True:
        name = input("Student Name: ").strip()
        if name == "":
            print("Error: Name cannot be empty!")
        else:
            break

    while True:
        try:
            age = int(input("Age: "))
            if age < 5 or age > 60:
                print("Error: Age must be between 5 and 60!")
            else:
                break
        except ValueError:
            print("Error: Please enter a valid number for age!")

    while True:
        try:
            grade = float(input("Grade (0-100): "))
            if grade < 0 or grade > 100:
                print("Error: Grade must be between 0 and 100!")
            else:
                break
        except ValueError:
            print("Error: Please enter a valid number for grade!")

    students.append({
        "name": name,
        "age": age,
        "grade": grade
    })

    print(f"✓ Student {name} added successfully!")


def view_students(students):
    """View all students"""
    print("\n--- All Students ---")
    if not students:
        print("No students in the system yet.")
    else:
        for i, student in enumerate(students, start=1):
            print(
                f"{i}. {student['name']} "
                f"(Age: {student['age']}, Grade: {student['grade']})"
            )


def calculate_average(students):
    """Calculate class average"""
    if not students:
        print("No students to calculate average.")
    else:
        total = sum(student["grade"] for student in students)
        average = total / len(students)
        print(f"\nClass Average: {average:.2f}")


# Run the system
student_management_system()
