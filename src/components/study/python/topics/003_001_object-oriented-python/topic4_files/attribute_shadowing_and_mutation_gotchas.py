# topic4_files/attribute_shadowing_and_mutation_gotchas.py
# Module: 003_001_object-oriented-python
# Topic: Class attributes vs Instance attributes
# Author: Sukanta Hui (Coder & AccoTax)

r"""
Topic 4 - File 2: Attribute Shadowing & Mutable Class Attribute Traps
Demonstrates:
  1. The Shadowing Trap: Assigning `obj.class_attr = val` creates an instance shadow
  2. The Mutable Class Attribute Bug: Shared lists/dicts in RAM mutated in-place
  3. Inspecting __dict__ to prove where variables actually live
"""

# =====================================================================
# 1. ATTRIBUTE SHADOWING DEMO
# =====================================================================
class FranchiseLocation:
    headquarters = "Barrackpore, Kolkata"  # Class attribute

    def __init__(self, branch_code: str):
        self.branch_code = branch_code


def demonstrate_shadowing():
    print("=" * 70)
    print("1. THE ATTRIBUTE SHADOWING MECHANISM")
    print("=" * 70)

    f1 = FranchiseLocation("BR-01")
    f2 = FranchiseLocation("BR-02")

    print(f"Initial f1.headquarters: '{f1.headquarters}' (Read from Class.__dict__)")
    print(f"Initial f2.headquarters: '{f2.headquarters}' (Read from Class.__dict__)")

    # Shadowing: assigning to f1 directly creates an instance attribute:
    print("\nExecuting: `f1.headquarters = 'Shyamnagar Sub-Branch'`")
    f1.headquarters = "Shyamnagar Sub-Branch"

    print(f"f1.headquarters (Shadowed): '{f1.headquarters}' (Read from f1.__dict__)")
    print(f"f2.headquarters (Original): '{f2.headquarters}' (Read from Class.__dict__)")
    print(f"FranchiseLocation.headquarters: '{FranchiseLocation.headquarters}' (Unchanged!)")

    print(f"\nf1.__dict__: {f1.__dict__}")
    print(f"f2.__dict__: {f2.__dict__} (Notice: headquarters is NOT in f2.__dict__!)")


# =====================================================================
# 2. MUTABLE CLASS ATTRIBUTE TRAP
# =====================================================================
class BuggyClassRegistry:
    """Anti-Pattern: Mutable list at class level intended for instance data."""
    all_skills = []  # Shared across all instances in RAM!

    def __init__(self, student_name: str):
        self.student_name = student_name

    def add_skill(self, skill: str):
        # IN-PLACE MUTATION of class attribute:
        self.all_skills.append(skill)


def demonstrate_mutable_class_bug():
    print("\n" + "=" * 70)
    print("2. THE MUTABLE CLASS ATTRIBUTE SHARED MEMORY TRAP")
    print("=" * 70)

    s1 = BuggyClassRegistry("Abhishek")
    s2 = BuggyClassRegistry("Debolina")

    s1.add_skill("Python")
    s1.add_skill("Django")

    print(f"Abhishek's skills: {s1.all_skills}")
    print(f"Debolina's skills: {s2.all_skills}  <-- [POLLUTION BUG!] Debolina sees Abhishek's skills!")
    print(f"Are s1.all_skills and s2.all_skills the exact same list? -> {s1.all_skills is s2.all_skills}")
    print("\nRule: NEVER use mutable collections (lists/dicts) as class attributes unless intentionally shared across all instances!")


if __name__ == "__main__":
    demonstrate_shadowing()
    demonstrate_mutable_class_bug()
