# topic4_files/class_vs_instance_attributes_fundamentals.py
# Module: 003_001_object-oriented-python
# Topic: Class attributes vs Instance attributes
# Author: Sukanta Hui (Coder & AccoTax)

r"""
Topic 4 - File 1: Class Attributes vs Instance Attributes Fundamentals
Demonstrates:
  1. Class Attributes: Defined in the class body; shared by ALL instances
  2. Instance Attributes: Defined on `self`; unique to each individual instance
  3. Memory Footprint: Class.__dict__ vs instance.__dict__
  4. Global updates via `ClassName.attr = new_val`
"""

class CourseBatch:
    """Demonstrates shared class attributes and private instance attributes."""
    
    # =================================================================
    # CLASS ATTRIBUTES (Shared across all batch objects)
    # =================================================================
    institute_name = "Coder & AccoTax"
    branch_city = "Barrackpore"
    base_currency = "INR"
    total_batches_created = 0

    def __init__(self, batch_code: str, course_name: str, max_capacity: int):
        # =============================================================
        # INSTANCE ATTRIBUTES (Unique to each specific batch instance)
        # =============================================================
        self.batch_code = batch_code
        self.course_name = course_name
        self.max_capacity = max_capacity
        self.enrolled_students = 0

        # Increment shared class counter:
        CourseBatch.total_batches_created += 1


def demonstrate_attribute_scopes():
    print("=" * 70)
    print("1. CLASS ATTRIBUTES VS INSTANCE ATTRIBUTES")
    print("=" * 70)

    # 1. Instantiate 2 distinct batches
    b1 = CourseBatch("PY-FULL-01", "Python Pro Full-Stack", 25)
    b2 = CourseBatch("DATA-02", "Data Analytics & Machine Learning", 30)

    print(f"Total Batches Registered (Shared Class Counter): {CourseBatch.total_batches_created}\n")

    print("Batch 1 (b1):")
    print(f"  * Instance Attributes : batch_code='{b1.batch_code}', course='{b1.course_name}'")
    print(f"  * Shared Class Attrs  : institute='{b1.institute_name}', city='{b1.branch_city}'")
    print(f"  * b1.__dict__ (Local) : {b1.__dict__}\n")

    print("Batch 2 (b2):")
    print(f"  * Instance Attributes : batch_code='{b2.batch_code}', course='{b2.course_name}'")
    print(f"  * Shared Class Attrs  : institute='{b2.institute_name}', city='{b2.branch_city}'")
    print(f"  * b2.__dict__ (Local) : {b2.__dict__}")


def demonstrate_class_attribute_updates():
    print("\n" + "=" * 70)
    print("2. GLOBAL CLASS ATTRIBUTE UPDATES")
    print("=" * 70)

    b1 = CourseBatch("PY-01", "Python", 20)
    b2 = CourseBatch("PY-02", "Python Fast Track", 15)

    print(f"Original Institute Name on b1: '{b1.institute_name}'")
    print(f"Original Institute Name on b2: '{b2.institute_name}'")

    # Updating the class attribute ON THE CLASS updates all instances simultaneously:
    print("\nUpdating class variable: `CourseBatch.institute_name = 'Coder & AccoTax Academy'`")
    CourseBatch.institute_name = "Coder & AccoTax Academy"

    print(f"Updated Institute on b1: '{b1.institute_name}'")
    print(f"Updated Institute on b2: '{b2.institute_name}'")
    print(f"Notice: Neither b1.__dict__ nor b2.__dict__ was modified; lookup finds updated Class dict!")


if __name__ == "__main__":
    demonstrate_attribute_scopes()
    demonstrate_class_attribute_updates()
