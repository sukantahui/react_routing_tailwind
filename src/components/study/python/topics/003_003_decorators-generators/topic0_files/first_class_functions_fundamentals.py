# topic0_files/first_class_functions_fundamentals.py
# Module: 003_003_decorators-generators
# Topic: First-Class Functions: Passing and returning functions
# Author: Sukanta Hui (Coder & AccoTax)

r"""
Topic 0 - File 1: First-Class Function Fundamentals in Python
Demonstrates:
  1. What 'First-Class Citizen' means in Python (Functions are objects!)
  2. Assigning function objects to variables
  3. Passing functions as arguments to higher-order functions
  4. Inspecting function metadata (__name__, __doc__, __code__)
"""

def apply_academic_scholarship(base_fee: float) -> float:
    """Calculates fee with 20% Academic Scholarship applied."""
    return base_fee * 0.80

def apply_sibling_concession(base_fee: float) -> float:
    """Calculates fee with 15% Sibling Concession applied."""
    return base_fee * 0.85

def compute_standard_fee(base_fee: float) -> float:
    """Calculates standard fee with no discount."""
    return base_fee


# Higher-Order Function (Accepts a function as an argument)
def process_student_enrollment(student_name: str, base_fee: float, discount_strategy) -> dict:
    """Processes enrollment by delegating calculation to the passed function strategy."""
    # Invoking the passed function object:
    calculated_fee = discount_strategy(base_fee)
    strategy_name = discount_strategy.__name__

    return {
        "student_name": student_name,
        "base_fee": base_fee,
        "final_fee": calculated_fee,
        "strategy_applied": strategy_name
    }


def demonstrate_first_class_fundamentals():
    print("=" * 70)
    print("CODER & ACCOTAX - FIRST-CLASS FUNCTIONS IN PYTHON")
    print("=" * 70)

    # 1. Functions are Objects: Assigning to variables
    print("1. Assigning Function Objects to Variables:")
    calc_ref = apply_academic_scholarship
    print(f"   Original function name: {apply_academic_scholarship.__name__}")
    print(f"   Variable reference name: {calc_ref.__name__}")
    print(f"   Memory address of calc_ref: {hex(id(calc_ref))}")
    print(f"   Invoking via alias calc_ref(20000): INR {calc_ref(20000):,.2f}\n")

    # 2. Passing Functions as Arguments (Higher-Order Functions)
    print("2. Passing Strategy Functions into Higher-Order Processor:")
    rec1 = process_student_enrollment("Sourav Mukherjee", 25000.0, apply_academic_scholarship)
    print(f"   * {rec1['student_name']} -> Final Fee: INR {rec1['final_fee']:,.2f} ({rec1['strategy_applied']})")

    rec2 = process_student_enrollment("Priyanka Sen", 25000.0, apply_sibling_concession)
    print(f"   * {rec2['student_name']} -> Final Fee: INR {rec2['final_fee']:,.2f} ({rec2['strategy_applied']})")

    rec3 = process_student_enrollment("Rahul Verma", 25000.0, compute_standard_fee)
    print(f"   * {rec3['student_name']} -> Final Fee: INR {rec3['final_fee']:,.2f} ({rec3['strategy_applied']})")

    print("\n[PASSED] First-Class Function Fundamentals Verified.")


if __name__ == "__main__":
    demonstrate_first_class_fundamentals()
