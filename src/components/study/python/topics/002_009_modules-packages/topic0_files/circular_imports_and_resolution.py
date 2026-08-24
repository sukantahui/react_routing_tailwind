# topic0_files/circular_imports_and_resolution.py
# Module: 002_009_modules-packages
# Topic: import & from-import syntax variations
# Author: Sukanta Hui (Coder & AccoTax)

r"""
Topic 0 - File 3: Circular Imports, Anatomy of Dependency Cycles & Solutions
Demonstrates:
  1. Why circular imports occur (Mutual top-level dependencies)
  2. The classic error: ImportError: cannot import name 'X' from partially initialized module
  3. Solution 1: Function-level deferred / lazy imports
  4. Solution 2: Extracting shared entities into a common base module
  5. Solution 3: Module-level import instead of symbol-level import
"""

def explain_circular_import_cycle():
    print("=" * 65)
    print("1. ANATOMY OF A CIRCULAR IMPORT CYCLE")
    print("=" * 65)
    print("""
Scenario:
  File `student_service.py`:
    from course_service import get_course_details
    def enroll_student(student_id, course_id):
        ...

  File `course_service.py`:
    from student_service import get_student_profile
    def get_course_details(course_id):
        ...

What Happens:
  1. Python begins executing `student_service.py`.
  2. Hits line 1: `from course_service import get_course_details`.
  3. Pauses `student_service.py` (it is partially initialized) and jumps to `course_service.py`.
  4. In `course_service.py`, hits line 1: `from student_service import get_student_profile`.
  5. Jumps to `student_service.py`, but finds it is already being initialized in `sys.modules`!
  6. Attempts to look up `get_student_profile`, which has NOT been defined yet!
  7. CRASH: ImportError: cannot import name 'get_student_profile' from partially initialized module!
""")


def demonstrate_solution_deferred_import():
    print("=" * 65)
    print("2. SOLUTION 1: FUNCTION-LEVEL DEFERRED / LAZY IMPORT")
    print("=" * 65)

    def generate_student_receipt(student_id: int, course_name: str) -> str:
        # Import placed INSIDE function body: executes ONLY when the function is called!
        # By the time this runs, all modules in the project are fully initialized in sys.modules.
        import datetime as dt
        
        timestamp = f"{dt.datetime(2026, 8, 24, 18, 30):%d-%b-%Y}"
        return f"Receipt #{student_id:06d} for '{course_name}' generated on {timestamp}."

    result = generate_student_receipt(101, "Python Pro")
    print("Deferred Import Execution:")
    print(f"  {result}\n")


def demonstrate_solution_refactoring_common():
    print("=" * 65)
    print("3. SOLUTION 2: EXTRACTING SHARED TYPES (BEST PRACTICE)")
    print("=" * 65)
    print("""
Architecture Best Practice:
  Instead of A importing B and B importing A:
    - Create `models.py` or `common.py`.
    - Place shared DataClasses, Enums, and Constants in `models.py`.
    - Both `student_service.py` and `course_service.py` import from `models.py`.
    - The circular cycle is completely broken into a clean Directed Acyclic Graph (DAG)!
""")


if __name__ == "__main__":
    explain_circular_import_cycle()
    demonstrate_solution_deferred_import()
    demonstrate_solution_refactoring_common()
