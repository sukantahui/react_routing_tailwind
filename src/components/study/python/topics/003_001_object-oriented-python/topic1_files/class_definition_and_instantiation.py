# topic1_files/class_definition_and_instantiation.py
# Module: 003_001_object-oriented-python
# Topic: Classes, Instances & Objects: syntax and lifecycle
# Author: Sukanta Hui (Coder & AccoTax)

r"""
Topic 1 - File 1: Class Definition, Instantiation & Memory Identity
Demonstrates:
  1. Defining custom classes with PEP 8 PascalCase naming conventions
  2. Creating multiple distinct living instances in memory
  3. Memory address identity using id() and hex(id())
  4. Type inspection via type() and isinstance()
  5. Dynamic instance attribute assignment and namespace isolation
"""

class CourseRegistration:
    """Class Blueprint representing a student course enrollment."""
    institute_name = "Coder & AccoTax"  # Class-level attribute


def demonstrate_instantiation_and_identity():
    print("=" * 70)
    print("1. CLASS INSTANTIATION & MEMORY HEAP ADDRESSES")
    print("=" * 70)

    # Creating two distinct object instances from the same Class blueprint
    student1 = CourseRegistration()
    student2 = CourseRegistration()

    # Dynamic attribute assignment
    student1.student_name = "Abhishek Karmakar"
    student1.course = "Python Pro Full-Stack"

    student2.student_name = "Debolina Mukherjee"
    student2.course = "Data Analytics with Python"

    print("Student 1 Instance:")
    print(f"  * Name       : {student1.student_name}")
    print(f"  * Course     : {student1.course}")
    print(f"  * Memory ID  : {hex(id(student1))} (Decimal: {id(student1)})")

    print("\nStudent 2 Instance:")
    print(f"  * Name       : {student2.student_name}")
    print(f"  * Course     : {student2.course}")
    print(f"  * Memory ID  : {hex(id(student2))} (Decimal: {id(student2)})")

    # Verify that the two objects are distinct in memory
    print(f"\nAre student1 and student2 identical objects? (student1 is student2) -> {student1 is student2}")


def demonstrate_type_verification():
    print("\n" + "=" * 70)
    print("2. TYPE INSPECTION: type() VS isinstance()")
    print("=" * 70)

    student = CourseRegistration()

    print(f"type(student)                        : {type(student)}")
    print(f"isinstance(student, CourseRegistration) : {isinstance(student, CourseRegistration)}")
    print(f"isinstance(student, object)          : {isinstance(student, object)} (All classes inherit from object!)")


if __name__ == "__main__":
    demonstrate_instantiation_and_identity()
    demonstrate_type_verification()
