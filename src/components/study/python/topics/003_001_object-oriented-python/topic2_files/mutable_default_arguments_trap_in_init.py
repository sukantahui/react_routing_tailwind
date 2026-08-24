# topic2_files/mutable_default_arguments_trap_in_init.py
# Module: 003_001_object-oriented-python
# Topic: Constructors & the __init__() method
# Author: Sukanta Hui (Coder & AccoTax)

r"""
Topic 2 - File 3: The Mutable Default Argument Disaster in __init__
Demonstrates:
  1. The Classic Bug: Using `items=[]` or `config={}` as default parameter values
  2. Why this bug happens: Default objects are created once at function definition time!
  3. How modifying one instance's list silently mutates ALL other instances!
  4. The Canonical Solution: Default to None and initialize freshly inside __init__
"""

from typing import List, Optional

# =====================================================================
# 1. THE BUGGY CLASS (Shared Mutable Default List)
# =====================================================================
class BuggyStudentCard:
    """Anti-Pattern: Using [] as default argument value."""
    def __init__(self, name: str, skills: List[str] = []):
        self.name = name
        self.skills = skills  # CAUTION: All instances without explicit skills share the SAME list!


# =====================================================================
# 2. THE CANONICAL CORRECT CLASS (Isolated State)
# =====================================================================
class CorrectStudentCard:
    """Best Practice: Use None as default and create fresh list per instance."""
    def __init__(self, name: str, skills: Optional[List[str]] = None):
        self.name = name
        # Canonical Python idiom:
        self.skills = list(skills) if skills is not None else []


def demonstrate_mutable_default_bug():
    print("=" * 70)
    print("1. THE DISASTER: BUGGY MUTABLE DEFAULT ARGUMENT")
    print("=" * 70)

    # Student 1 created with default list:
    s1 = BuggyStudentCard("Abhishek")
    s1.skills.append("Python Basics")
    s1.skills.append("FastAPI")

    # Student 2 created with default list:
    s2 = BuggyStudentCard("Debolina")

    print(f"Student 1 Skills: {s1.skills}")
    print(f"Student 2 Skills: {s2.skills}  <-- [POLLUTION BUG!] Debolina has Abhishek's skills!")
    print(f"Are s1.skills and s2.skills the exact same object in RAM? -> {s1.skills is s2.skills}")


def demonstrate_canonical_fix():
    print("\n" + "=" * 70)
    print("2. THE CANONICAL FIX: DEFAULT TO None")
    print("=" * 70)

    # Student 1 created with None default:
    s1 = CorrectStudentCard("Abhishek")
    s1.skills.append("Python Basics")
    s1.skills.append("FastAPI")

    # Student 2 created with None default:
    s2 = CorrectStudentCard("Debolina")
    s2.skills.append("Pandas & NumPy")

    print(f"Student 1 Skills: {s1.skills}")
    print(f"Student 2 Skills: {s2.skills}")
    print(f"Are s1.skills and s2.skills the exact same object in RAM? -> {s1.skills is s2.skills}")
    print("\n[PASSED] Mutable Default Arguments Trap Resolved.")


if __name__ == "__main__":
    demonstrate_mutable_default_bug()
    demonstrate_canonical_fix()
