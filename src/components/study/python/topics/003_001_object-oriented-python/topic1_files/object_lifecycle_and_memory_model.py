# topic1_files/object_lifecycle_and_memory_model.py
# Module: 003_001_object-oriented-python
# Topic: Classes, Instances & Objects: syntax and lifecycle
# Author: Sukanta Hui (Coder & AccoTax)

r"""
Topic 1 - File 2: Complete Object Lifecycle (__new__ -> __init__ -> __del__)
Demonstrates:
  1. Stage 1: Allocation (__new__ static constructor creating the instance)
  2. Stage 2: Initialization (__init__ configuring initial instance state)
  3. Stage 3: Active Usage & Reference Counting (sys.getrefcount)
  4. Stage 4: Deallocation & Destruction (__del__ destructor invoked by GC)
"""

import sys

class ManagedResource:
    """Demonstrates every hook in the Python object lifecycle."""

    def __new__(cls, resource_name: str):
        print(f"  [STAGE 1: __new__] Allocating heap memory for class '{cls.__name__}'")
        instance = super().__new__(cls)
        return instance

    def __init__(self, resource_name: str):
        print(f"  [STAGE 2: __init__] Initializing instance state: resource_name='{resource_name}'")
        self.resource_name = resource_name

    def execute_operation(self):
        print(f"  [STAGE 3: USAGE] Active operation executed on '{self.resource_name}'")

    def __del__(self):
        print(f"  [STAGE 4: __del__] Destructor called: Releasing resource '{self.resource_name}'")


def demonstrate_lifecycle():
    print("=" * 70)
    print("CODER & ACCOTAX - CPYTHON OBJECT LIFECYCLE MODEL")
    print("=" * 70)

    print("\n--- A. INSTANTIATION TRIGGER (__new__ THEN __init__) ---")
    res = ManagedResource("Database Connection #1")

    print("\n--- B. ACTIVE OBJECT USAGE & REFERENCE COUNTING ---")
    res.execute_operation()
    # Note: sys.getrefcount adds 1 temporary reference for the argument itself
    print(f"Active references to 'res': {sys.getrefcount(res) - 1}")

    print("\n--- C. DESTRUCTION TRIGGER (EXPLICIT del) ---")
    del res  # Reference count reaches 0 -> Garbage Collector executes __del__

    print("\n[PASSED] Object Lifecycle Demonstration Complete.")


if __name__ == "__main__":
    demonstrate_lifecycle()
