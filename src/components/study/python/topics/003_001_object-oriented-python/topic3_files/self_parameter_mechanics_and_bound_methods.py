# topic3_files/self_parameter_mechanics_and_bound_methods.py
# Module: 003_001_object-oriented-python
# Topic: Instance methods & the self parameter
# Author: Sukanta Hui (Coder & AccoTax)

r"""
Topic 3 - File 1: The 'self' Parameter & Bound Method Transformation
Demonstrates:
  1. Why Python requires explicit 'self' as the first parameter
  2. How `obj.method(x)` translates identically to `Class.method(obj, x)`
  3. Difference between Unbound Class Functions and Instance Bound Methods
  4. The classic 'TypeError: takes 0 positional arguments but 1 was given' error
"""

class StudentAccount:
    """Class demonstrating explicit instance method invocation."""

    def __init__(self, name: str, balance: float):
        self.name = name
        self.balance = balance

    def deposit(self, amount: float):
        """Standard instance method taking self as first argument."""
        self.balance += amount
        print(f"  [DEPOSIT] {self.name}: +INR {amount:,.2f} | Balance: INR {self.balance:,.2f}")


def demonstrate_self_translation():
    print("=" * 70)
    print("1. HOW PYTHON TRANSLATES METHOD CALLS")
    print("=" * 70)

    acc = StudentAccount("Debanjan Roy", 5000.0)

    print("Method Call Style A (Syntactic Sugar): `acc.deposit(2500.0)`")
    acc.deposit(2500.0)

    print("\nMethod Call Style B (Raw Class Invocation): `StudentAccount.deposit(acc, 2500.0)`")
    StudentAccount.deposit(acc, 2500.0)

    print("\nConclusion: Both invocations are 100% byte-for-byte identical in CPython!")


def demonstrate_bound_vs_unbound():
    print("\n" + "=" * 70)
    print("2. UNBOUND FUNCTION VS BOUND METHOD OBJECT")
    print("=" * 70)

    acc = StudentAccount("Debanjan Roy", 10000.0)

    # 1. Accessed via Class -> Unbound Function
    unbound_func = StudentAccount.deposit
    print(f"Type of StudentAccount.deposit (Class Scope)  : {type(unbound_func)}")

    # 2. Accessed via Instance -> Bound Method
    bound_method = acc.deposit
    print(f"Type of acc.deposit (Instance Scope)        : {type(bound_method)}")
    print(f"Bound to instance object at memory address : {bound_method.__self__}")

    # You can pass bound methods as first-class callbacks:
    print("\nExecuting bound method stored in variable callback():")
    bound_method(1000.0)


if __name__ == "__main__":
    demonstrate_self_translation()
    demonstrate_bound_vs_unbound()
